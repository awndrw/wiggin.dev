import type React from "react";

type CSSProperties = React.CSSProperties & {
  [customAttribute: `--${string}`]: string | number;
};

export const sx = style;
export function style(cssProperties: CSSProperties): React.CSSProperties {
  return cssProperties;
}
