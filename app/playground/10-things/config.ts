import { type PlaygroundConfig } from "../utils";
import previewPng from "./preview.png";

export default {
  name: 'Google\'s "Ten things"',
  preview: previewPng.src,
  tags: ["desktop"],
  warning: "This playground is not accessible or mobile-friendly.",
} satisfies PlaygroundConfig;
