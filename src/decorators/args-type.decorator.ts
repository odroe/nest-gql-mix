import { Type } from '@nestjs/common';
import { ArgsType, Int, registerEnumType } from '@nestjs/graphql';
import { capitalCase } from 'capital-case';
import { sentenceCase } from 'sentence-case';
import { FieldsBuilderOptionHelper } from '../helpers';
import { FieldsBuilderOptions } from '../interfaces';
import { ClassVoidDecorator } from '../types';
import { typeBuilder } from '../_';

export const ArgsTypeBuilder =
  (...options: FieldsBuilderOptions[]): ClassVoidDecorator =>
  (classRef) =>
    typeBuilder(classRef, ArgsType(), options);

/**
 * Fin first args builder.
 * @param name The find type name.
 * @param where Entity where input class.
 * @param orderBy Entity order by input.
 * @param cursor Entity where unique input.
 * @param distinct Entity fields enum.
 * @param take default take value.
 * @returns ClassVoidDecorator
 */
export function FindFirstArgsBuilder<
  where,
  orderBy,
  cursor,
  distinct extends object,
>(
  name: string,
  where: Type<where>,
  orderBy: Type<orderBy>,
  cursor: Type<cursor>,
  distinct: distinct,
  take: number = 15,
): ClassVoidDecorator {
  const enumDescription = sentenceCase(`${name}FieldEnum`);
  registerEnumType(distinct, {
    name: capitalCase(enumDescription, { delimiter: '' }),
  });

  return ArgsTypeBuilder(
    FieldsBuilderOptionHelper(['where'], () => where, {
      nullable: true,
      description: sentenceCase(where.name),
    }),
    FieldsBuilderOptionHelper(['orderBy'], () => [orderBy], {
      nullable: true,
      description: sentenceCase(orderBy.name),
    }),
    FieldsBuilderOptionHelper(['cursor'], () => cursor, {
      nullable: true,
      description: sentenceCase(cursor.name),
    }),
    FieldsBuilderOptionHelper(['distinct'], () => [distinct], {
      nullable: true,
      description: enumDescription,
    }),
    FieldsBuilderOptionHelper(['take'], () => Int, {
      nullable: true,
      description: 'Take `±n` the position of the cursor',
      defaultValue: take,
    }),
    FieldsBuilderOptionHelper(['skip'], () => Int, {
      nullable: true,
      description: 'Skip the first `n`',
    }),
  );
}

/**
 * Fin many args builder.
 * @param name The find type name.
 * @param where Entity where input class.
 * @param orderBy Entity order by input.
 * @param cursor Entity where unique input.
 * @param distinct Entity fields enum.
 * @param take default take value.
 * @returns ClassVoidDecorator
 */
export const FindManyArgsBuilder = FindFirstArgsBuilder;
