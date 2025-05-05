import React, { useRef, useState } from "react";

const Slider = ({ items }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollBy = (direction) => {
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Prev Arrow */}
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow px-2 py-1 rounded"
      >
        ◀
      </button>

      {/* Next Arrow */}
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow px-2 py-1 rounded"
      >
        ▶
      </button>

      {/* Slider container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] h-48 bg-gray-200 flex items-center justify-center rounded"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
