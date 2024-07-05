import { useEffect, MutableRefObject } from "react";

const useClickOutside = (
  ref:
    | MutableRefObject<HTMLElement | null>
    | MutableRefObject<HTMLElement | null>[],
  handler: () => void
): void => {
  useEffect(() => {
    const refs = Array.isArray(ref) ? ref : [ref];

    const shouldTrigger = (event: MouseEvent) =>
      refs.every(
        ref => ref.current && !ref.current.contains(event.target as Node)
      );
    const handleClickOutside = (event: MouseEvent) => {
      if (shouldTrigger(event)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, ref]);
};

export default useClickOutside;
