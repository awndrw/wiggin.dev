import { atom, type SetStateAction, type WritableAtom } from "jotai";

export function atomWithLifecycle<T>(
  initialValue: T,
  onMount: WritableAtom<T, T[], T>["onMount"],
  onUpdate: (newValue: T, prevValue: T) => void
) {
  const valueAtom = atom<T>(initialValue);
  valueAtom.onMount = onMount;
  return atom(
    (get) => get(valueAtom),
    (get, set, arg: SetStateAction<T>) => {
      const prevValue = get(valueAtom);
      set(valueAtom, arg);
      const newValue = get(valueAtom);
      onUpdate(newValue, prevValue);
    }
  );
}
