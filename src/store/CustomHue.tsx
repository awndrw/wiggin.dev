"use client";

import React from "react";

export interface CustomHueContext {
  showPopover: boolean;
  setShowPopover: (showTooltip: boolean) => void;
}

export const CustomHueContext = React.createContext<CustomHueContext>({
  showPopover: false,
  setShowPopover: () => null,
});

export const CustomHueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showPopover, setShowPopover] = React.useState(false);

  return (
    <CustomHueContext.Provider value={{ showPopover, setShowPopover }}>
      {children}
    </CustomHueContext.Provider>
  );
};
