import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function TimelineEntry({
  left,
  right,
  progress,
  setItemRef, item = { first: 'left' }
}) {
  const active = progress > 0.5;
  const firstOnMobile = item.first === 'right' ? right : left
  const secondOnMobile = item.first !== 'right' ? right : left
  return (
    <Box
      component="li"
      ref={setItemRef}
      sx={{
        position: "relative",
        listStyle: "none",
        display: { xs: "block", md: "grid" },
        gridTemplateColumns: { md: "1fr 1fr" },

        minHeight: { xs: 0, md: "120px" },

        pb: { xs: 6, md: 7 },

        opacity: progress,
        transform: `translateY(${(1 - progress) * 16}px)`,

        "&:last-child": {
          pb: 0,
        },
      }}
    >
      {/* Timeline dot */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "5px",

          left: {
            xs: "18px",
            md: "50%",
          },

          width: "12px",
          height: "12px",

          borderRadius: "50%",

          bgcolor: active
            ? "primary.main"
            : "background.paper",

          border: "2px solid",

          borderColor: active
            ? "primary.main"
            : "divider",

          transform: {
            xs: `translateX(0) scale(${1 + progress * 0.2})`,
            md: `translateX(-50%) scale(${1 + progress * 0.2})`,
          },

          transition: (theme) =>
            theme.transitions.create(
              ["background-color", "border-color"],
              {
                duration: 200,
              }
            ),

          zIndex: 3,
        }}
      />


      {/* Mobile */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          pl: 7,
        }}
      >

        {firstOnMobile}

        {secondOnMobile && (
          <Box sx={{ mt: left ? 4 : 0 }}>
            {secondOnMobile}
          </Box>
        )}
      </Box>



      {/* Desktop - LEFT */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },

          pr: 5.5,

          textAlign: "right",

          minWidth: 0,
        }}
      >
        {left}
      </Box>

      {/* Desktop - RIGHT */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },

          pl: 5.5,

          textAlign: "left",

          minWidth: 0,
        }}
      >
        {right}
      </Box>
    </Box>
  );
}

export default function TimelineAnimation({
  items = [],
}) {
  const reduceMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  const tickingRef = useRef(false);

  const [lineHeight, setLineHeight] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  const [itemProgress, setItemProgress] = useState(() =>
    items.map(() => 0)
  );

  const measureHeight = useCallback(() => {
    if (wrapRef.current) {
      setLineHeight(wrapRef.current.offsetHeight);
    }
  }, []);

  const updateProgress = useCallback(() => {
    tickingRef.current = false;

    if (!wrapRef.current) return;

    const viewportH = window.innerHeight;

    const triggerY = viewportH * 0.8;

    const revealBand = viewportH * 0.28;

    const wrapTop =
      wrapRef.current.getBoundingClientRect().top;

    const wrapHeight =
      wrapRef.current.offsetHeight || 1;

    setLineProgress(
      clamp01((triggerY - wrapTop) / wrapHeight)
    );

    setItemProgress(
      itemRefs.current.map((node) => {
        if (!node) return 0;

        const top =
          node.getBoundingClientRect().top;

        return clamp01(
          (triggerY - top) / revealBand
        );
      })
    );
  }, []);

  const requestUpdate = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;

    requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useLayoutEffect(() => {
    measureHeight();

    if (reduceMotion) {
      setLineProgress(1);
      setItemProgress(items.map(() => 1));
    } else {
      updateProgress();

      window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
      );

      window.addEventListener(
        "resize",
        requestUpdate
      );
    }

    const resizeObserver = new ResizeObserver(() => {
      measureHeight();

      if (!reduceMotion) {
        requestUpdate();
      }
    });

    if (wrapRef.current) {
      resizeObserver.observe(wrapRef.current);
    }

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );
    };
  }, [
    items.length,
    reduceMotion,
    measureHeight,
    updateProgress,
    requestUpdate,
  ]);

  const progressHeight =
    lineHeight * lineProgress;

  const lineSx = {
    position: "absolute",

    top: 0,

    left: {
      xs: "24px",
      md: "50%",
    },

    ml: {
      xs: 0,
      md: "-2px",
    },

    width: "4px",

    borderRadius: "32px",

    pointerEvents: "none",
  };

  return (
    <Box
    >
      <Box
        ref={wrapRef}
        sx={{
          position: "relative",
          maxWidth: 860,
          mx: "auto",
        }}
      >
        {/* Background line */}
        <Box
          sx={{
            ...lineSx,
            height: lineHeight,
            bgcolor: "divider",
          }}
        />

        {/* Animated progress line */}
        <Box
          sx={{
            ...lineSx,
            height: progressHeight,
            bgcolor: "primary.main",
            zIndex: 1,
          }}
        />

        {/* Timeline */}
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          {items.map((item, index) => (
            <TimelineEntry
              key={index}
              item={item}
              left={item.left}
              right={item.right}
              progress={
                itemProgress[index] ?? 0
              }
              setItemRef={(node) => {
                itemRefs.current[index] = node;
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
