"use client";

import React from "react";

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
      {title}: <Tag>{value}</Tag>
    </p>
  );
};

const Tag: React.FC<{ children: Value }> = ({ children }) => {
  return (
    <CopyToClipboard content={children.toString()}>
      <button className={styles.tag}>
        <code>{children}</code>
      </button>
    </CopyToClipboard>
  );
};
