import { ReturnTypeFunc } from '@nestjs/graphql';
import { FieldOptions, ReturnTypeFn } from './types';

/**
 * Field builder option.
 */
export interface FieldsBuilderOptions {
  /**
   * The field return type function.
   */
  type: ReturnTypeFn;

  /**
   * Field names or options.
   */
  fields: string | string[] | FieldOptions | FieldOptions[];
}

export interface TypePrototype {
  type: ReturnTypeFunc;
  options: FieldOptions;
}
