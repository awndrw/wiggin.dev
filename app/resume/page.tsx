import Image from "next/image";
import Link from "next/link";
import resumeLight from "../../public/resume/light.jpg";
import resumeDark from "../../public/resume/dark.jpg";
import styles from "./page.module.scss";

const imageProps = {
  className: styles.image,
  priority: true,
  placeholder: "blur",
  "aria-hidden": true,
  alt: "",
} as const;

export default function Page() {
  return (
    <div className={styles.page}>
      <section>
        <Link
          href="/resume/Andrew%20Wiggin%20Resume.pdf"
          aria-label="Resume"
          className={styles.link}
          download
        >
          <div className={styles.light}>
            <Image src={resumeLight} {...imageProps} />
          </div>
          <div className={styles.dark}>
            <Image src={resumeDark} {...imageProps} />
          </div>
        </Link>
      </section>
    </div>
  );
}
