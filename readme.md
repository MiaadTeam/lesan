# `funql` is Simply a new way to create web servers

## What is FUNQL ?

### funql is just a Native Graphql 

- If you hate `gql` and prefer to handle backend tasks with standard and robust methods.
- If you experience difficulties in using graphql in your projects due to its inherent complexities namely, time-consuming typesafety.
- Despite the simplicity of REST APIs, you are likely to get caught in the process of life-cycles and middlewares, etc.
- If you hate the secrets under the hood of libraries or frameworks.
- If you love MongoDB and want to use its potential capabilities.

### funql Is For You

## Funql Basics

`funql` is just a sets of rules:

1. You must send standard `JSON`'s `HTTP POST` request to `http://localhost:${PORT}/funql`
2. Your request should have `wants` object in it. `wants` object should have 2 properties : `model` and `doit`. `model` is one of your MongoDB schemas and `doit` is one of your methods you write for that schema.
3. Your request should have `details` object in it, `details` object should have 2 properties: `set` and `get`.
- `set` is a group of proprieties you try to send in a request like properties you need for creating a schema or properties you need to sort or filter on getting documents from schema.
- `get` is an object to specify which fields client wants to retrieve.
4. The structure of folders is quite important in a `funql` project

## Features

- It uses the best capabilities of graphql idea.
- It uses the best design elements of REST API's.
- It removes all unnecessary extra code, validation, repetitive procedures.
- `funql` fully implements `functional programming` characteristics. Everything is comprised of small functions
- `funql` is fundamentally based on `fs(function schema)` architecture. 

## How to Install

- Firstly, [`deno`](https://deno.land/manual/getting_started/installation) must be installed.
- After that just run this line:

```shell
deno install -qAf --allow-read --allow-write  --unstable https://deno.land/x/funql@0.0.3/funql.ts
```

## How to Use It

### To start using `funql`, just enter this command

```
    funql --init [blog]
```

- `blog` is name of the project and for sake of simplicity, we create the blog project by `funql` because `funql` is just a concept with set of rules
- `blog project` uses [mongoDB](http) and [redis](http). So install them, we recommend using [denon](http) for running project so after install `denon` just run :

```
denon start
```

on the root of project directory.
After downloading dependencies, `http://localhost:8000/` will be displayed on the console.
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
