# getPureFromRelatedRelations

- extract pure feature of outrelation of schema

- @param schemaName - name of schema

- @returns return pure fetaures of schema that we have outrelation with it
- for example if: outrelation of schema is equal to

```
'{

       "comments": {
         schemaName: "comment",
         number: 50,
         sort: { filed: "id", order: "desc" },
       },
  }'
```

```
   output of this function is equal to :{
         "comments": array({
          "id": string(),
          "content": string(),
        }),
  }
```
