import { HueSelectButton } from "components/HueSelectButton";
import { ExternalLink, InternalLink } from "components/Link";

import { createContent } from "./utils";

export const useMetadataContent = createContent("Metadata", (t) => ({
  description: t("description"),
}));

export const useNotFoundContent = createContent("NotFound", (t) => ({
  headline: t("headline"),
  body: t.rich("body", {
    home: (chunks) => <InternalLink href="/">{chunks}</InternalLink>,
  }),
}));

export const useHomeContent = createContent("Home", (t) => ({
  headline: t("headline"),
  bio: t("bio"),
  about: t.rich("about", {
    mellon: (chunks) => (
      <ExternalLink href="https://mellon.org">{chunks}</ExternalLink>
    ),
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
}));
