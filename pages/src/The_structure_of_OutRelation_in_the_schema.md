# The structure of OutRelation in the schema

The outerRelation structure is a relationship that has more than the limitation that we have considered by default for the inrelation relationship. In this type of relationship, we try to store a limited number that may be requested in the first request in an embedded way with a special algorithm. The important point is that for the next user request, they can easily send their request to the main schema and receive the rest of the list from there. Ultimately, this will significantly reduce the number of requests sent to the server.

For example, the number of cities in a country is usually more than a few hundred cities. Our limitation for the inrelation relationship was one hundred, so we store a limited number of cities within the country as an embedded outrelation relationship. By default, we have considered this limited number to be fifty and have sorted these fifty cities by their creation date and in DESC order. Or in another example, if we consider the user schema and the order schema in a shopping program, each order has a customer who is of the user schema type. Therefore, the user is stored in the order schema as an inrelation relationship of type one and embedded. On the other hand, the user schema is also related to the order schema. The user’s orders may be very large, so we store a limited number of each user’s orders as an outRelation relationship embedded in the user schema. We can even store orders multiple times as an outrelation relationship in the user schema. Once sorted by order registration date and once sorted by order price and …

The structure of the outrelation relationship is as follows:

```typescript
export interface OutRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * number of value that we want to keep
   */
  number: number;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort: {
    field: string;
    order: "asc" | "desc";
    type: "number" | "date" | "objectId";
  };
}
```

In this structure, schemaName is the name of the schema that schema A is related to. Number is the number of fields we want to keep in this schema, and an object called sort that includes three values:

1- field that we want to sort by.

2- Order type of ascending or descending.

3- Type the type of field we want to sort by.
