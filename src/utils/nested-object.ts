import _ from 'lodash';

export type NestedPathImpl<T, K extends keyof T, L> = K extends string
  ? T[K] extends L
    ? K
    : T[K] extends Record<string, any>
    ? `${K}.${NestedPathImpl<T[K], keyof T[K], L>}`
    : never
  : never;

/**
 * Generic type for accessing object values with dotted string notation
 * @typeParam T
 * @typeParam L - optional - Object tree leaf value type for type restriction
 * @example const obj = { a: { foo: 'hi', bar: { baz: 1 } } }
 * type NumPaths = NestedPaths<typeof obj, number> // 'a.bar.baz'
 */
export type NestedPath<T, L = any> = NestedPathImpl<T, keyof T, L>;

export type NestedPathValue<T, P extends NestedPath<T, L>, L> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends NestedPath<T[K], L>
      ? NestedPathValue<T[K], Rest, L>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

/**
 * Access nested object values with dotted string notation
 * @example  getNestedValue(obj, 'a.bar.baz')
 */
export function getNestedValue<T, P extends NestedPath<T, L>, L>(
  obj: T,
  path: P
): NestedPathValue<T, P, L> {
  const nestedValue = _.get(obj, path);
  if (nestedValue) return nestedValue;
  throw new Error(`Incorrect nested object key - ${path}`);
}
