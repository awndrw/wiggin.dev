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

export class AttributeObserver {
  private attributes = new Map<string, (mutation: MutationRecord) => void>();
  private observer: MutationObserver | undefined;

  public observe(
    attribute: string,
    callback: (mutation: MutationRecord) => void
  ) {
    if (!this.observer) {
      this.observer = this.getObserver();
      this.attributes.set(attribute, callback);
      this.observer.observe(document.body, {
        attributes: true,
        attributeFilter: [...this.attributes.keys()],
        subtree: true,
      });
      return;
    }
    this.attributes.set(attribute, callback);
    this.updateAttributes();
  }

  public disconnect(attribute: string) {
    const success = this.attributes.delete(attribute);
    if (success) {
      this.updateAttributes();
    }
  }

  private getObserver() {
    return new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (!mutation.attributeName) {
          continue;
        }
        const callback = this.attributes.get(mutation.attributeName);
        if (callback) {
          callback(mutation);
        }
      }
    });
  }

  private updateAttributes() {
    this.observer?.disconnect();
    if (this.attributes.size === 0) {
      return;
    }
    this.observer?.observe(document.body, {
      attributes: true,
      attributeFilter: [...this.attributes.keys()],
    });
  }
}
