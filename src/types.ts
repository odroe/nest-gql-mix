import { FieldOptions as $FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { LIST_THIS_TYPE, THIS_TYPE } from './symbols';

/**
 * Field option.
 */
export type FieldOptions = Required<Pick<$FieldOptions, 'name'>> &
  Omit<$FieldOptions, 'name'>;

/**
 * Return this function value.
 */
export type ReturnThisTypeFnValue = typeof THIS_TYPE | typeof LIST_THIS_TYPE;

/**
 * Return type function.
 */
export type ReturnTypeFn = ReturnTypeFunc | ReturnThisTypeFnValue;

/**
 * Class decorator type.
 */
export type ClassVoidDecorator = <T extends Function>(classRef: T) => void;
