# IMainRelation

```ts
export interface IMainRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: RelationDataType;

  optional: boolean;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}
```
the `IMainRelation` type has the following type :
- [`RelationDataType`](./TRelation/RelationDataType.md)