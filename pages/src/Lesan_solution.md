# Lesan solution

As mentioned in the above section, `Lesan` is a collection of `models` and `acts` created for those `models`. But in fact, these `models` are placed inside another object called `main` or any other `service` that is active in this process. All the information available in the `main` key can be obtained with the `getMainActs` function. All functions created with the `setAct` function are stored by default inside the `main` object. But there is another function called `setService`. With this function, we can add another `service` to our project. After adding a new service, we can access it by sending an `object` from the client side that has a `service key`. The `setService` function has two inputs: the first input is the `name` of the service and the second input can be obtained in two ways:

- As a `string`, which is actually the address of access to another `service`.

- As another `object`, which is actually the output of the `getMainActs` function in another `service`.

If the second input is a `string`, `http` or `rpc` methods are used to communicate with it, and if it is an `object`, that other service comes up as a `plugin` on this current service. As a result, we can manage a project both as a `monolith` and as a `microservice` at the same time.

## A suggestion for microservices (an architecture between microservices and monolith)

To create a `model` in `Lesan`, it can be expanded based on another extensive `model` so that it has nothing more than that and can only have some of its `keys`. Therefore, we can create a `database` for all `services` along with all `models` that have all the necessary `keys` in all `services`. Then each `service` defines its `own model` separately based on the `integrated database` model and takes some of its `required keys` from that `main` model. Given the way `models` are written in `Lesan` (model implementation based on a `schema validator`), we can have a `common database` and at the same time each `service` can `validate` its own `data` based on the expanded `model` of the comprehensive and original `model`. Also, it is possible to move `models` and `acts` written in `Lesan`, and we can easily have each service’s `database` separately or simultaneously with other `services`. On the other hand, `NoSQL` databases are usually `schemaless` and any shape or form can be given to `data` in the database. `Lesan` is currently developed based on `MongoDB`. If we can put all `service` models in a `comprehensive database`, we can prevent `data duplication` and we no longer need to write parallel `logic` to manage this `duplication`. In addition, we do not need any tools for synchronization or writing separate `logic` to standardize `data`. Finally, we can also take advantage of the ease of `horizontal-distribution` of `NoSQL` databases without worrying about `data` consistency. Consider the following example:

Suppose we have several services named `core` - `ecommerce` - `blog` and so on, all of which have a model for users named `user`. We can create a model of the `user` that has all the fields of all these `services` and share it among all services, like this:

```typescript
import {
  any,
  array,
  boolean,
  date,
  enums,
  InRelation,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "../../../deps.ts";

export const level = enums(["Admin", "Editor", "Author", "Ghost", "Normal"]);
export const gender = enums(["Male", "Female"]);

export const addressObj = object({
  addressId: string(),
  countryId: string(),
  stateId: string(),
  cityId: string(),
  addressText: string(),
  location: optional(
    object({
      type: string(),
      coordinates: array(array(number())),
    })
  ),
});

export const pureUserObj = {
  _id: optional(any()),
  name: string(),
  age: number(),
  lastName: string(),
  phone: number(),
  gender: gender,
  birthDate: optional(date()),
  postalCode: string(),
  level: array(level),
  email: optional(string()),
  isActive: optional(boolean()),
  creditCardNumber: optional(number()),
  address: optional(array(addressObj)),
};

const userRelations = {
  country: {
    optional: false,
    schemaName: "country",
    type: "single" as RelationDataType,
    relatedRelations: {
      users: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    }
  },
  province: {
    optional: false,
    schemaName: "province",
    type: "single" as RelationDataType,
    relatedRelations: {
      users: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    }
  },
  city: {
    optional: false,
    schemaName: "province",
    type: "single" as RelationDataType,
    relatedRelations: {
      users: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    }
  },
};
```

Now, for example, we create a model of the user for ecommerce as well and write its fields in such a way that it does not have anything more than the shared user model, like this:

```typescript
import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import {
  any,
  array,
  boolean,
  date,
  InRelation,
  number,
  optional,
  OutRelation,
  string,
} from "../../../deps.ts";

import {
  addressObj,
  gender,
  level,
  pureUserObj as sharedPureUserObj,
  userRelations as sharedUserRelations,
} from "../../shared/mod.ts";

const userPureObj: Partial<typeof sharedPureUserObj> = {
  _id: optional(any()),
  name: string(),
  age: number(),
  lastName: string(),
  phone: number(),
  gender: gender,
  birthDate: optional(date()),
  postalCode: string(),
  level: array(level),
  email: optional(string()),
  isActive: optional(boolean()),
  creditCardNumber: optional(number()),
  address: optional(array(addressObj)),
};

const userRelations: Partial<typeof sharedUserRelations> = {
  // country: {
  //   optional: false,
  //   schemaName: "country",
  //   type: "single" as RelationDataType,
  //   relatedRelations: {
  //     users: {
  //       type: "multiple" as RelationDataType,
  //       limit: 50,
  //       sort: {
  //         field: "_id",
  //         order: "desc" as RelationSortOrderType,
  //       },
  //     },
  //   }
  // },
  // province: {
  //   optional: false,
  //   schemaName: "province",
  //   type: "single" as RelationDataType,
  //   relatedRelations: {
  //     users: {
  //       type: "multiple" as RelationDataType,
  //       limit: 50,
  //       sort: {
  //         field: "_id",
  //         order: "desc" as RelationSortOrderType,
  //       },
  //     },
  //   }
  // },
  city: {
    optional: false,
    schemaName: "province",
    type: "single" as RelationDataType,
    relatedRelations: {
      users: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
    }
  },
};
```

Now we can connect them to a common `database` while several `services` continue their work independently, provided that the data `validation` of the schemas works independently for each service and only understands its own `data`. You can see a complete example of this type of microservice implementation [here](./an_advanced_project.md).
