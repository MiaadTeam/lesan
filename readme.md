<!-- PROJECT LOGO -->

### KEEP this Branch just for backup

<br />
<p align="center">
  <h1 align="center"><a href="https://github.com/funql/funql"><span align='center'>FUNQL</span> </a></h1>

<h3 align="center"> <code>FUNQL</code> is Simply a new way to create web servers</h3>
  <br />
<p align="center">
  <a href='https://github.com/denoland/deno'>
    <img alt="Denon Supported Version" src="https://img.shields.io/badge/deno-^1.4.0-informational?logo=deno&style=for-the-badge" />
  </a>
  <a href='https://github.com/funql/funql/releases'>
    <img alt="Denon Releases" src="https://img.shields.io/github/v/release/funql/funql?logo=github&style=for-the-badge" />
  </a>
  <a href='https://github.com/funql/funql/graphs/contributors'>
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/funql/funql?style=for-the-badge">
  </a>
  <a href='https://github.com/funql/funql/issues'>
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/funql/funql?style=for-the-badge">
  </a>

</p>
  <p align="center">
    <br />
    ·
    <a href="https://github.com/funql/funql/issues">Report Bug</a>
    ·
    <a href="https://github.com/funql/funql/issues">Request Feature</a>
  </p>
</p>

<details open="open"><summary>Table of Contents</summary>

1. [About The Project](#about-the-project)
   - [What Is FUNQL?](#what-is-funql)
   - [FUNQL Basics](#funql-basics)
   - [Basic Rules](#basic-rules)
   - [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [License](#license)

</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### What Is FUNQL?

FUNQL is just a Native [Graphql]('https://en.wikipedia.org/wiki/GraphQL')

- If you hate `gql` and prefer to handle backend tasks with standard and robust methods.
- If you experience difficulties in using graphql in your projects due to its inherent complexities namely, time-consuming typesafety.
- Despite the simplicity of REST APIs, you are likely to get caught in the process of life-cycles and middlewares, etc.
- If you hate the secrets under the hood of libraries or frameworks.
- If you love MongoDB and want to use its potential capabilities.

  <p align="center" ><b>FUNQL Is For You!</b></p>

### FUNQL Basics

`FUNQL` is just a sets of rules:

1. You must send standard `JSON`'s `HTTP POST` request to `http://localhost:${PORT}/funql`
2. Your request should have `wants` object in it. `wants` object should have 2 properties : `model` and `doit`. `model` is one of your MongoDB schemas and `doit` is one of your methods you write for that schema.
3. Your request should have `details` object in it, `details` object should have 2 properties: `set` and `get`.

- `set` is a group of proprieties you try to send in a request like properties you need for creating a schema or properties you need to sort or filter on getting documents from schema.
- `get` is an object to specify which fields client wants to retrieve.

4. The structure of folders is quite important in a `funql` project

#### Folder structure example in `deno` server:

- project `a blog example`
  - config `should have`
    - utils `maybe`
      - someUtils.ts `maybe`
      - index.ts `should have`
    - db.ts `maybe`
    - redis.ts `maybe`
    - index.ts `should have`
  - src `should have`
    - utils `maybe`
      - populateMany.ts `maybe`
      - throwErr.ts `maybe`
      - index.ts `should have`
    - functions `should have`
      - user `should have if we have an user schema`
        - funcs `should have if we have common fns`
          - getUsers.ts `maybe`
          - ... `maybe`
          - index.ts `should have`
        - adding.ts `maybe`
        - login.ts `maybe`
        - singing.ts `maybe`
        - getting.ts `maybe`
        - ... `maybe`
        - index.ts `should have`
      - ... `other models fns`
      - index.ts `should have`
    - schemas `should have`
      - utils `maybe`
        - someUtils.ts `maybe`
        - someOtherUtils.ts `maybe`
        - index.ts `should have`
      - user.ts `maybe`
      - post.ts `maybe`
      - category.ts `maybe`
      - ... `maybe`
      - index.ts `should have`
    - index.ts `should have`
  - index.ts `should have`
  - script.json `should have if use denon`

### Basic Rules

- #### schemas
  every schema should have 4 seprate things :
  1. an inteface to describe and hint
- #### functions

### Features

- It uses the best capabilities of graphql idea.
- It uses the best design elements of REST API's.
- It removes all unnecessary extra code, validation, repetitive procedures.
- `funql` fully implements `functional programming` characteristics. Everything is comprised of small functions
- `funql` is fundamentally based on `fs(function schema)` architecture.

## Getting Started

To install `FUNQL` simply enter the following into a terminal:

### Prerequisites

[`deno`](https://deno.land/manual/getting_started/installation) must be installed.

### Installation

#### **Install Latest Version:**

```shell
deno install -qAf --v8-flags="--max-old-space-size=48384,--max-heap-size=16384" --allow-read --allow-write --unstable https://deno.land/x/funql/funql.ts
```

#### **Install Specific Version:**

```shell
deno install -qAf --v8-flags="--max-old-space-size=48384,--max-heap-size=16384" --allow-read --allow-write --unstable https://deno.land/x/funql@{SPECIFIC_VERSION}/funql.ts
```

## Usage

To start using `funql`, just enter this command:

```shell
funql --init [blog]
```

- `blog` is name of the project and for sake of simplicity, we create the blog project by `funql` because `funql` is just a concept with set of rules
- `blog project` uses [mongoDB](http) and [redis](http).
  So install them, we recommend using [denon](http) for running project so after install `denon` just run on the **root** of project directory :

```
denon start
```

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

## Roadmap

See the [open issues](https://github.com/funql/funql/issues) for a list of proposed features (and known issues).

| Language |            Process            |      Description |
| :------- | :---------------------------: | ---------------: |
| Deno     |   🔵 🔵 🔵 🔵 ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️   |    just starting |
| NodeJS   | ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ | nothing for know |
| Golang   | ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ | nothing for know |
| Rust     | ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ ⚪️ | nothing for know |

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/funql/funql/issues).

<!-- You can also take a look at the [contributing guide](https://github.com/funql/funql/blob/main/contributing.md). -->

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Show your support

Give a ⭐️ if this project helped you!

## License

This project is [AGPL--3.0 License](https://github.com/funql/funql/blob/main/LICENSE) licensed.
