import React from "react";

import { Action, EventData } from "analytics/constants";
import { AnimatedPath } from "components/AnimatedPath";
import { Balancer } from "components/Balancer";
import { ExternalLink } from "components/Link";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { Trigger } from "components/Trigger";
import { tragedyDisplay } from "fonts/tragedyDisplay";
import { getId } from "utils/getId";

import { HueSelectButton } from "./HueSelectButton";
import { ReloadButton } from "./ReloadButton";
import styles from "./page.module.scss";

export const metadata = {
  title: "color",
};

export default function Page() {
  const animatedPathTargetId = getId();

  return (
    <PageWrapper className={tragedyDisplay.className} withAffordance={false}>
      <Section type="accent" fullHeight bottomSeparator>
        <Balancer>
          These colors use oklch to create an accessible color palette with{" "}
          <HueSelectButton suffix=".">any hue</HueSelectButton> Have you tried{" "}
          <ReloadButton suffix="?">reloading the page</ReloadButton>
        </Balancer>
        <AnimatedPath
          className={styles.scribble}
          viewBox="0 0 1764.67 627.04"
          targetId={animatedPathTargetId}
          d="m.02,483.23c176-7.34,349.15-71.9,486.99-181.58,52.24-41.56,102.01-94.15,112.2-160.12C609.41,75.56,561.69-1.73,494.97.55c-34.58,1.18-66.27,23.24-84.96,52.36-18.69,29.12-25.71,64.43-26.42,99.02-1.94,94.78,43.56,189.37,118.84,247,120.6,92.33,290.23,81.72,437.92,46.25,147.69-35.47,295.46-91.78,446.56-76.29,157.99,16.2,304.86,116.59,377.32,257.92"
          animatedPathRatio={3}
          startVisible={false}
        />
      </Section>
      <Section bottomSeparator id={animatedPathTargetId}>
        <div className={styles.numberedSection}>
          <span className={styles.number}>1</span>
          <Balancer>
            An initial palette of three colors is generated on the server. Each
            page is statically generated at build time using all possible hues
            (0-360).
          </Balancer>
        </div>
      </Section>
      <Section bottomSeparator>
        <div className={styles.numberedSection}>
          <span className={styles.number}>2</span>
          <Balancer>
            Additional colors are generated on the client on an as-needed basis
            using the PostCSS OKLAB Function.
          </Balancer>
        </div>
      </Section>
      <Section bottomSeparator>
        <div className={styles.numberedSection}>
          <span className={styles.number}>3</span>
          <Balancer>
            A MutationObserver watches the DOM for data-hue attribute changes.
            Styles are generated for new hues.
          </Balancer>
        </div>
      </Section>
      <Section fullHeight>
        <Balancer>
          Looking for something more technical? Just interested in the code?
          Check out{" "}
          <Trigger action={Action.LINK} from={EventData.Route.COLOR} to="docs">
            <ExternalLink
              href="https://github.com/wiggindev/wiggin.dev#readme"
              suffix="."
            >
              the docs
            </ExternalLink>
          </Trigger>
        </Balancer>
      </Section>
    </PageWrapper>
  );
}
