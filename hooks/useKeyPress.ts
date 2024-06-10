import { useEffect } from "react";

interface IUseKeyPress {
  key: string;
  action: (e: KeyboardEvent) => void;
  enable?: boolean;
}

export const useKeyPress = ({ key, action, enable = true }: IUseKeyPress) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) action(e);
    };

    if (enable) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [action, key, enable]);
};
