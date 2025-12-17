import React, { useEffect, useMemo, useState } from "react";

export default function Carousel({
  slides = [], // [{src, alt, title, subtitle}]
  autoPlay = true,
  interval = 3000,
  loop = true,
  className = "",
}) {
  const [i, setI] = useState(0);
  const total = slides.length;

  const safeIndex = (n) => {
    if (total === 0) return 0;
    if (!loop) return Math.max(0, Math.min(total - 1, n));
    return (n + total) % total;
  };

  const go = (n) => setI(safeIndex(n));
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const t = setInterval(() => {
      setI((cur) => safeIndex(cur + 1));
    }, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, total, loop]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const trackStyle = useMemo(
    () => ({
      transform: `translateX(-${i * 100}%)`,
    }),
    [i]
  );

  if (!slides?.length) return null;

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-slate-900">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={trackStyle}
        >
          {slides.map((s, idx) => (
            <div key={idx} className="min-w-full">
              <div className="relative h-[220px] sm:h-[320px] md:h-[550px]">
                <img
                  src={s.src}
                  alt={s.alt || `slide-${idx + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {(s.title || s.subtitle) && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="text-white">
                      {s.title && (
                        <div className="text-lg sm:text-2xl font-bold">
                          {s.title}
                        </div>
                      )}
                      {s.subtitle && (
                        <div className="text-sm sm:text-base text-white/90">
                          {s.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
