import { ObjectType, ObjectTypeOptions } from '@nestjs/graphql';
import { FieldsBuilderOptions } from '../interfaces';
import { ClassVoidDecorator } from '../types';
import { typeBuilder } from '../_$src';

export const ObjectTypeBuilder =
  (
    objectTypeOptions: ObjectTypeOptions,
    ...options: FieldsBuilderOptions[]
  ): ClassVoidDecorator =>
  (classRef) =>
    typeBuilder(classRef, ObjectType(objectTypeOptions), options);
