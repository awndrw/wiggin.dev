import c from "classnames";
import Image from "next/image";
import Link from "next/link";
import resumePage1Light from "../../public/resume/page1_light.png";
import resumePage2Light from "../../public/resume/page2_light.png";
import resumePage1Dark from "../../public/resume/page1_dark.png";
import resumePage2Dark from "../../public/resume/page2_dark.png";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      <section>
        <Link
          href="/resume/resume.pdf"
          aria-label="Resume"
          target="_blank"
          className={styles.link}
        >
          <div className={styles.light}>
            <Image
              src={resumePage1Light}
              className={styles.image}
              priority
              width={768}
              placeholder="blur"
              aria-hidden
              alt=""
            />
            <Image
              src={resumePage2Light}
              className={styles.image}
              priority
              width={768}
              placeholder="blur"
              aria-hidden
              alt=""
            />
          </div>
          <div className={styles.dark}>
            <Image
              src={resumePage1Dark}
              className={styles.image}
              priority
              width={768}
              placeholder="blur"
              aria-hidden
              alt=""
            />
            <Image
              src={resumePage2Dark}
              className={styles.image}
              priority
              width={768}
              placeholder="blur"
              aria-hidden
              alt=""
            />
          </div>
        </Link>
      </section>
    </div>
  );
}
