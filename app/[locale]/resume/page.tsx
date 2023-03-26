import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";

import styles from "./page.module.scss";
import resumeDark from "../../../public/resume/dark.jpg";
import resumeLight from "../../../public/resume/light.jpg";

export const metadata: Metadata = {
  title: "resume",
};

const imageProps = {
  className: styles.image,
  priority: true,
  placeholder: "blur",
  "aria-hidden": true,
} as const;

export default function Page() {
  return (
    <PageWrapper className={styles.page}>
      <Section type="accent" fullHeight>
        <Link
          href="/resume/AndrewWigginResume.pdf"
          aria-label="Resume"
          className={styles.link}
          target="_blank"
          download
        >
          <div className={styles.light}>
            <Image src={resumeLight} alt="" {...imageProps} />
          </div>
          <div className={styles.dark}>
            <Image src={resumeDark} alt="" {...imageProps} />
          </div>
        </Link>
      </Section>
    </PageWrapper>
  );
}
