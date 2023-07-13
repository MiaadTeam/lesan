# Dynamic structure

In fact, every model we create in the database will be one of the dynamic object keys inside the schemas object. Inside this key, for each of the actions written on that model, we create a key and this key also has two other keys. The validator key is executed before the action function and validates the data required by the action before executing its function. The act key is actually the main action function and at runtime will apply the requested changes to the model.

The structure of dynamic is as follows:

```typescript
dynamic: {
	user: {
  	    create: {
    	        validator: () => {
      	            return true;
    	    },
    	    fn: (body) => {
      	        return result;
    	    },
  	},
  	    update: {
    	        validator: (input: any) => {
      	            return true;
    	        },
    	        fn: (input: any) => {
      	            return input;
    	        },
  	    },
	},
  },
```
