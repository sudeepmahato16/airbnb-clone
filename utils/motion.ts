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

export const fadeIn = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.15,
      type: "tween",
      ease: "easeIn",
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.15,
      type: "tween",
      ease: "easeIn"
    },
  },
};

export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  type: "tween" | "spring",
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    opacity: 0,
    transition: {
      duration,
      type,
      ease: "easeOut"
    },
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      duration,
      ease: "easeInOut"
    },
  },
});
