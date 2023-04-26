import React from "react";

import { Action } from "analytics/constants";
import { AnimatedPath } from "components/AnimatedPath";
import { Balancer } from "components/Balancer";
import { ExternalLink, InternalLink } from "components/Link";
import { Logo } from "components/Logo";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { Trigger } from "components/Trigger";
import { tragedyDisplay } from "fonts/tragedyDisplay";
import { getId } from "utils/getId";

import styles from "./page.module.scss";

export default function Page() {
  const scribbleTargetId = getId();

  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="accent" fullHeight bottomSeparator>
        <h1>
          Hi, I&rsquo;m Andrew
          <Logo
            className={styles.icon}
            aria-hidden
            focusable={false}
            weight="light"
          />
        </h1>
        <Balancer>
          I&rsquo;m a brooklyn based design engineer passionate about frontend
          architecture, accessibility, and design systems.
        </Balancer>
        <AnimatedPath
          className={styles.scribble}
          viewBox="0 0 862.83 1809.95"
          targetId={scribbleTargetId}
          d="m99.85,165.84c60.38-58.96,123.18-119.5,202.17-149.21,78.99-29.72,179.19-20.35,232.88,44.77,47.42,57.51,46.46,142.68,20.14,212.42-36.01,95.43-115.9,173.27-212.23,206.8-59.08,20.56-144.51,10.74-157.51-50.44-10.33-48.61,36.04-91.59,82.88-108.19,52.93-18.75,113.83-18.1,163.5,8.08,49.67,26.18,85.73,79.49,85.09,135.64-.73,64.15-46.03,119.43-96.66,158.83-50.63,39.4-109.02,69.11-154.43,114.42-45.42,45.31-76.51,113.69-54.06,173.79,30.91,82.76,152.64,100.73,223.5,47.96,43.41-32.33,71.59-93.55,46.83-141.68-20.51-39.87-71-57.07-115.39-50.75-44.39,6.32-83.71,31.46-119.55,58.41C116.99,924.42,7.1,1066.77.78,1229.33c-7.45,191.79,133.72,364.44,304.25,452.53,170.53,88.08,366.76,108.59,557.75,127.6"
          animatedPathRatio={2}
        />
      </Section>
      <Section id={scribbleTargetId} fullHeight>
        <Balancer>
          I do most of my tinkering at the{" "}
          <Trigger action={Action.LINK} from="home" to="mellon">
            <ExternalLink href="https://mellon.org" suffix=",">
              Mellon Foundation
            </ExternalLink>
          </Trigger>{" "}
          but I spend a lot of my free time{" "}
          <InternalLink href="/color" suffix=".">
            playing with color
          </InternalLink>{" "}
          Just want to chat? Send me an{" "}
          <Trigger action={Action.LINK} from="home" to="email">
            <ExternalLink href="mailto:andrew@wiggin.dev" suffix=".">
              email
            </ExternalLink>
          </Trigger>
        </Balancer>
      </Section>
    </PageWrapper>
  );
}
