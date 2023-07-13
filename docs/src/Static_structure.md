# Static structure

The structure of static is exactly the same as the structure of dynamic, except that it stores information in RAM and is usually used to store a parsed page of client-side apps. This has two advantages: first, if a page was supposed to send multiple requests to the dynamic structure, by storing its information in the static structure, we can receive this information by sending only one request to one of the keys set on the static structure models. Second, the stored information inside the static structure is stored in RAM so that it can be created, updated, deleted and retrieved more quickly.

The stored information inside the static structure is managed with an immutable state management.

Finally, the static structure acts as a cache layer, a layer whose information has an appropriate interaction with the actual data inside the database and can be easily updated and managed.

The structure of static is as follows:

```typescript
static: {
	"blogFirstPage": {
  		"get": {
    			"validator": (input: any) => {
      				return true;
    		},
    		"fn": (input: any) => {
      			return input;
    		},
  	},
  		"set": {
    			"validator": (input: any) => {
      				return true;
    		},
    		"fn": (input: any) => {
      			return input;
    		},
  	},
},
```
