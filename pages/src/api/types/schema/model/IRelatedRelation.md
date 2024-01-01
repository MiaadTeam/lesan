# IRelatedRelation


```ts
export interface IRelatedRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * name of the main relation related to this relation
   */
  mainRelationName: string;
  /**
   * type of the main relation related to this relation
   */
  mainRelationType: RelationDataType;
  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: RelationDataType;
  /**
   * number of value that we want to keep
   */
  limit?: null | number;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}
```

the `IRelatedRelation` type has the following type :
- [`RelationDataType`](./TRelation/RelationDataType.md)
