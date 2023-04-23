import { ActionName } from "analytics/constants";
import { Action } from "components/Action";
import { Balancer } from "components/Balancer";
import { ExternalLink } from "components/Link";
import { Logo } from "components/Logo";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedyDisplay";

import { AnalyticsSection } from "./AnalyticsSection";
import { EnvironmentSection } from "./EnvironmentSection";
import { ThemeSection } from "./ThemeSection";
import styles from "./page.module.scss";

export const metadata = {
  title: "status",
};

export default function Page() {
  return (
    <PageWrapper className={tragedyDisplay.className}>
      <Section fullHeight bottomSeparator type="accent">
        <h1>
          Status
          <Logo
            className={styles.icon}
            aria-hidden
            focusable={false}
            weight="light"
          />
        </h1>
        <Balancer>
          Want to see what&rsquo;s going on behind the scenes? Check out{" "}
          <Action name={ActionName.OPEN_DOCS}>
            <ExternalLink href="https://github.com/wiggindev/wiggin.dev#readme">
              the docs
            </ExternalLink>
          </Action>
          .
        </Balancer>
      </Section>
      <EnvironmentSection bottomSeparator className={styles.section} />
      <ThemeSection bottomSeparator className={styles.section} />
      <AnalyticsSection className={styles.section} />
    </PageWrapper>
  );
}
