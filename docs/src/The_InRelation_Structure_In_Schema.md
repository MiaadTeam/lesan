# The InRelation Structure In Schema

As mentioned in the proposed method section, when schema A has a relationship with schema B, we store the pure values of schema B in the form of embed in schema A.

The relationship inrelation is divided into two types of single and multiple. If it is single, inrelation will be an object. If it is multiple, it will be an array of objects. The important issue is how many pure objects we can store in relation as embed? We have no limitation for this issue in Lesan but MongoDB database has a limitation of **16 megabytes** for each BSON document. Since the number of our relations may not end up with one relation, it is better to consider a limitation ourselves. For example, if the total number of documents we want to embed is less than 100, we consider this relationship as inrelation. If the number is more than 100, we define this relationship as outrelation. The outrelation will be explained later.

The structure of the inrelation relationship is as follows:

```typescript
export interface InRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: "one" | "many";
}
```

In this structure, SchemaName is the name of the schema that schema ‘A’ is associated with. Type can also have the values one or many. If the relationship is single, type takes the value of one and if it is more, it receives the value of many.

For example; As you can see below, the province schema has an inrelation relationship with the country schema, and since each province has only one country, the type of this relationship is single, so type = “one”. And since the number of cities in a province is also very limited. The province schema also has an inRelation relationship with the city, and since its number is more than one, its type becomes many.

```typescript
stateInrelations = {
  cities: { schemaName: "city", type: "many" },
  country: { schemaName: "country", type: "one" },
};
```
