type AnyRecord = Record<string, unknown>;

export function mutate<Obj extends AnyRecord, T>(
  obj: Obj,
  callback: (value: Obj[keyof Obj]) => T
): Record<keyof Obj, T> {
  const res: Partial<Record<keyof Obj, T>> = {};
  Object.entries(obj).forEach(([key, value]) => {
    res[key as keyof Obj] = callback(value as Obj[keyof Obj]);
  });
  return res as Record<keyof Obj, T>;
}
