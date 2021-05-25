# NestJS GraphQL binding Prisma
 NestJS + GraphQL(code first) + Prisma, Help you to implement the Prisma template interface as a GraphQL(code first) Type classes. 🎉Fast work!

## Installation

Via NPM:
```shell
npm i @bytegem/nestjs-graphql-binding-prisma
```

Or via Yarn:
```shell
yarn add @bytegem/nestjs-graphql-binding-prisma
```

## Using

Before using this package:
```typescript
@InputType({ description: 'This is User where input' })
export class UserWhereInput implements Prisma.UserWhereInput {
    @Field((type) => [UserWhereInput], { nullable: true })
  AND?: UserWhereInput[];

  @Field((type) => [UserWhereInput], { nullable: true })
  OR?: UserWhereInput[];

  @Field((type) => [UserWhereInput], { nullable: true })
  NOT?: UserWhereInput[];

  @Field((type) => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  username?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  phone?: StringFilter;

  /// More fields...
```

Now:
```typescript
@InputTypeBuilder(
  { description: 'User where input' },
  FieldsBuilderOptionHelper(
    ['id', 'username', 'email', 'phone', /* ...more fields */],
    () => StringFilter,
    { nullable: true },
  ),
)
export class PermissionWhereInput extends InterfaceTransformAbstract<Prisma.UserWhereInput>>() {}
```

> `extends InterfaceTransformAbstract<T>()` is optional. After adding it, you can prompt the IDE code when you actively use this class. Not inheriting has no effect on the actual operation.

## Decorators

- `ArgsTypeBuilder`: The `ArgsType` class builder.
    - `FindFirstArgsBuilder`: Fast build Prisma `${Model}FindFirst` args class.
    - `FindManyArgsBuilder`: Fast build Prisma `${Model}FindMany` args class.
- `InputTypeBuilder`: The `InputType` class builder.
    - `WhereInputTypeBuilder`: Fast build Prisma `${Model}WhereInput` input class.
    - `RelationFilterBuilder`: Fast build Prisma `${Model}ListRelationFilter` input class.
- `InterfaceTypeBuilder`: The `InterfaceType` class builder.
- `ObjectTypeBuilder`: The `ObjectType` class builder.

## Helpers

- `FieldsBuilderOptionHelper`: Passing [Args|Object|Input|Interface]TypeBuilder parameters does not simplify much code work. For multiple fields with the same FieldOptions, you can use this tool to quickly generate.

## Transforms

- `InterfaceTransformAbstract`: You can transform the interface class into an abstract class to help IDE with code hints.

## License

The package is [MIT License](https://opensource.org/licenses/MIT).
