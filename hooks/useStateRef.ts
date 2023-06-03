import { RefObject, useRef, useState } from "react";

export const getRefValue = <S>(ref: RefObject<S>) => ref.current as S;

export const useStateRef = <S>(
  defaultValue: S
): [S, (value: S) => void, RefObject<S>] => {
  const ref = useRef(defaultValue);
  const [state, _setState] = useState(defaultValue);

  const setState = (value: S) => {
    _setState(value);
    ref.current = value;
  };

  return [state, setState, ref];
};
