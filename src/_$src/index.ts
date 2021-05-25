import { Field, ReturnTypeFunc } from '@nestjs/graphql';
import { FieldsBuilderOptions, TypePrototype } from '../interfaces';
import { LIST_THIS_TYPE, THIS_TYPE } from '../symbols';
import { ClassVoidDecorator, FieldOptions } from '../types';

function getProperties<T extends Function>(
  classRef: T,
  ...options: FieldsBuilderOptions[]
): TypePrototype[] {
  const properties: TypePrototype[] = [];
  for (const option of options) {
    const fieldTypeBuilder: ReturnTypeFunc =
      option.type === LIST_THIS_TYPE
        ? () => [classRef]
        : option.type === THIS_TYPE
        ? () => classRef
        : (option.type as ReturnTypeFunc);

    const fields =
      typeof option.fields === 'string'
        ? [option.fields]
        : Array.isArray(option.fields)
        ? option.fields
        : [option.fields];
    for (const field of fields) {
      const fieldOptions: FieldOptions =
        typeof field === 'string' ? { name: field } : field;
      properties.push({
        type: fieldTypeBuilder,
        options: fieldOptions,
      });
    }
  }

  return properties;
}

export function propertiesBuilder(
  options: FieldsBuilderOptions[],
): ClassVoidDecorator {
  return function (classRef) {
    for (const { type, options: $options } of getProperties(
      classRef,
      ...options,
    )) {
      Field(type, $options)(classRef.prototype, $options.name);
    }
  };
}

export function typeBuilder(
  classRef: Function,
  decorator: ClassVoidDecorator,
  options: FieldsBuilderOptions[],
): void {
  propertiesBuilder(options)(classRef);
  decorator(classRef);
}
