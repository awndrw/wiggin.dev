import { PlaygroundConfig } from "../utils";
import previewPng from "./preview.png";

export default {
  name: "Draggable",
  preview: previewPng.src,
  tags: [
    { name: "accessible", tooltip: "Mouse- or keyboard-based drag and drop" },
    "mobile",
    "desktop",
  ],
} satisfies PlaygroundConfig;
