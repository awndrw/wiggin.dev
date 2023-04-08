import localFont from "next/font/local";

export const tragedyDisplay = localFont({
  src: [
    {
      path: "./TragedyDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./TragedyDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
});
