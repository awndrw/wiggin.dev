"use client";

import { Link } from "components/Link";

export const ColorLink = () =>
  CSS.supports("color", "color(display-p3 0 0 0)") ? (
    <Link
      href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
      type="external"
    >
      Display-P3
    </Link>
  ) : (
    <Link
      href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
      type="external"
    >
      OKLCH
    </Link>
  );
