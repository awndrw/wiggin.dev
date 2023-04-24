import React from "react";

export function useInView(ref: React.RefObject<HTMLElement>): boolean;
export function useInView(selector: string): boolean;
export function useInView(
  refOrSelector: React.RefObject<HTMLElement> | string
): boolean {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const target =
      typeof refOrSelector === "string"
        ? document.querySelector(refOrSelector)
        : refOrSelector.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      setInView(entries[0].isIntersecting);
    });
    observer.observe(target);
  }, [refOrSelector]);

  return inView;
}
