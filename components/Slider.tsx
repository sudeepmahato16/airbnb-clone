import React, { useRef } from "react";
import { getRefValue, useStateRef } from "@/hooks/useStateRef";
import { getTouchEventData } from "@/libs/dom";

interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentOffSetXRef = useRef(0);
  const containerWidthRef = useRef(0);
  const minOffSetXRef = useRef(0);
  const [offSetX, setOffSetX, offSetXRef] = useStateRef(0);

  const onStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    currentOffSetXRef.current = getRefValue(offSetXRef);
    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffSetXRef.current = containerWidth - containerEl.scrollWidth;

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffSetX = getRefValue(currentOffSetXRef) - diff;

    const minOffSetX = getRefValue(minOffSetXRef);
    const maxOffSetX = 0;

    if (newOffSetX > maxOffSetX) {
      newOffSetX = 0;
    }

    if (newOffSetX < minOffSetX) {
      newOffSetX = minOffSetX;
    }

    setOffSetX(newOffSetX);
  };

  const onEnd = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchend", onEnd);
  };
  return (
    <div
      className="overflow-hidden w-full"
      onMouseDown={onStart}
      onTouchStart={onStart}
    >
      <div
        className={`pt-3 flex flex-row items-center justify-between gap-2 transition-transform duration-200`}
        style={{ transform: `translate3d(${offSetX}px, 0, 0)` }}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
