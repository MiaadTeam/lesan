# Why noSQL?

As you have seen, data duplication reduces the number of multiple requests to the database, which affects both the `speed` of receiving data and the way `SSG content` is created. In addition, the number of methods for receiving `embedded` data in these databases (especially `aggregations` in Mongodb) makes managing and filtering this data easier.

## Why Mongodb?

We had two ways to achieve the best `performance`:

1.  We would generally design a `database` from scratch to achieve at least the following points:

    - give what we receive from the customer on the `client side` to the database so that we do not have any additional processing for analyzing the request.

    - `Embed` all relationships at least to one level.

    - In order to receive data from the database with any degree of penetration into the depths of relationships with only `one` query

2.  Among the available databases, let’s go for one of them and bring all our structures in line with it. Implementing a new database, although attractive, is infinitely time-consuming and requires a lot of time and cost to mature and become usable. Among the available databases, `Mongodb` met all our needs for at least three reasons:
    1. Mongodb is a `NoSQL` database and that’s exactly what we were looking for.
    2. The process of selecting recursive fields from this database, namely `projection`, is a standard `object` with the `field name` key and a value of `zero or one`, and we could ask the same `object` from the customer on the `client side` without any processing and send it to the database.
    3. And the key point was the creative idea of `aggregation`, because we could penetrate into the depths of relationships by sending only `one` request for any amount of data we wanted. [It was enough to create helper functions for building request `pipelines` in this way.](https://www.pagerduty.com/resources/learn/what-is-data-aggregation/)

### Lesan Pipeline example
Let’s examine how to create a `Pipeline` for filtering and selecting data in `Mongodb aggregations` with an example:

Consider the schemas we had for the `country`, `province`, and `city` tables, and now we want to receive a list of 25 `provinces` along with the `country` and `cities` of that province with `one` request. The `Pipeline` we create will be like this (the Pipeline that needs to be created for `Lesan` will be slightly different, which we will discuss later):

```typescript
provinces.aggregation([
  {
    $lookup: {
      from: "country",
      localField: "country._id",
      foreignField: "_id",
      as: "country",
    },
  },
  { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "city",
      localField: "cities._id",
      foreignField: "_id",
      as: "cities",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      abb: 1,
      country: { _id: 1, name: 1, abb: 1 },
      cities: { _id: 1, name: 1, abb: 1 },
    },
  },
]);
```

Now if we create the same `Pipeline` for a project that has been created with `Lesan`, it will be as follows:

```typescript
states.aggregation([
      	"$project": {
        	_id: 1,
        	name: 1,
        	abb: 1,
        	country: { _id: 1, name: 1, abb: 1 },
             cities: { _id: 1, name: 1, abb: 1 }
      	}
]);
```

Yes, we send an `empty Pipeline` because all relationships are embedded in Lesan and we only send the `projection` to select the requested fields. But what happens if we penetrate one more level deeper into the relationships? For example, let’s request the `provinces` of `countries` again from within the countries and request the `country` of that `city` again from within the cities (it is true that this example is unrealistically funny, but we implement it only for comparison so that the concept can be easily conveyed). In the usual case, the `Pipeline` will be like this:

```typescript
states.aggregation([
  {
    $lookup: {
      from: "country",
      localField: "country._id",
      foreignField: "_id",
      as: "country",
    },
  },
  { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "state",
      localField: "country.states._id",
      foreignField: "_id",
      as: "country.states",
    },
  },
  {
    $lookup: {
      from: "city",
      localField: "cities._id",
      foreignField: "_id",
      as: "cities",
    },
  },
  {
    $lookup: {
      from: "country",
      localField: "cities.country._id",
      foreignField: "_id",
      as: "cities.country",
    },
  },
  { $unwind: { path: "$cities.country", preserveNullAndEmptyArrays: true } },
  {
    $project: {
      _id: 1,
      name: 1,
      abb: 1,
      country: { _id: 1, name: 1, abb: 1, states: { _id: 1, name: 1, abb: 1 } },
      cities: { _id: 1, name: 1, abb: 1, country: { _id: 1, name: 1, abb: 1 } },
    },
  },
]);
```

But the project created with Lesan will create a `Pipeline` as follows:

```typescript
states.aggregation([
  {
    $lookup: {
      from: "country",
      localField: "country._id",
      foreignField: "_id",
      as: "country",
    },
  },
  { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "city",
      localField: "cities._id",
      foreignField: "_id",
      as: "cities",
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      abb: 1,
      country: { _id: 1, name: 1, abb: 1, states: { _id: 1, name: 1, abb: 1 } },
      cities: { _id: 1, name: 1, abb: 1, country: { _id: 1, name: 1, abb: 1 } },
    },
  },
]);
```

If you notice, we have `no Pipeline` to get the `provinces` inside the country because we know that in `Lesan` all relationships are stored in an `embedded` way and if we have the country with its relationships, we have definitely stored the last `50 provinces` of each country inside it in an embedded way. So while we store the country as `Pure` and without relationships in the axis of each province and have it, we receive it again with a `Pipeline`.Now, instead of `50 * 50 + 50` documents (if we have requested 50 `provinces` per `country` by default), we only receive `50` documents (the country where the `provinces` are embedded). Now imagine that if, for example, the last registered `restaurants` in each `country` were also requested in this query, usually `50 * 50 + 50 * 50 + 50` documents would have to be requested, but with `Lesan`, the same document received for each `country` will also have a list of the last `50 restaurants` and we only request those `50` documents instead of `5050` documents. And as each relationship is added, these numbers will get further apart from each other.

The same policy applies to `cities` in relation to the `country`. The only difference is that here `50 provinces` are requested, each province wants the last `50 cities` and each city has a relationship with a country that has been requested and we have to receive `50 * 50 + 2500` documents which with `Lesan` we have reduced this number to `50 * 50` documents.

Another point to note is that the `Pipeline` created in the last stage in `Lesan` is very similar to the Pipeline created in the normal state in the first stage, only the` Projection` field in these two `Pipelines` is different.
