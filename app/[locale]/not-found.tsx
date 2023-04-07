import { useTranslations } from "next-intl";

import { InternalLink } from "components/Link";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedy";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="accent" fullHeight>
        <h1>{t("headline")}</h1>
        <p>
          {t.rich("body", {
            home: (chunks) => <InternalLink href="/">{chunks}</InternalLink>,
          })}
        </p>
      </Section>
    </PageWrapper>
  );
}
