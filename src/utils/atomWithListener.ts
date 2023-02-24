import { atom, type SetStateAction } from "jotai";

export function atomWithListener<T>(
  initialValue: T,
  listener: (newValue: T, prevValue: T) => void
) {
  const valueAtom = atom<T>(initialValue);
  return atom(
    (get) => get(valueAtom),
    (get, set, arg: SetStateAction<T>) => {
      const prevValue = get(valueAtom);
      set(valueAtom, arg);
      const newValue = get(valueAtom);
      listener(newValue, prevValue);
    }
  );
}
