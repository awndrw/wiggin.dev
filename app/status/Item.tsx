"use client";

import React from "react";

import { trackAction } from "analytics";
import { Action } from "analytics/constants";
import { CopyToClipboard } from "components/CopyToClipboard";

import styles from "./Item.module.scss";

type Value = string | number | boolean;

export interface ItemProps {
  title: string;
  value: Value;
}

export const Item: React.FC<ItemProps> = ({ title, value }) => {
  return (
    <p>
      {title}:{" "}
      <CopyToClipboard content={value.toString()}>
        <button
          onClick={() =>
            trackAction(Action.COPY_ENV_VAR, { name: title.toLowerCase() })
          }
          className={styles.tag}
        >
          <code>{value}</code>
        </button>
      </CopyToClipboard>
    </p>
  );
};
