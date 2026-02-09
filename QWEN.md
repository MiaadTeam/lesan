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

## Lesan Framework Complete Documentation

### Core Concepts

Lesan is a web server and ODM (Object Document Model) framework designed to implement microservices with a focus on performance and data management. The core concepts include:

1. **Delegated Data Retrieval**: Inspired by GraphQL, Lesan delegates data retrieval management to the client without adding extra layers like GQL language processors.

2. **NoSQL Capabilities**: Leverages all capabilities of NoSQL databases to embed relationships within schemas without requiring server-side programmers to manage embeddings.

3. **Regular Structure for Validation**: Maintains a structured approach similar to SQL for data models in the ODM layer to ensure data validation.

4. **Advanced Relationship Management**: Provides a new definition for creating relationships between data, allowing full control over their details.

5. **Movable Data Structure**: Enables the data structure to move along with server-side functions for easier microservice management.

### Microservices Architecture

#### Traditional Challenges and Lesan Solution

**Challenges in Traditional Microservices:**

- Model consistency across services
- Data consistency when services fail to communicate
- Complex hardware resource distribution
- Difficult horizontal scaling

**Lesan's Solution:**

- Provides "small solutions for implementation of microservices that can reduce their implementation complexity"
- Proposes a new architecture that sits between microservices and monoliths
- Uses a unified database model with service-specific validation
- Eliminates data duplication and synchronization needs

**Unified Database Approach:**

- Create a comprehensive database with all possible models and fields
- Each service validates only the data relevant to it
- Services can share the same comprehensive model while working with only required fields
- Prevents data duplication and eliminates need for synchronization tools

### Function Structure

#### Main Components:

- **schemas**: Contains schema functions (getSchemas, getPureOfMainRelations, getSchema, etc.)
- **acts**: Action functions (setAct, getServiceKeys, getActs, etc.)
- **odm**: Object Document Model functions (setDb, getCollection, newModel, etc.)
- **contextFns**: Context management functions (getContextModel, setContext, addContext, etc.)

#### Key Functions:

- **setAct**: Used to register actions that define the API endpoints
- **newModel**: Creates a new data model with associated CRUD operations
- **addRelation** / **removeRelation**: Functions for managing relationships between data
- **find** / **findOne**: Functions for querying data with flexible projection
- **insertOne** / **insertMany**: Functions for creating new records
- **findOneAndUpdate**: Updates a single record based on criteria
- **deleteOne**: Deletes a single record
- **countDocument**: Counts documents matching specified criteria

### Validation Patterns

1. **Schema-based Validation**: Uses a structured schema approach with `set` and `get` objects:
   - `set`: Contains input parameters for the function
   - `get`: Defines the projection structure using `selectStruct`

2. **Type Safety**: Supports TypeScript with strong type definitions throughout the framework.

3. **Superstruct Validation**: Implements validation syntax using Superstruct for schema definitions.

4. **Relationship Validation**: Provides mechanisms to validate relationships between different data models.

5. **Depth Penetration Validation**: The `selectStruct` function dynamically generates validation schemas based on model and desired depth, with two parameters:
   - Model name for which to generate the validation object
   - Depth of penetration (number or object)

6. **Application-level Filters**: Validators should use application-level filtering parameters rather than exposing database-specific operators (e.g., avoid $gte, $lte, $regex in validators). Instead of accepting MongoDB operators directly from frontend, create application-specific parameters that are transformed into appropriate database queries internally. This approach provides better security and abstraction.

7. **Typed Relations**: When working with relationships, use `TInsertRelations<typeof model_relations>` to ensure type safety when defining relations in functions like `insertOne`. This provides compile-time validation of relation fields and helps prevent runtime errors.

8. **Relationship Replace Option**: The `replace` option in `addRelation` should be used with caution. When true, it deletes all existing relationships and replaces them with new ones, affecting all embedded relationships. For single-type relations, if `replace` is false and a relation already exists, an error occurs; if true, replacement occurs. For multiple-type relations, if `replace` is false, new documents are added to existing relations; if true, all existing relations are replaced. Always consider the implications before using `replace: true`.

9. **Sort Order Type Definition**: When defining relationship sorting, always include the `RelationSortOrderType` for the sort order field. For example: `order: "desc" as RelationSortOrderType`.

### Function Implementation Best Practices

1. **Model Access**: Always access models through the coreApp.odm namespace. For example, use `coreApp.odm.user` instead of importing user directly.

2. **Separation of Concerns**: In update functions (like updateUser), only update pure fields, and use separate update relation functions (like updateUserRelations) for managing relationships. This follows the principle of separating data field updates from relationship updates.

