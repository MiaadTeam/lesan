# createStruct

create struct features, struct feature is used for create client of db.
struct feature is include pure feature and embed features

@param schemaName - name of schema that we want struct feature

@returns return struct feature
for example :

```
  assign(
        object({
          "id": string(),
          "content": string(),
        }),
        object({
          "user": object({
            "id": string(),
            "name": string(),
            "age": number(),
          }),
          "post": object({
            "id": string(),
            "title": string(),
            "content": string(),
          }),
        }),
     ),
```
