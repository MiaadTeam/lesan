# TRelation

```ts
export interface TRelation {
  schemaName: string;
  type: RelationDataType;
  optional: boolean;
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
  relatedRelations: {
    [key: string]: TRelatedRelation;
  };
}
```
the `TRelation` type has the following type :
- [`RelationDataType`](./TRelation/RelationDataType.md) is the model type we defined in lesan
- [`RelationSortOrderType`](./TRelation/RelationSortOrderType.md) is used for defining relation get from user
- [`TRelatedRelation`](./TRelation/TRelatedRelation.md) is used to created main relation based on
