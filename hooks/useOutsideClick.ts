import { useEffect, useRef } from "react";

interface IUseOutsideClick {
  action: (e: MouseEvent) => void;
  listenCapturing?: boolean;
  enable?: boolean;
}

export const useOutsideClick = ({
  action,
  listenCapturing = true,
  enable = true,
}: IUseOutsideClick) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action(e);
      }
    };

    if (enable) {
      document.addEventListener("click", handleClick, listenCapturing);
    } else {
      document.removeEventListener("click", handleClick, listenCapturing);
    }

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing, enable]);

  return { ref };
};
