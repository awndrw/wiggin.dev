import React from "react";

export function useTextWidth<T extends HTMLElement = HTMLElement>(
  text: string
) {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;

    const span = document.createElement("span");
    span.innerText = text;
    ref.current.appendChild(span);
    setWidth(span.offsetWidth);
    ref.current.removeChild(span);
  }, [text]);

  return [ref, width] as const;
}
