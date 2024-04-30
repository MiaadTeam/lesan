# Request flow in Lesan
We only accept two types of `HTTP` methods in **Lesan**:
- GET
- POST

### GET Requests:
We accept two models of `GET` requests:
- Requests sent to serve a `static` document.  
In order to receive a `static` document with a `GET` request, you must first allow its `path` to **Lesan**, for this you only need to add the following settings when calling the `runServer` function:
    ```ts
      coreApp.runServer({ staticPath: ["/pictures", "/videos"] });
    ```
    > The `staticPath` key receives an `array` of `strings`

    Now all the files in the `pictures` or `videos` folder will be accessible by sending a `GET` request, for example:
    ```HTTP
    https://www.xyz.com/pictures/avatar.png
    ```
- Requests sent to receive `playground static` documents or access to the `playground` itself.  
In order to access the `playground`, you must set the `playground` entry in the `runServer` function equal to `true`.
    ```ts
      coreApp.runServer({ playground: true });
    ```
    > The `playground` key receives a `boolean` value.

    Now you can access the `playground` by sending a `GET` request to an address similar to `http://localhost:1367/playground`.  
    Note that the following addresses will be accessible together with the `playground` and will send the necessary `data` to run the `playground`:
    - /playground/static/index.css  
        which sends the necessary `styles` for the `UI` in the `playground`.
    - /playground/static/bundle.js  
        which sends a `JS bundle` of all the codes needed to run the `playground`.
    - /playground/static/get/schemas  
        which sends two `JSON` data, `schemas` and `acts`, which contain all the information we need in the `playground` to send `requests` to the `server`.


### POST Requests:
We accept two models of `POST` requests:
- Requests sent to `receive data` from the `server` (in fact, these requests are the main requests sent to **Lesan**).
- Requests sent to `upload` a document.

#### Receive data
To `receive data` from the **Lesan** server, you must send a `POST` request to the final address of **Lesan**.
In the `body` of this request, must be an `object` in `JSON` format with the following keys:

- The `service` key is used to select one of the `microservices` set on the application. This key is optional and by default the value of `main` is placed in it.
- The `model` key is used to select one of the `Models` added to the application.
- The `act` key is used to select one of the `Acts` added to the application.
- The `details` key is used to receive data to be sent from the client side along with data to be delivered to users. This key has two internal keys called `get` and `set`, we talked a little about it before.
  - `set`: It contains the information we need in the `Act` function. 
  - `get`: Contains selected information that the user needs to be returned. This selection is based on `zero` or `one`. Therefore, we can pass this object directly to MongoDB `projection`.
  
An example of this `JSON` object is as follows:
```JSON
{
  "service": "main",
  "model": "country",
  "act": "addCountry",
  "details": {
    "set": {
      "name": "Iran",
      "population": 85000000,
      "abb": "IR"
    },
    "get": {
      "_id": 1,
      "name": 1,
      "population": 1,
      "cities": {
         "name": 1,
         "population": 1,
      }
    }
  }
}
```

This request finally reaches the function we specified for `Act` to extract the necessary information from it and return the information requested by the user.  
If you remember, we set up each `Act` as follows:
```ts
coreApp.acts.setAct({
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
  preValidation: [setUser, checkLevel],
  preAct: [justAdmin],
  validationRunType: "create",
});
```

#### Upload documents
For uploading a document you should send a `POST` request to **Lesan** endpoint.
