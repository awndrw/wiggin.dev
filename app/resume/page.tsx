import Image from "next/image";
import Link from "next/link";
import resumePage1 from "../../public/resume/page1.jpg";
import resumePage2 from "../../public/resume/page2.jpg";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <section className={styles.page}>
      <Link
        href="/resume/resume.pdf"
        aria-label="Resume"
        target="_blank"
        className={styles.link}
      >
        <Image
          src={resumePage1}
          alt="Resume page 1"
          priority
          width={768}
          className={styles.image}
          placeholder="blur"
          aria-hidden
        />
        <Image
          src={resumePage2}
          alt="Resume page 2"
          width={768}
          className={styles.image}
          placeholder="blur"
          aria-hidden
        />
      </Link>
    </section>
  );
}
