import React, { useRef } from "react";

export function ScrollCarousel({ children }) {
  const ref = useRef(null);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative w-[1000px]">
      <div
        ref={ref}
        className="flex gap-[14px] overflow-x-auto scroll-smooth snap-x snap-mandatory px-[6px] py-[8px]
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="min-w-[200px] shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-200 bg-white
                   grid place-items-center cursor-pointer shadow-sm hover:bg-gray-50"
      >
        ‹
      </button>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-200 bg-white
                   grid place-items-center cursor-pointer shadow-sm hover:bg-gray-50"
      >
        ›
      </button>
    </div>
  );
}
