import Image from "next/image";
import resumePage1 from "../../public/resume1.jpg";
import resumePage2 from "../../public/resume2.jpg";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.page}>
      <Link href="/resume.pdf" className={styles.link}>
        <Image
          src={resumePage1}
          alt="Resume page 1"
          priority
          width={768}
          className={styles.image}
        />
        <Image
          src={resumePage2}
          alt="Resume page 2"
          width={768}
          className={styles.image}
        />
      </Link>
    </div>
  );
}
