# schema types
the main schema type is:
```ts
export type TSchemas = Record<string, IModel>;
```
the `TSchema` type has the following type
- [`IModel`](./model.md) is the model type we defined in lesan
  - [`TRelation`](./model/TRelation.md) is used for defining relation get from user
  - [`IMainRelation`](./model/IMainRelation.md) is used to created main relation based on this model relation definition
  - [`IRelatedRelation`](./model/IRelatedRelation.md) is used to created related relation based on other relation is associated with this relations