### Request Flow and HTTP Methods

#### Supported HTTP Methods:

- **GET**: Two models supported:
  - Static document requests (requires `staticPath` configuration in `runServer`)
  - Playground access requests (requires `playground: true` in `runServer`)
- **POST**: Two models supported:
  - Data retrieval requests with JSON body containing service, model, act, and details
  - Document upload requests following standard file upload protocols

#### POST Request Structure:

- **service**: Selects microservice (defaults to "main")
- **model**: Selects data model
- **act**: Selects action
- **details**: Contains data and selection criteria
  - `set`: Information needed in Act function
  - `get`: Selected information to return (MongoDB projection format)

### Relationship Management

#### Types of Relationships:

- **relation**: Defines relationships from the parent document to other documents
- **relatedRelations**: Defines the reverse relationships that get created on the target model

#### Relationship Types:

1. **Single Relations**: Defined with `type: "single"` as `RelationDataType`
2. **Multiple Relations**: Defined with `type: "multiple"` as `RelationDataType`
3. **Embedded Relations**: Store related data directly within parent document

#### Core Relationship Properties:

- **optional**: Whether the relationship is required or optional
- **schemaName**: The name of the schema this relationship connects to
- **type**: The relationship type ("single" or "multiple")
- **relatedRelations**: Defines the reverse relationships that get created on the target model
- **limit**: For multiple relations, limits the number of embedded documents
- **sort**: Defines sorting for embedded multiple relations
- **excludes**: Specifies which fields to exclude from the related data when projecting

#### Managing Relations:

- **addRelation Function**: Used instead of manual updates to add relationships between documents
- **removeRelation Function**: Used instead of manual updates to remove relationships between documents
- **Important**: Never manually update relationships with update or updateMany functions

#### addRelation Function Parameters:

- **filters**: MongoDB findOne filter to find the document to change
- **relations**: Object describing the relations to establish
- **projection**: Specifies which fields to return after relation is added
- **replace** (optional): When true, deletes existing relationships and replaces them with new ones (affects all embedded relationships). For single relationships, if replace is false and a relationship already exists, an error occurs; if true, the replacement occurs. For multiple relationships, if replace is false, new documents are added to existing relationships; if true, all existing relations are replaced. Use with caution as it affects all embedded relationships.

**Usage Pattern**: When designing your API, separate document property updates from relationship updates. Use findOneAndUpdate for document properties and addRelation/removeRelation specifically for managing relationships. This separation ensures data integrity and proper handling of relation cascades.

#### removeRelation Function Parameters:

- **filters**: MongoDB findOne filter to find the document to change
- **relations**: Object specifying which relationships to remove
- **projection**: Specifies which fields to return after relation is removed

### Function Implementation Patterns

#### Add Function Pattern:

```typescript
const addEntityValidator = () => {
  return object({
    set: object({
      ...pureFields,
      relationField: objectIdValidation, // for single relations
      // or relationField: array(objectIdValidation) for multiple
    }),
    get: coreApp.schemas.selectStruct("entity", 1),
  });
};

const addEntity: ActFn = async (body) => {
  const { relationField, ...otherFields } = body.details.set;

  return await model.insertOne({
    doc: { ...otherFields },
    projection: body.details.get,
    relations: {
      relationField: {
        _ids: [new ObjectId(relationField)], // Always use arrays
        relatedRelations: {
          reverseRelation: true, // or false depending on requirements
        },
      },
    },
  });
};
```

#### Get Function Pattern:

```typescript
const getEntityValidator = () => {
  return object({
    set: object({
      entityId: objectIdValidation, // Input parameters
    }),
    get: coreApp.schemas.selectStruct("entity", 1), // Projection structure
  });
};

const getEntity: ActFn = async (body) => {
  const {
    set: { entityId },
    get,
  } = body.details;

  return await model.findOne({
    filters: { _id: new ObjectId(entityId) }, // Match/filters parameter
    projection: get, // Get/projection parameter
  });
};
```

#### Gets Function Pattern:

```typescript
const getEntitiesValidator = () => {
  return object({
    set: object({
      page: number().optional().default(1), // Pagination parameters
      limit: number().optional().default(50),
      skip: number().optional(),
      // Additional filter parameters as needed
    }),
    get: coreApp.schemas.selectStruct("entity", 1), // Projection
  });
};

const getEntities: ActFn = async (body) => {
  let {
    set: { page, limit, skip },
    get,
  } = body.details;

  skip = skip || limit * (page - 1);

  return await model
    .find({
      filters: {}, // Match/filters parameter
      projection: get, // Get/projection parameter
    })
    .skip(skip) // Skip parameter
    .limit(limit) // Limit parameter
    .toArray();
};
```

