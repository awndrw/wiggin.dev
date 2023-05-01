import { Action, EventData } from "analytics/constants";
import { ExternalLink } from "components/Link";
import { Logo } from "components/Logo";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { Text } from "components/Text";
import { Trigger } from "components/Trigger";
import { tragedyDisplay } from "fonts/tragedyDisplay";

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
        <Text>
          Want to see what&rsquo;s going on behind the scenes? Check out{" "}
          <Trigger action={Action.LINK} from={EventData.Route.STATUS} to="docs">
            <ExternalLink href="https://github.com/wiggindev/wiggin.dev#readme">
              the docs
            </ExternalLink>
          </Trigger>
          .
        </Text>
      </Section>
      <EnvironmentSection bottomSeparator className={styles.section} />
      <ThemeSection className={styles.section} />
    </PageWrapper>
  );
}
