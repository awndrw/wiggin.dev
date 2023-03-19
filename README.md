# wiggin.dev

* [Structure](#structure)
* [Concepts](#concepts)
  * [State management](#state-management)
  * [Theme](#theme)
    * [Styling](#styling)
* [License](#license)

## Structure
This project uses the Next 13 App Router. Pages can be found in `/app` and all other project code is found in `/src`.

## Concepts
### State management
[Jotai](https://jotai.org) helps prevent unnecessary re-renders by using read-only and write-only state. The global store is found in [`src/store`](src/store).

The utility function [`atomWithLifecycle`](src/utils/atomWithLifecycle.ts) creates a jotai atom that has `onMount` and `onUpdate` callbacks.
Using my `mode` state as an example:
- `onMount` uses the `prefers-color-scheme` media query to set the initial state value
- `onUpdate` updates the `theme-color` meta tag

### Theme
I use OKLCH to create a consistent color scheme across hues. This allows me to use the same lightness and chroma values while rotating the hue.
```typescript
const lightnessAndChromaValues: Record<
  Mode,
  Record<Color, readonly [number, number]>
> = {
  light: {
    primary: [0.56, 0.15],
    "primary-contrast": [0.99, 0.005],
    container: [0.27, 0.06],
    "container-contrast": [0.93, 0.03],
    tint: [0.97, 0.011],
    "tint-contrast": [1, 0],
  },
  dark: {
    primary: [0.88, 0.064],
    "primary-contrast": [0.35, 0.1],
    container: [0.93, 0.03],
    "container-contrast": [0.45, 0.1],
    tint: [0.28, 0.02],
    "tint-contrast": [0.16, 0.02],
  },
};
```
These values are combined with a hue like so:
```typescript
const [lightness, chroma] = lightnessAndChromaValues[mode][color];
const oklch = `oklch(${lightness} ${chroma} ${hue})`;
```

#### Styling
Components are styled using the `data-hue` attribute and individual style tags injected into `<head>`. These tags are created on both the client and server using the [PostCSS OKLAB Function](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-oklab-function).

On mount, a `MutationObserver` is used to watch for `data-hue` attribute changes. When a change is detected, a new style tag is created and injected into `<head>`. This allows the dynamic color system to stay up to date when the DOM is manipulated directly (bypassing the UI).

## License
This code is licensed under [MIT](LICENSE.md).
The fonts used in this project are licensed by NaN Type Foundry to Andrew Wiggin and may not be used outside [wiggin.dev](https://wiggin.dev). [See the license here.](https://www.nan.xyz/eula)
