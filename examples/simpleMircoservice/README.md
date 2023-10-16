# An example of implementing a micro-service architecture

Current example demonstrates two micro-services known as `core` and `ecommerce` located in directories with same naming, with basic API functionality in between.

## Running this example
To run each example, navigate to corresponding directories (using `cd ecommerce` or `cd core` command) and choose one of the prefered methods below:
### Method 1: OS Shell
```bash
deno run -A mod.ts
```
### Method 2: Docker container
```bash
docker run -it -v "${PWD}:/app" denoland/deno deno run --allow-all /app/mod.ts
```

The `core` microservice respond to `HTTP POST` request to `http://localhost:8080/lesan` with this `JSON` on request body mapped to its only actions defined (`addCountry` and `addUser`):
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
In the other case `ecommerce` which includes `ware` and `wareType` schema with two action `addWare` and `addWareType`.
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
