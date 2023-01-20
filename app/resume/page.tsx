import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import resumePage1 from "../../public/resume1.jpg";
import resumePage2 from "../../public/resume2.jpg";
import Themed from "components/Themed";

export default function Page() {
  return (
    <Themed>
      <div className={styles.page}>
        <Link
          href="/resume.pdf"
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
          />
          <Image
            src={resumePage2}
            alt="Resume page 2"
            width={768}
            className={styles.image}
          />
        </Link>
      </div>
    </Themed>
  );
}
