import { useEffect, useMemo, useState } from "react";

// Arabic script uses joining letterforms (a letter's shape changes depending on
// its neighbors), so splitting a word into isolated letter spans breaks the
// script entirely. For Arabic text we animate whole words instead of letters,
// and switch the container to RTL so word order renders correctly.
const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export default function ReactionText({
  text = "You're standing in a reaction.",
  texts, // optional: array of sentences to cycle through instead of a single `text`
  intervalMs = 5000,
  accentColor = "#4FA98C",
  textColor = "inherit",
  fontSize = "3rem",
  fontWeight = 600,
  fontFamily,
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tick, setTick] = useState(0); // always increases; drives both the sentence index and fresh randomization

  // normalize to a list of sentences — falls back to the single `text` prop
  const sentences = useMemo(
    () => (Array.isArray(texts) && texts.length > 0 ? texts : [text]),
    [texts, text]
  );

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

  // advance to the next sentence every intervalMs, wrapping back to the first
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [reducedMotion, intervalMs]);

  const currentIndex = tick % sentences.length;
  const currentText = sentences[currentIndex];

  const isArabic = useMemo(() => ARABIC_RANGE.test(currentText), [currentText]);
  const direction = isArabic ? "rtl" : "ltr";
  const resolvedFontFamily =
    fontFamily ||
    (isArabic ? '"Noto Naskh Arabic", "Segoe UI", Tahoma, sans-serif' : "inherit");

  const words = useMemo(() => currentText.split(" "), [currentText]);

  // animation "units" per word: individual characters for joining-free scripts,
  // or the whole word for Arabic so its letterforms stay connected
  const wordUnits = useMemo(
    () => words.map((word) => (isArabic ? [word] : word.split(""))),
    [words, isArabic]
  );

  // fresh random scatter offsets per unit, regenerated every tick
  // (tick, not just currentText, so replaying the same sentence still re-randomizes)
  const unitData = useMemo(() => {
    let globalIndex = 0;
    return wordUnits.map((units) =>
      units.map((unit) => {
        const data = {
          unit,
          dx: (Math.random() * 2 - 1) * 42,
          dy: (Math.random() * 2 - 1) * 26 - 8,
          rot: (Math.random() * 2 - 1) * 30,
          delay: globalIndex * 15 + Math.random() * 25,
        };
        globalIndex += 1;
        return data;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordUnits, tick]);

  const totalUnits = unitData.reduce((sum, w) => sum + w.length, 0);
  const flashDelay = totalUnits * 15 + 350;

  return (
    <div dir={direction} style={{ position: "relative", fontFamily: resolvedFontFamily }}>
      <style>{`
        @keyframes bond-in {
          from { opacity: 0; transform: translate(var(--dx,0), var(--dy,0)) rotate(var(--rot,0)); }
          to   { opacity: 1; transform: translate(0,0) rotate(0); }
        }
        @keyframes flash-pulse {
          0%   { opacity: 0; transform: scale(0.3); }
          35%  { opacity: 1; transform: scale(2.4); }
          100% { opacity: 0; transform: scale(3.6); }
        }
      `}</style>

      <span
        aria-hidden="true"
        style={{ display: "inline-flex", flexWrap: "wrap", textAlign: isArabic ? "right" : "left" }}
      >
        {unitData.map((units, wIdx) => (
          <span
            key={`${tick}-word-${wIdx}`}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              position: "relative",
              marginInlineEnd: "0.28em",
            }}
          >
            {units.map((u, uIdx) => (
              <span
                key={`${tick}-unit-${wIdx}-${uIdx}`}
                style={
                  reducedMotion
                    ? { display: "inline-block", opacity: 1, color: textColor, fontSize, fontWeight }
                    : {
                        display: "inline-block",
                        opacity: 0,
                        color: textColor,
                        fontSize,
                        fontWeight,
                        "--dx": `${u.dx.toFixed(1)}px`,
                        "--dy": `${u.dy.toFixed(1)}px`,
                        "--rot": `${u.rot.toFixed(1)}deg`,
                        animation: "bond-in 0.55s cubic-bezier(.22,.9,.32,1.35) forwards",
                        animationDelay: `${u.delay.toFixed(0)}ms`,
                      }
                }
              >
                {u.unit}
              </span>
            ))}

            {wIdx === unitData.length - 1 && !reducedMotion && (
              <span
                key={`${tick}-flash`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 16,
                  height: 16,
                  marginLeft: -8,
                  marginTop: -8,
                  borderRadius: "9999px",
                  background: `radial-gradient(circle, ${accentColor}f2, ${accentColor}00 70%)`,
                  opacity: 0,
                  animation: "flash-pulse 0.75s ease-out forwards",
                  animationDelay: `${flashDelay.toFixed(0)}ms`,
                  pointerEvents: "none",
                }}
              />
            )}
          </span>
        ))}
      </span>

      {/* plain-text fallback for screen readers, since the visual copy is aria-hidden */}
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {currentText}
      </span>
    </div>
  );
}