export type Select<T, K extends keyof T> = Partial<T> & Pick<T, K>;
