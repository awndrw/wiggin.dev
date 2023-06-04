import { type Hue } from "theme/constants";

export interface Cursor {
  position: {
    x: number;
    y: number;
  };
}

export type ServerUser = User;

export interface User {
  id: string;
  hue?: Hue;
  cursor?: Cursor;
}

export type Listener = () => void;
