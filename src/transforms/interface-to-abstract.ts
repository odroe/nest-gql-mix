import { Type } from '@nestjs/common';

/**
 * Transform interface class as an abstract class.
 * @param defaults Abstract class fields default values.
 * @returns Abstract class that implements the interface
 */
export function InterfaceTransformAbstract<T>(defaults?: Partial<T>): Type<T> {
  abstract class InterfaceTypeTransformAbstract {}
  if (defaults) {
    for (const key of Object.keys(defaults)) {
      const value = (defaults as Record<string, any>)[key] as any;
      Object.defineProperty(InterfaceTypeTransformAbstract, key, { value });
    }
  }

  return InterfaceTypeTransformAbstract as unknown as Type<T>;
}
