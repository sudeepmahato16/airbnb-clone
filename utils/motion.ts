export const zoomIn = (scale: number, duration: number) => ({
  hidden: {
    opacity: 0,
    scale,
    transition: {
      duration,
      ease: "easeOut",
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: "easeOut",
    },
  },
});

export const slideIn = (
  direction: string,
  type: string,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    opacity: 0,
    transition: {
      duration,
      ease: "easeInOut",
    },
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      duration,
      ease: "easeInOut",
    },
  },
});
