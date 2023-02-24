import { atom, type SetStateAction } from "jotai";

export function atomWithListener<T>(
  initialValue: T,
  listener: (newValue: T) => void
) {
  const valueAtom = atom<T>(initialValue);
  return atom(
    (get) => get(valueAtom),
    (get, set, arg: SetStateAction<T>) => {
      set(valueAtom, arg);
      listener(get(valueAtom));
    }
  );
}
