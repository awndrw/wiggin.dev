import { Link } from "components/Link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { COLORS } from "utils/theme";
import { Palettes } from "./Palettes";
import { Swatch } from "./Swatch";
import styles from "./page.module.scss";

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className={styles.paragraph}>{children}</p>
);

export default function Page() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.title}>
          <div className={styles.swatches}>
            {COLORS.map((color) => (
              <Swatch color={color} key={color} />
            ))}
          </div>
          <h1>OKLCH and P3 Color</h1>
        </div>
        <p>
          Introduced in the{" "}
          <Link
            href="https://w3c.github.io/csswg-drafts/css-color/#lab-colors"
            type="external"
          >
            CSS Color 4
          </Link>{" "}
          specification, the OKLCH color space is perceptually uniform. This
          allows for consistent color palettes regardless of hue. The article{" "}
          <Link
            href="https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems"
            type="external"
          >
            &quot;Accessible Palette&quot; by Eugene Fedorenko
          </Link>{" "}
          goes into detail about the importance of systematic contrast for
          accessible design.
        </p>
        <Palettes />
        <p>
          Accessibility benefits aside, OKLCH displays a wider spectrum of
          colors from the{" "}
          <Link
            href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
            type="external"
          >
            P3 color space
          </Link>
          . This allows the browser to take advantage of the full color gamut of
          modern displays.
        </p>
      </section>
    </div>
  );
}
