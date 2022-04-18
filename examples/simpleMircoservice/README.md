### this is just very simple microserve example

in this example we have two microserve :

- one named `core` which includes `user` and `country` schema with just two action know as `addCountry` and `adduser`.
  - you can run this server by runnig below line on `core/` folder:
    ```bash
    deno run -A mod.ts
    ```
    this service respond to `HTTP POST` request to `http://localhost:8080/lesan` with this `JSON` on request body :
    ```bash
    {
      "contents": "dynamic",
      "wants": {
        "model": "user",
        "act": "addUser"
      },
      "details": {
        "set": {
          "name": "Seyyedeh Sare Hosseini",
          "address": "Iran, Hamedan",
          "age": 5
        },
        "get": {
          "age": 1,
          "address": 1
        }
      }
    }
    ```
    and
    ```bash
    {
      "contents": "dynamic",
      "wants": {
        "model": "country",
        "act": "addCountry"
      },
      "details": {
        "set": {
          "name": "iran",
          "description": "Nice and great country"
        },
        "get": {
          "name": 1
        }
      }
    }
    ```
    it also can respond to `ecommerce` service request by adding `service` key to JSON body :
    ```bash
    {
      "service": "ecommerce",
      "contents": "dynamic",
      "wants": {
          "model": "wareType",
          "act": "addWareType"
      },
      "details": {
          "set": {
              "name": "digital",
              "description": "digital stuff like phone and ..."
          },
          "get": {
              "name": 1
          }
      }
    }
    ```
- another named `ecommerce` which includes `ware` and `wareType` schema with two action `addWare` and `addWareType`.
  - you can run this server by runnig below line on `ecommerce/` folder:
    ```bash
    deno run -A mod.ts
    ```
    this service respond to `HTTP POST` request to `http://localhost:8585/lesan` with this `JSON` on request body :
    ```bash
    {
      "contents": "dynamic",
      "wants": {
          "model": "wareType",
          "act": "addWareType"
      },
      "details": {
          "set": {
              "name": "digital",
              "description": "digital stuff like phone and ..."
          },
          "get": {
              "name": 1
          }
      }
    }
    ```
    and
    ```bash
    {
      "contents": "dynamic",
      "wants": {
          "model": "ware",
          "act": "addWare"
      },
      "details": {
          "set": {
              "name": "GLX phone",
              "brand": "GLX",
              "price": 159
          },
          "get": {
              "name": 1
              "price": 1
          }
      }
    }
    ```
