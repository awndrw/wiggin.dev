import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedy";
import { useNotFoundContent } from "i18n";

export default function NotFound() {
  const content = useNotFoundContent();

  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="accent" fullHeight>
        <h1>{content.headline}</h1>
        <p>{content.body}</p>
      </Section>
    </PageWrapper>
  );
}
