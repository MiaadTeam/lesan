# Lesan Framework - Project Context

## Overview

Lesan is a high-performance TypeScript framework built on Deno that aims to provide an alternative to GraphQL and traditional REST APIs for NoSQL databases, specifically MongoDB. The framework addresses the complexity issues of NoSQL while maintaining performance and ease of use. According to the project's benchmarks, Lesan significantly outperforms other frameworks like Prisma, Mongoose, and Express.

## Project Structure

```
hemLesan/
├── .gitignore
├── .travis.yml
├── chart.svg
├── deno.json
├── LICENSE
├── mod.ts
├── README.md
├── .git/
├── .github/
├── .helix/
├── .vscode/
├── .zed/
├── docs/
├── examples/
├── pages/
├── src/
└── tests/
```

### Key Directories

- `src/` - Core framework source code with modules for acts, models, ODM, server, types, and utilities
- `examples/` - Example implementations showing how to use the framework
- `tests/` - Framework tests

### Core Source Modules

- `acts/` - Action handling and service management
- `models/` - Schema and model definitions
- `odm/` - Object Document Mapper for MongoDB operations
- `server/` - Server implementation and routing
- `types/` - Type definitions and utilities
- `utils/` - Helper functions and utilities

## Technology Stack

- **Runtime**: Deno
- **Language**: TypeScript
- **Database**: MongoDB (via official MongoDB driver)
- **Dependencies**: 
  - `superstruct@2.0.2` for data validation
  - `mongodb@6.3.0` for database operations

## Core Concepts

### Models and Schemas
- Define data structures with pure fields and relations
- Support for complex relationships between entities
- Automatic relationship handling and embedding

### Actions
- Server-side functions mapped to API endpoints
- Validation through type-safe structures
- Service-based architecture for microservices

### ODM (Object Document Mapper)
- Handles MongoDB operations with schema awareness
- Provides methods like `insertOne`, `find`, `aggregation`
- Automatic relationship management between documents

### Service Architecture
- Support for microservices through service-based routing
- Unified API for multiple services

## Key Features

1. **Performance**: Claims to be significantly faster than alternatives like Prisma and Mongoose
2. **Relationship Handling**: Automatic embedding and management of related data
3. **Type Safety**: Built-in type validation using superstruct
4. **Flexible Queries**: Control over data selection depth via `get` projections
5. **Microservice Ready**: Built-in support for multi-service architectures

## Building and Running

### Prerequisites
- Deno runtime installed

### Running the Project
```bash
# Run the main example
deno run -A mod.ts

# Development with file watching
deno task dev
# or
deno run -A --watch mod.ts
```

### Example Usage
The framework provides a simple API for defining models and actions:

```typescript
import { lesan, MongoClient, string, number, object } from "https://deno.land/x/lesan@vx.x.x/mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
const db = client.db("mydb");
coreApp.odm.setDb(db);

// Define a model
const countryPure = {
  name: string(),
  population: number(),
  abb: string(),
};
const countries = coreApp.odm.newModel("country", countryPure, {});

// Define an action
const addCountry: ActFn = async (body) => {
  const { name, population, abb } = body.details.set;
  return await countries.insertOne({
    doc: { name, population, abb },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "addCountry",
  validator: object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", 1),
  }),
  fn: addCountry,
});

coreApp.runServer({ port: 1366, playground: true });
```

## API Usage

The framework exposes a `/lesan` endpoint where clients can send POST requests with the following structure:

```json
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
      "abb": 1
    }
  }
}
```

## Development Conventions

- Uses Deno's module system with URL imports
- Follows TypeScript best practices with strict typing
- Leverages MongoDB's ObjectId for document identification
- Emphasizes performance and simplicity over complexity
- Supports relationship-based data modeling with automatic embedding

## Testing

Tests are located in the `/tests/` directory. The framework includes a playground for testing functionality.

## Documentation

The project provides comprehensive documentation at: https://miaadteam.github.io/lesan/

## Performance Benchmarks

According to the project's benchmarks:
- Lesan returns data 1168% faster than prisma-express-rest
- Lesan returns data 1417% faster than prisma-express-graphql
- Lesan returns data 4435% faster than mongoose-express-rest
- And significantly faster than other alternatives

## Key Files

- `deno.json` - Deno project configuration with development tasks
- `mod.ts` - Main entry point export
- `src/lesan.ts` - Core framework factory function
- `src/deps.ts` - Deno standard library imports
- `src/npmDeps.ts` - Third-party npm dependencies
- `src/types.ts` - Core type definitions