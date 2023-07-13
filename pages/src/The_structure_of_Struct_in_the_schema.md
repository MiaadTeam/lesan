# The structure of Struct in the schema

The Struct is also created at runtime and when the createStruct function is executed, it is used to fully validate that schema. The Struct contains the pure properties of a schema and the embedded properties extracted above. For example, the struct for the user schema that has a relationship with country and order is as follows:

```typescript
struct: {
	name:string(),
	lastName:string(),
   	"country": {
     	    "id": string(),
     	    "name": string(),
  	}),
 	"orders": array({
     	    "id": string(),
     	    "price": number(),
  	}),
 },
```

You can read all the features of the superstruct library [here](https://docs.superstructjs.org/api-reference/types).
