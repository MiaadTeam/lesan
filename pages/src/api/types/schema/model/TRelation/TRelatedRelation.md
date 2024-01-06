# TRelatedRelation

```ts
export type TRelatedRelation = {
  type: RelationDataType;
  limit?: null | number;
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
};
```
the `TRelatedRelation` type has the following type :

- [`RelationDataType`](./RelationDataType.md)
- [`RelationSortOrderType`](./RelationSortOrderType.md)