# Mannage relations
As we said before, we embed all relationships. So when you define a relation we store the pure fields of both models in each other.  

So far we have defined only one model, let us add the second model.  

We add the following code to the previous codes to add a new model called `city`.
```ts
const cityPure = {
  name: string(),
  population: number(),
  abb: string(),
};

const cityRelations = {
  country: {
    optional: false,
    schemaName: "country",
    type: "single" as RelationDataType,
    relatedRelations: {
      cities: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
};

const cities = coreApp.odm.newModel(
  "city",
  cityPure,
  cityRelations,
);
```

We talked about `newModel` in its input [here](https://miaadteam.github.io/lesan/getting_start.html#add-new-model).  

Now we only talk about the third input, the relation definition. which receives an object with string key and `TRelation` value(`relations: Record<string, TRelation>;`). This value is as follows:
```ts
export type RelationDataType = "single" | "multiple";

export type RelationSortOrderType = "asc" | "desc";

export type TRelatedRelation = {
  type: RelationDataType;
  limit?: null | number;
  sort?: {
    field: string;
    order: RelationSortOrderType
  };
};

interface TRelation {
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
