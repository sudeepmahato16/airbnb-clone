export const getTouchEventData = (
  e:
    | MouseEvent
    | TouchEvent
    | React.TouchEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement>
) => {
  return "changedTouches" in e ? e.changedTouches[0] : e;
};
