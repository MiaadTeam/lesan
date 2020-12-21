# `funql` is new way to create web server

## What is FUNQL ?

### funql is just a Native Graphql!

if you hate `gql` and want to deal with backend with standard methods.
if you in trouble with graphql project and like the simplicity of REST API's but wants to have graphql ideas on your project.
if you hate the secrets under the hoods of libraries or frameworks.
if you love MongoDB and wants to use most capability of it.

### funql is for you

## Funql basics

funql is just a sets of rules

1. you must be send standard `JSON`'s `HTTP POST` request to `http://localhost:${PORT}/funql`
2. your request must have `wants` object in it, `wants` object should have 2 property : `model` and `doit`, `model` is one of your MongoDB schemas and `doit` is one of your methods you write for that schema.
3. your request must have `details` object in it, `details` object should have 2 property: `set` and `get`, `set` is proprieties you want sends in request like properties you need for creating a schema or properties you need to sort or filter on getting documents from schema and `get` is an object to select which fields user wants to retrieve.
4. The folder structure is very important in a `funql` project

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
