import type React from "react";

import { useTranslations } from "next-intl";

type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType]:
        | `${Key & string}`
        | `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`;
    }[keyof ObjectType]
  : never;

type NestedValueOf<
  ObjectType,
  Property extends string
> = Property extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? NestedValueOf<ObjectType[Key], Rest>
    : never
  : Property extends keyof ObjectType
  ? ObjectType[Property]
  : never;

type NamespaceKeys<ObjectType, Keys extends string> = {
  [Property in Keys]: NestedValueOf<ObjectType, Property> extends string
    ? never
    : Property;
}[Keys];

export type Namespace = NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>;

export type Translator<T extends Namespace> = (
  translator: ReturnType<typeof useTranslations<T>>
) => {
  [Key in keyof NestedValueOf<IntlMessages, T>]: React.ReactNode;
};

export const createContent = <T extends Namespace>(
  namespace: T,
  translator: Translator<T>
) => {
  return function useContent() {
    const t = useTranslations(namespace);
    return translator(t);
  };
};
