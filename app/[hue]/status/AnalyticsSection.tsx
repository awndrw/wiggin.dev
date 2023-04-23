import React from "react";

import { datadog } from "analytics";
import { Section, type SectionProps } from "components/Section";

import { Item } from "./Item";

export const AnalyticsSection: React.FC<SectionProps> = (props) => {
  return (
    <Section {...props}>
      <Item
        title="RUM"
        value={datadog.getInitConfiguration()?.version ?? "not initialized"}
      />
    </Section>
  );
};
