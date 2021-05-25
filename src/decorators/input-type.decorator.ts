import { Type } from '@nestjs/common';
import { InputType, InputTypeOptions } from '@nestjs/graphql';
import { FieldsBuilderOptionHelper } from '../helpers';
import { FieldsBuilderOptions } from '../interfaces';
import { LIST_THIS_TYPE } from '../symbols';
import { ClassVoidDecorator } from '../types';
import { typeBuilder } from '../_$src';

export const InputTypeBuilder =
  (
    inputTypeOptions: InputTypeOptions,
    ...options: FieldsBuilderOptions[]
  ): ClassVoidDecorator =>
  (classRef) =>
    typeBuilder(classRef, InputType(inputTypeOptions), options);

/**
 * Build where input class Decorator
 * @param options Field builder options.
 * @returns ClassVoidDecorator
 */
export function WhereInputTypeBuilder(
  options: InputTypeOptions,
  ...builderOptions: FieldsBuilderOptions[]
): ClassVoidDecorator {
  return InputTypeBuilder(
    options,
    ...builderOptions,
    FieldsBuilderOptionHelper(
      ['AND', 'NOT', 'OR'],
      LIST_THIS_TYPE,
      (options) => ({
        nullable: true,
        description: `${options.name} where input.`,
      }),
    ),
  );
}

/**
 * Relation filter builder.
 * @param typeRef Relation filter using where input.
 * @returns ClassVoidDecorator
 */
export function RelationFilterBuilder<T>(
  type: () => Type<T>,
): ClassVoidDecorator {
  return InputTypeBuilder(
    {},
    FieldsBuilderOptionHelper(['every', 'some', 'none'], type, {
      nullable: true,
    }),
  );
}
