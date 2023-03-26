import { HueSelectButton } from "components/HueSelectButton";
import { ExternalLink, InternalLink } from "components/Link";
import { useTranslations } from "next-intl";

import { type Translator } from "./utils";

export const useMetadataContent: Translator<"Metadata"> = () => {
  const t = useTranslations("Metadata");

  return {
    description: t("description"),
  };
};

export const useHomeContent: Translator<"Home"> = () => {
  const t = useTranslations("Home");

  return {
    headline: t("headline"),
    bio: t("bio"),
    about: t.rich("about", {
      resume: (chunks) => <InternalLink href="/resume">{chunks}</InternalLink>,
      email: (chunks) => (
        <ExternalLink href="mailto:andrew@wiggin.dev">{chunks}</ExternalLink>
      ),
    }),
    how_it_works: t.rich("how_it_works", {
      any_hue: (chunks) => <HueSelectButton>{chunks}</HueSelectButton>,
      docs: (chunks) => (
        <ExternalLink href="https://github.com/wiggindev/wiggin.dev#readme">
          {chunks}
        </ExternalLink>
      ),
    }),
  };
};
