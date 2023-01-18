import Balancer from "react-wrap-balancer";
import styles from "./page.module.scss";
import Link from "components/Link";
import Icon from "../src/components/Icon";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>
        Hi, I&apos;m Andrew
        <Icon
          iconName="smile"
          className={styles.smile}
          aria-hidden
          focusable={false}
        />
      </h1>
      <Balancer as="p">
        I&apos;m an nyc based design engineer excited by design systems, motion
        design and accessibility. Check out my{" "}
        <Link href="/resume.pdf">resume</Link> or send me an{" "}
        <Link href="mailto:andrew@wiggin.dev" type="external">
          email
        </Link>
        .
      </Balancer>
    </main>
  );
}
