"use client";

import { useAtomValue } from "jotai";

import { hueAtom, modeAtom } from "store";

export default function Page() {
  const hue = useAtomValue(hueAtom);
  const mode = useAtomValue(modeAtom);

  return (
    <div>
      <h1>Status</h1>
      <p>Hue: {hue}</p>
      <p>Mode: {mode}</p>
    </div>
  );
}
