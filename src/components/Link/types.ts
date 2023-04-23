import { type Hue } from "theme/constants";

export type LocalRoute =
  | `/`
  | `/color`
  | `/resume`
  | `/playground`
  | `/playground/10-things`
  | `/playground/draggable`
  | `/status`;

export type RouteType = `/${Hue}${LocalRoute}`;
