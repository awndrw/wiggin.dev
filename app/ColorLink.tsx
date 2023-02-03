import { Link } from "components/Link";
import styles from "./ColorLink.module.scss";

export const ColorLink = () => (
  <>
    <span className={styles.displayP3}>
      <Link
        href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
        type="external"
      >
        Display-P3
      </Link>
    </span>
    <span className={styles.oklch}>
      <Link
        href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
        type="external"
      >
        OKLCH
      </Link>
    </span>
  </>
);
