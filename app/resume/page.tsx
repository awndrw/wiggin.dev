// @ts-expect-error it does exist
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import resumeLight from "../../public/resume/light.jpg";
import resumeDark from "../../public/resume/dark.jpg";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "resume",
};

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
          // @ts-expect-error static type checking in beta. /public files exist
          href="/resume/AndrewWigginResume.pdf"
          aria-label="Resume"
          className={styles.link}
          target="_blank"
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
