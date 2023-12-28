# getSchema

get one feature of schema by schemaName

@param schemaName - name of schema that we want feature

@returns
return one schema feature for example:

```
  pure: {
      "id": string(),
     "name": string(),
     "age": number(),
    },

    inrelation: {
      "posts": { schemaName: "post", type: "many" },
    },

    outrelation: {
      "comments": {
        schemaName: "comment",
        number: 50,
        sort: { filed: "id", order: "desc" },
      },
    },
```
