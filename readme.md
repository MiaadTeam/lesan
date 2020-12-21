# `funql` is new way to create web server

## Features

- it use the best experience of graphql idea
- it use the best experience of REST API's
- it remove all unnecessary extra code, validation, garbage feature and etc
- everything is based on tiny functions
- ...

## How to install

- first of all install [`deno`](https://deno.land/manual/getting_started/installation)
- after that just run this line:

```shell
deno install -qAf --allow-read --allow-write  --unstable https://deno.land/x/funql@0.0.3/funql.ts
```

## How to use it

### for know just enter this command

```
    funql --init [blog]
```

`blog` is name of the project and for sake of simplicity we create the blog project by `funql` because `funql` is just a concept with sets of rules
`blog project` uses [mongoDB](http) and [redis](http). So please install them, we recommend using [denon](http) for running project so after install `denon` just run :

```
denon start
```

on the root of project.
After downloading dependencies you will see this log `http://localhost:8000/` on the console.
Now send this http request to retrieve data:

```
POST http://localhost:8000/funql HTTP/1.1
content-type: application/json

{
    "wants": {
        "model": "Country",
        "doit": "adding"
    },
    "details": {
        "set": {
            "name": "iran",
            "enName": "iran"
        },
        "get": {
            "_id": 0,
            "name": 0,
            "cities": {
                "_id": 1,
                "name": 1
            }
        }
    }
}
```

## Todo

| Language |            Process             |      Description |
| :------- | :----------------------------: | ---------------: |
| Deno     | 🔵⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️  |    just starting |
| NodeJS   | ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️ | nothing for know |
| Rust     | ⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️ | nothing for know |
