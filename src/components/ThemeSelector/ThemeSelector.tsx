import ColorSelector from "./ColorSelector";

export default function ThemeSelector() {
  return (
    <div role="region" aria-label="Theme Selector">
      <ColorSelector color="neutral" />
      <ColorSelector color="red" />
      <ColorSelector color="green" />
      <ColorSelector color="blue" />
    </div>
  );
}