#### find and findOne Functions

**Parameters:**

- **filters**: MongoDB query operation to filter documents
- **projection**: MongoDB projection operation to specify which fields to return
- **options** (optional): MongoDB findOptions for additional configuration

**Key Features:**

- findOne retrieves a single document based on provided filters
- find retrieves multiple documents based on provided filters
- Both support relationship embedding through projection
- Both allow specifying depth of relationships to include
- find supports pagination when combined with .skip() and .limit() methods

#### Aggregation Functions

**Parameters:**

- **pipeline**: An array of MongoDB aggregation pipeline stages
- **projection**: Defines the fields to be returned in the response, including related data

**Usage:**

- Used when penetrating more than one step in relationship depths
- Relationship penetration is always one step behind the client request
- Can be used instead of find and findOne
- Automatically creates lookup, unwind and projection pipelines based on client's get input

### Update and Delete Operations

#### findOneAndUpdate Function

**Parameters:**

- **filter**: Defines which document to update (MongoDB filter)
- **projection**: Specifies which fields to return
- **update**: Defines how to update the document (MongoDB update operators)

**Important Note**: The findOneAndUpdate function should be used only for updating document properties, not relationships. For updating relationships, use addRelation and removeRelation functions.

**Complex Update Scenarios:**

- QQ (Query Queue): Queue of commands for chunking millions of updates
- In-Memory Database: Track changes to sent information in RAM
- Make New Relation: Convert frequently changing fields into new schemas with relationships

#### deleteOne Function

**Parameters:**

- **filter**: (Required) MongoDB filter object to specify which document to delete
- **hardCascade**: (Optional) Boolean value to enable recursive deletion of related documents
- **get**: (Optional) Object to specify which fields to return after deletion

**Features:**

- Automatically checks for related documents before deletion
- Prevents deletion with error message if related documents would become meaningless
- Supports hard cascade deletion for recursive deletion of dependent documents

#### countDocument Function

**Parameters:**

- **filter**: (Required) MongoDB filter object to specify which documents to count

**Features:**

- Returns the number of documents that match the provided filter
- Efficiently counts documents without returning the actual documents

#### insertMany Function

**Parameters:**

- **docs**: An array of document objects to be inserted
- **projection**: Specifies which fields to return in the result
- **relations**: An object defining relationships to establish with other documents

**Features:**

- Validates all input data before execution
- Handles all types of relationships: one-to-many, many-to-many, and one-to-one
- All changes are sent to the database using an aggregation pipeline
- Significantly faster than other platforms for large data insertions

### Depth Penetration

The server-side programmer must determine the depth of relationships for each accessible endpoint before writing the accessible point. This prevents unbounded queries that could impact performance.

When using selectStruct with a number, it applies that depth to all relationships in the model. When using an object, you can specify different depths for different relationships.

### Queuing Data Changes (QQ System)

The QQ (Query Queue) system addresses the challenge of repeated data updates:

- Manages large numbers of updates by dividing them into smaller, processable parts
- Monitors server resources and sends small parts for updating based on available resources
- Reduces request count by comparing and merging similar requests
- Can verify consistency of repeated data and find/correct problems
- Supports AI integration for managing changes in the queue

### Playground Features

The interactive playground provides:

- Tabs for multiple simultaneous tasks
- Service, schema, and action selectors
- Set and get fields sections
- Response section with status indicators
- Settings for custom URLs and headers
- History of requests and responses
- E2E testing capabilities with sequence management
- Schema and act documentation
- Performance metrics

### Performance Conclusion

According to the documentation's benchmarks, Lesan significantly outperforms other frameworks:

- 1168% faster than Prisma-Express-REST (PostgreSQL)
- 1417% faster than Prisma-Express-GraphQL (PostgreSQL)
- 4435% faster than Mongoose-Express-REST (without sorting)
- 72289% faster than MongoDB-Express-REST (without sorting)
- 298971% faster than Mongoose-Express-REST (with sorting)

The trade-off is a minimal performance impact on create, update, and delete operations for significantly faster data retrieval, making it ideal for read-heavy applications.

### Philosophy

Lesan's core philosophy centers on simplifying the client-server communication process, maximizing NoSQL database capabilities, and enabling scalable microservice architectures. It focuses on performance by embedding relationships within documents, reducing the number of database queries needed for complex data retrieval operations. The framework addresses traditional challenges with GraphQL and SQL by providing database-optimized filtering and embedded relationships that maintain efficiency even with deep nested data access patterns.
