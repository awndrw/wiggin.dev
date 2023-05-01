import { Route } from ".types/routes";
import { InternalLink } from "components/Link/InternalLink";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedyDisplay";

export default function NotFound() {
  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="accent" fullHeight>
        <h1>How&rsquo;d you get here?</h1>
        <p>
          When you’re ready, I’ll meet you at{" "}
          <InternalLink to={Route.HOME}>home</InternalLink>.
        </p>
      </Section>
    </PageWrapper>
  );
}
