import { Separator } from "client/Separator";
import { Link } from "components/Link";
import Image from "next/image";
import React from "react";
import { COLORS } from "utils/theme";
import { Palettes } from "./Palettes";
import { Swatch } from "./Swatch";
import styles from "./page.module.scss";

const swatchVariants = [
  {},
  { transform: "rotate(90deg)", flexDirection: "column-reverse" },
  { transform: "rotate(180deg)" },
] as const;

const modifier = Math.round(Math.random() * swatchVariants.length);

export default function Page() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.title}>
          <div className={styles.swatches}>
            {COLORS.map((color, i) => (
              <Swatch
                color={color}
                style={swatchVariants.at(i - modifier)}
                key={color}
              />
            ))}
          </div>
          <h1>OKLCH and P3 Color</h1>
        </div>
        <p>
          This site uses three color roles: primary, container and tint. Each
          tone (and its contrast) is assigned a lightness and chroma and the hue
          is rotated depending on the selected color. Here are three hues
          applied to each color role, making up the color palette used on this
          site:
        </p>
        <Palettes />
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
        <div className={styles.image}>
          <Image
            src="/images/buttons-hsl-vs-oklch.webp"
            width={343}
            height={218}
            alt="There are 4 buttons. The first column has two buttons and represents the HSL space before and after using the rotation angle, and the second column with the other two buttons represents the OKLCH space before and after using the rotation angle. After changes in HSL, the contrast between the background and text is lower, unlike OKLCH."
          />
          <label>
            from{" "}
            <Link
              href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
              type="external"
            >
              &quot;OKLCH in CSS&quot; by Evil Martians
            </Link>
          </label>
        </div>
        <p>
          In this example, we see two buttons with the same HSL saturation and
          lightness on the left and the same (translated) OKLCH saturation and
          lightness on the right. Becuse of the dramatic difference in contrast
          between HSL hues, the bottom left button is almost illegible.
        </p>
        <Separator
          orientation="horizontal"
          decorative
          className={styles.separator}
        />
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
        <div className={styles.image}>
          <Image
            src="/images/p3.png"
            width={842}
            height={300}
            alt="On the left side, a shape shows the extra P3 colors extending from sRGB, represented as an extended wedge from the original shape. On the right side, the left icon is rendered in sRGB, and the right icon is rendered with P3 colors, showing how they are more vibrant."
          />
          <label className={styles.label}>
            from{" "}
            <Link
              href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
              type="external"
            >
              &quot;OKLCH in CSS&quot; by Evil Martians
            </Link>
          </label>
        </div>
      </section>
    </div>
  );
}
