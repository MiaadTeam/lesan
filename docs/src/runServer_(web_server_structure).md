# runServer (web server structure)

Inside the lesan, there is a web server without any dependencies that receives requests and responds appropriately. The structure of this web server is included in a try-catch, so the rest of the written code does not need to be covered with try-catch and it is only necessary to return an appropriate error for each function so that the same error can be sent to the customer side without any unexpected crashes.

The structure of the requests that should be sent to the server is a JSON as follows:

```typescript
{
   "service": "ecommerce",
   "contents": "dynamic",
   "wants": {
       "model": "state",
       "act": "getState"
   },
   "details": {
       "set": {
           "_id": "626fbe6e4b628d43f7e92ae9"
       },
       "get": {
           "name": 1,
           "country": {
               "_id": 1,
               "name": 1,
               "states": {
                   "_id": 1,
                   "name": 1,
                   "country": {
                       "name": 1
                   }
               }
           }
       }
   }
}
```

With the service key, we can choose which microservice is going to respond to the request. By default, the value of this field is main. Sending this key is not mandatory.

The contents key receives the values dynamic and static.

The “wants” key is an object with two keys: model and act. In the model key, the models that exist in the static and dynamic values are selectable and in the act key, the actions that exist in the selected model are selectable.

In the details key, there is also an object with two keys set and get. The set key includes all the information that the selected action in the act key needs and the get key includes information that this action is supposed to return to us and we can choose whether to return details with values of zero or one.
