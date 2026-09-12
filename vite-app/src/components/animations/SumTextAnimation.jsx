import { useEffect, useMemo, useRef, useState } from "react";

// A solid default set of "best sums" to cycle through when no `equations` prop is given
const DEFAULT_EQUATIONS = [
  ["2H₂", " + ", "O₂", " → ", "2H₂O"],
  ["CH₄", " + ", "2O₂", " → ", "CO₂", " + ", "2H₂O"],
  ["N₂", " + ", "3H₂", " → ", "2NH₃"],
  ["2Na", " + ", "Cl₂", " → ", "2NaCl"],
  ["CaCO₃", " → ", "CaO", " + ", "CO₂"],
];

export default function SumTextAnimation({
  equation, // optional: single equation (array of terms) — used only if `equations` isn't provided
  equations, // optional: array of equations (each an array of terms) to cycle through
  intervalMs = 5000,
  color = "rgba(241,238,228,0.4)",
  underlineColor = "#E3B23C",
  arrowColor = "#E3B23C", // "arrow to success" highlight color
  fontSize = "clamp(1.3rem, 2.6vw, 2.1rem)",
  startDelay = 0.3, // seconds before the first term appears
  stepDelay = 0.45, // seconds between each subsequent term
  underlineWidth, // optional override; if omitted, underline auto-fits the text width
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const textRef = useRef(null);
  const [measuredWidth, setMeasuredWidth] = useState(underlineWidth || 260);

  // normalize to a list of equations — falls back to single `equation`, then to the defaults
  const equationList = useMemo(() => {
    if (Array.isArray(equations) && equations.length > 0) return equations;
    if (Array.isArray(equation) && equation.length > 0) return [equation];
    return DEFAULT_EQUATIONS;
  }, [equations, equation]);

  // if a custom `equations` array was passed in, start on a random one each mount;
  // otherwise start at 0 (covers the single-`equation` and default-list cases)
  const [tick, setTick] = useState(() => {
    if (Array.isArray(equations) && equations.length > 0) {
      return Math.floor(Math.random() * equations.length);
    }
    return 0;
  });

  // respect the user's OS-level motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // advance to the next equation every intervalMs, wrapping back to the first
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [reducedMotion, intervalMs]);

  const currentIndex = tick % equationList.length;
  const terms = equationList[currentIndex];

  const underlineDelay = useMemo(
    () => startDelay + terms.length * stepDelay + 0.05,
    [startDelay, stepDelay, terms.length]
  );

  // measure the rendered text width so the underline always matches,
  // regardless of font size (including the clamp()'s viewport-based sizing)
  useEffect(() => {
    if (underlineWidth) return; // explicit override wins, skip auto-measuring

    const el = textRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setMeasuredWidth(width);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [underlineWidth, terms, fontSize]);

  const effectiveWidth = underlineWidth || measuredWidth;

  // scale the underline path proportionally to the measured/target width
  // (path was authored for a 260-wide box)
  const pathD = useMemo(() => {
    const scale = effectiveWidth / 260;
    const pts = [
      [5, 8],
      [60, 2],
      [200, 14],
      [255, 6],
    ].map(([x, y]) => [x * scale, y]);
    return `M${pts[0][0]},${pts[0][1]} C${pts[1][0]},${pts[1][1]} ${pts[2][0]},${pts[2][1]} ${pts[3][0]},${pts[3][1]}`;
  }, [effectiveWidth]);

  // is this term the reaction arrow? style it as a little "arrow to success"
  const isArrow = (term) => typeof term === "string" && term.includes("→");

  return (
    <div aria-hidden="true">
      <style>{`
        @keyframes chalk-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrow-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes draw-underline {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div
        ref={textRef}
        style={{
          fontStyle: "italic",
          fontWeight: 500,
          fontSize,
          color,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          direction: 'ltr',
          display: "inline-block",
        }}
      >
        {terms.map((term, i) => {
          const arrow = isArrow(term);
          const baseDelay = startDelay + i * stepDelay;

          if (reducedMotion) {
            return (
              <span
                key={`${tick}-term-${i}`}
                style={{
                  display: "inline-block",
                  opacity: 1,
                  color: arrow ? arrowColor : "inherit",
                  fontWeight: arrow ? 700 : "inherit",
                  margin: '0 2px'
                }}
              >
                {term}
              </span>
            );
          }

          return (
            <span
              key={`${tick}-term-${i}`} // key changes every tick, forcing the animation to replay
              style={{
                display: "inline-block",
                opacity: 0,
                color: arrow ? arrowColor : "inherit",
                fontWeight: arrow ? 700 : "inherit",
                transform: arrow ? "translateY(6px) scale(0.7)" : "translateY(6px)",
                animation: `${arrow ? "arrow-in" : "chalk-in"} 0.5s ease forwards`,
                animationDelay: `${baseDelay.toFixed(2)}s`,
                textShadow: arrow ? `0 0 8px ${arrowColor}55` : "none",
                  margin: '0 2px'

              }}
            >
              {term}
            </span>
          );
        })}
      </div>

      <svg
        width={effectiveWidth}
        height="16"
        style={{ overflow: "visible", marginTop: 2, display: "block" }}
      >
        <path
          key={`${tick}-underline`} // also forced to replay each tick
          d={pathD}
          stroke={underlineColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={
            reducedMotion
              ? { strokeDasharray: 340, strokeDashoffset: 0 }
              : {
                  strokeDasharray: 340,
                  strokeDashoffset: 340,
                  animation: "draw-underline 0.9s ease forwards",
                  animationDelay: `${underlineDelay.toFixed(2)}s`,
                }
          }
        />
      </svg>
    </div>
  );
}