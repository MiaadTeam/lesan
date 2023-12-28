# acts functions

this function is create for define all things in local scope
and also all functions define in this function
@function
@param {Services} acts - is type of Services for get ServiceKeys in function
@returns - return objects of all functions that define in this function

```
 const actsSample = {

   dynamic: {
     user: {
       create: {
         validator: (input: any) => {
           return true;
         },
         fn: (input: any) => {
           return input;
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
   },
 };

 const actsObj: Services = {
   main: {
     dynamic: {},
     static: {},
   },
 };
```
