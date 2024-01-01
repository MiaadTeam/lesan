# model types
the model type is used for create new model in lesan:

```ts
export interface IModel {
  pure: IPureFields;
  relations: Record<string, TRelation>;
  mainRelations: Record<string, IMainRelation>;
  relatedRelations: Record<string, IRelatedRelation>;
}
```

the `IModel` type has the following type:
- [`TRelation`](./model/TRelation.md) is used for defining relation get from user
- [`IMainRelation`](./model/IMainRelation.md) is used to created main relation based on this model relation definition
- [`IRelatedRelation`](./model/IRelatedRelation.md) is used to created related relation based on other relation is associated with this relations

