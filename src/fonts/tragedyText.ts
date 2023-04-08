import localFont from "next/font/local";

export const tragedyText = localFont({
  src: [
    {
      path: "./TragedyText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./TragedyText-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});
