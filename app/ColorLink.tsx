import { Link } from "components/Link";
import styles from "./ColorLink.module.scss";

export const ColorLink = () => (
  <>
    <Link
      href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/"
      type="external"
      className={styles.displayP3}
    >
      Display-P3
    </Link>
    <Link
      href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl"
      type="external"
      className={styles.oklch}
    >
      OKLCH
    </Link>
  </>
);
