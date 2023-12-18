# getPureOfMainRelations

extract pure feature of inrelations schema

@param schemaName - name of schema

@returns return pure fetaures of schema that we have inrelation with it

for example if: inerRelation of schema is equal to

```'{
       "posts": { schemaName: "post", type: "many" },
}'
```

output of this function is equal to :

```{
"posts": array({
"id": string(),
"title": string(),
"content": string(),
}),}
```
