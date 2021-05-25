import { InterfaceType, InterfaceTypeOptions } from '@nestjs/graphql';
import { FieldsBuilderOptions } from '../interfaces';
import { ClassVoidDecorator } from '../types';
import { typeBuilder } from '../_';

export const InterfaceTypeBuilder =
  (
    interfaceTypeOptions: InterfaceTypeOptions,
    ...options: FieldsBuilderOptions[]
  ): ClassVoidDecorator =>
  (classRef) =>
    typeBuilder(classRef, InterfaceType(interfaceTypeOptions), options);
