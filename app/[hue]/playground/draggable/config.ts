import previewPng from "./preview.png";
import { type PlaygroundConfig } from "../utils";

export default {
  name: "Draggable",
  preview: previewPng.src,
  tags: [
    { name: "accessible", tooltip: "Mouse- or keyboard-based drag and drop" },
    "mobile",
    "desktop",
  ],
} satisfies PlaygroundConfig;
