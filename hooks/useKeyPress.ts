import { useEffect } from "react";

export const useKeyPress = (
  key: string,
  action: (e: KeyboardEvent) => void
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) action(e);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);

  }, [action, key]);
};
