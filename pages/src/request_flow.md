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
- Requests sent to `upload` a document.
- Requests sent to `receive data` from the `server` (in fact, these requests are the main requests sent to **Lesan**).

