import { useRef, useState, useEffect } from "react";

export function useTextWidth<T extends HTMLElement = HTMLElement>(
  text: string
) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const span = document.createElement("span");
    span.innerText = text;
    ref.current.appendChild(span);
    setWidth(span.offsetWidth);
    ref.current.removeChild(span);
  }, [text]);

  return [ref, width] as const;
}
