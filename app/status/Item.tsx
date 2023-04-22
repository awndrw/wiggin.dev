import React from "react";

export interface ItemProps {
  title: string;
  value: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ title, value }) => {
  return (
    <p>
      {title}: <code>{value}</code>
    </p>
  );
};
