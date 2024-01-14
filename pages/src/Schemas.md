# Schemas

Above, it was said briefly about `schemas`, In general, each schema includes:

`pure`, `relations`, `mainRelations`, `relatedRelations`, `embedded` and `struct`, which is enclosed in object called `service`. By default, the `service` object has the `main` key. And by adding other microservices, other keys will be added to it.

We have used the `superstruct` library to create a `pure` structure in each schema, As a result, [these values](https://docs.superstructjs.org/api-reference/types) can be used for each field.

