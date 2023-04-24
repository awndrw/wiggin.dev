import React from "react";

import { Section, type SectionProps } from "components/Section";
import { env } from "constants/env";
import { host } from "constants/url";

import { Item } from "./Item";

export const EnvironmentSection: React.FC<SectionProps> = (props) => {
  return (
    <Section {...props}>
      <Item title="Environment" value={env.value} />
      <Item title="Host" value={host} />
    </Section>
  );
};
