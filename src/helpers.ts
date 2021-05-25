import { FieldsBuilderOptions } from './interfaces';
import { FieldOptions, ReturnTypeFn } from './types';

/**
 * Fields builder option helper.
 * @param keys Need builder keys.
 * @param type Keys return type function.
 * @param fn field option or field option callback function.
 * @returns FieldsBuilderOption
 */
export function FieldsBuilderOptionHelper(
  keys: string[],
  type: ReturnTypeFn,
  fn?:
    | ((option: FieldOptions) => Partial<FieldOptions>)
    | Partial<Omit<FieldOptions, 'name'>>,
): FieldsBuilderOptions {
  const fields: FieldOptions[] = keys.map((key: string) => ({ name: key }));
  const option: FieldsBuilderOptions = { type, fields };

  switch (typeof fn) {
    case 'function':
      option.fields = (option.fields as FieldOptions[]).map((option) =>
        Object.assign(option, fn(option)),
      );
      return option;
    case 'object':
      option.fields = (option.fields as FieldOptions[]).map((option) =>
        Object.assign(option, fn),
      );
      return option;
    default:
      return option;
  }
}
