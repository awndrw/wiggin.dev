import React from "react";

import { Route } from ".types/routes";
import { Action } from "analytics/constants";
import { AnimatedPath } from "components/AnimatedPath";
import { ExternalLink } from "components/Link";
import { Page as PageWrapper } from "components/Page";
import { Section, type SectionProps } from "components/Section";
import { Text } from "components/Text";
import { Trigger } from "components/Trigger";
import { tragedyDisplay } from "fonts/tragedyDisplay";
import { getId } from "utils/getId";

import { ReloadButton } from "./ReloadButton";
import styles from "./page.module.scss";

export const metadata = {
  title: "color",
};

function NumberedSection({
  num,
  children,
  ...sectionProps
}: {
  num: number;
  children: React.ReactNode;
} & SectionProps) {
  return (
    <Section bottomSeparator {...sectionProps}>
      <div className={styles.numberedSection}>
        <span className={styles.number}>{num}</span>
        <Text>{children}</Text>
      </div>
    </Section>
  );
}

export default function Page() {
  const animatedPathTargetId = getId();

  return (
    <PageWrapper className={tragedyDisplay.className} withAffordance={false}>
      <Section type="accent" fullHeight bottomSeparator>
        <Text>
          These colors use oklch to create an accessible color palette with any
          hue. Have you tried{" "}
          <ReloadButton suffix="?">reloading the page</ReloadButton>
        </Text>
        <AnimatedPath
          className={styles.scribble}
          viewBox="0 0 1764.67 627.04"
          targetId={animatedPathTargetId}
          d="m.02,483.23c176-7.34,349.15-71.9,486.99-181.58,52.24-41.56,102.01-94.15,112.2-160.12C609.41,75.56,561.69-1.73,494.97.55c-34.58,1.18-66.27,23.24-84.96,52.36-18.69,29.12-25.71,64.43-26.42,99.02-1.94,94.78,43.56,189.37,118.84,247,120.6,92.33,290.23,81.72,437.92,46.25,147.69-35.47,295.46-91.78,446.56-76.29,157.99,16.2,304.86,116.59,377.32,257.92"
          animatedPathRatio={3}
          startVisible={false}
        />
      </Section>
      <NumberedSection num={1} id={animatedPathTargetId}>
        This color scheme uses{" "}
        <Trigger action={Action.LINK} to="oklch" from={Route.COLOR}>
          <ExternalLink href="">OKLCH</ExternalLink>
        </Trigger>{" "}
        to create an accessible color palette with any hue. Lightness and chroma
        values are fixed and can be found in{" "}
        <Trigger action={Action.LINK} to="theme docs" from={Route.COLOR}>
          <ExternalLink
            href="https://github.com/wiggindev/wiggin.dev#theme"
            suffix="."
          >
            the docs
          </ExternalLink>
        </Trigger>
      </NumberedSection>
      <NumberedSection num={2}>
        Each page is statically generated at build time using all possible hues
        (0-360º). Each hue is rotated on 120º intervals to create a palette.
      </NumberedSection>
      <NumberedSection num={3}>
        A MutationObserver watches the DOM for data-hue attribute changes,
        setting the theme-color meta tag and updating the favicon.
      </NumberedSection>
      <Section fullHeight>
        <Text>
          Looking for something more technical? Just interested in the code?
          Check out{" "}
          <Trigger action={Action.LINK} to="docs" from={Route.COLOR}>
            <ExternalLink
              href="https://github.com/wiggindev/wiggin.dev#readme"
              suffix="."
            >
              the docs
            </ExternalLink>
          </Trigger>
        </Text>
      </Section>
    </PageWrapper>
  );
}
