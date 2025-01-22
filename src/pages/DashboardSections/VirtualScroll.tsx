import { useLayoutEffect, useMemo, useRef, useState } from "react";

const VirtualScroll = ({
  rowHeight,
  totalItems,
  containerHeight,
  renderRow,
}: {
  rowHeight: number;
  totalItems: number;
  containerHeight: string;
  renderRow: (index: number) => any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, height] = useWindowSize();
  const visibleItemsLength = useMemo(() => {
    return height > 100 && ref.current?.clientHeight
      ? ref.current?.clientHeight / rowHeight
      : 100;
  }, [height, rowHeight]);

  // Calculate the total height of the container
  const totalHeight = rowHeight * totalItems;
  //   Current scroll position of the container
  const [scrollTop, setScrollTop] = useState(0);
  // Get the first element to be displayed
  const startNodeElem = Math.ceil(scrollTop / rowHeight);
  // Get the items to be displayed
  const visibleItems = useMemo(
    () =>
      range(startNodeElem, startNodeElem + visibleItemsLength).map(i =>
        renderRow(i)
      ),
    [renderRow, startNodeElem, visibleItemsLength]
  );
  //  Add padding to the empty space
  const offsetY = startNodeElem * rowHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // set scrollTop to the current scroll position of the container.
    const currentTarget = e.currentTarget as HTMLDivElement;
    setScrollTop(currentTarget?.scrollTop);
  };

  return (
    <div
      style={{
        height: containerHeight,
        overflow: "auto",
      }}
      onScroll={handleScroll}
      ref={ref}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
};

export default VirtualScroll;

// generates an array of numbers starting in 'start' and ending in 'end'
export const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, i) => start + i);
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
