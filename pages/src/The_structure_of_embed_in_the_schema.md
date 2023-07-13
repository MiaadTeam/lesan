# The structure of embed in the schema

The embed structure is created at runtime and when the createEmbeded function is executed, it finds all the inrelation and outrelation relationships of all schemas from other schemas and replaces the pure relationship values.

If we consider the relationships of a schema as follows:

```typescript
inrelation: {
"country": { schemaName: "country", type: "many" },
 },
outrelation: {
   	"orders": {
     	schemaName: "order",
     	number: 50,
     	sort: { filed: "id", order: "desc" },
   	},
},
```

The structure of the embedded will be as follows:

```typescript
embedded: {
   	"country": object({
     	    "id": string(),
     	    "name": string(),
  	}),
 	"orders": array({
     	    "id": string(),
     	    "price": number(),
  	}),
 },
```
