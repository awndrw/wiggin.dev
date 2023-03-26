import React from "react";

import { Balancer } from "client/Balancer";
import { AnimatedPath } from "components/AnimatedPath";
import { Logo } from "components/Logo";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedy";
import { useHomeContent } from "i18n";
import { getId } from "utils/getId";

import styles from "./page.module.scss";

export default function Page() {
  const content = useHomeContent();

  const sectionTwoId = getId();
  const sectionThreeId = getId();

  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="accent" fullHeight bottomSeparator>
        <h1>
          {content.headline}
          <Logo className={styles.icon} aria-hidden focusable={false} />
        </h1>
        <Balancer>{content.bio}</Balancer>
        <AnimatedPath
          className={styles.scribbleOne}
          viewBox="0 0 862.83 1809.95"
          targetId={sectionTwoId}
          d="m99.85,165.84c60.38-58.96,123.18-119.5,202.17-149.21,78.99-29.72,179.19-20.35,232.88,44.77,47.42,57.51,46.46,142.68,20.14,212.42-36.01,95.43-115.9,173.27-212.23,206.8-59.08,20.56-144.51,10.74-157.51-50.44-10.33-48.61,36.04-91.59,82.88-108.19,52.93-18.75,113.83-18.1,163.5,8.08,49.67,26.18,85.73,79.49,85.09,135.64-.73,64.15-46.03,119.43-96.66,158.83-50.63,39.4-109.02,69.11-154.43,114.42-45.42,45.31-76.51,113.69-54.06,173.79,30.91,82.76,152.64,100.73,223.5,47.96,43.41-32.33,71.59-93.55,46.83-141.68-20.51-39.87-71-57.07-115.39-50.75-44.39,6.32-83.71,31.46-119.55,58.41C116.99,924.42,7.1,1066.77.78,1229.33c-7.45,191.79,133.72,364.44,304.25,452.53,170.53,88.08,366.76,108.59,557.75,127.6"
          animatedPathRatio={2}
        />
      </Section>
      <Section id={sectionTwoId} fullHeight bottomSeparator>
        <Balancer>{content.about}</Balancer>
        <AnimatedPath
          className={styles.scribbleTwo}
          viewBox="0 0 1764.67 627.04"
          targetId={sectionThreeId}
          d="m.02,483.23c176-7.34,349.15-71.9,486.99-181.58,52.24-41.56,102.01-94.15,112.2-160.12C609.41,75.56,561.69-1.73,494.97.55c-34.58,1.18-66.27,23.24-84.96,52.36-18.69,29.12-25.71,64.43-26.42,99.02-1.94,94.78,43.56,189.37,118.84,247,120.6,92.33,290.23,81.72,437.92,46.25,147.69-35.47,295.46-91.78,446.56-76.29,157.99,16.2,304.86,116.59,377.32,257.92"
          animatedPathRatio={5}
          startVisible={false}
        />
      </Section>
      <Section id={sectionThreeId} fullHeight>
        <Balancer>{content.how_it_works}</Balancer>
      </Section>
    </PageWrapper>
  );
}
