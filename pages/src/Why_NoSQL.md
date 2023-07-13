# Why noSQL?

As you have seen, data duplication reduces the number of multiple requests to the database, which affects both the speed of receiving data and the way SSG content is created. In addition, the number of methods for receiving embedded data in these databases (especially aggregations in Mongodb) makes managing and filtering this data easier.

## Why Mongodb?

We had two ways to achieve the best performance:

1.  We would generally design a database from scratch to achieve at least the following points:

    - give what we receive from the customer on the client side to the database so that we do not have any additional processing for analyzing the request.

    - Embed all relationships at least to one level.

    - In order to receive data from the database with any degree of penetration into the depths of relationships with only one query

1.  Among the available databases, let’s go for one of them and bring all our structures in line with it. Implementing a new database, although attractive, is infinitely time-consuming and requires a lot of time and cost to mature and become usable. Among the available databases, Mongodb met all our needs for at least three reasons:
    1. Mongodb is a NoSQL database and that’s exactly what we were looking for.
    2. The process of selecting recursive fields from this database, namely projection, is a standard object with the field name key and a value of zero or one, and we could ask the same object from the customer on the client side without any processing and send it to the database.
    3. And the key point was the creative idea of aggregation, because we could penetrate into the depths of relationships by sending only one request for any amount of data we wanted. [It was enough to create helper functions for building request pipelines in this way.](https://www.pagerduty.com/resources/learn/what-is-data-aggregation/)

Let’s examine how to create a Pipeline for filtering and selecting data in Mongodb aggregations with an example:

Consider the schemas we had for the country, province, and city tables, and now we want to receive a list of 25 provinces along with the country and cities of that province with one request. The Pipeline we create will be like this (the Pipeline that needs to be created for Lesan will be slightly different, which we will discuss later):

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

Now if we create the same Pipeline for a project that has been created with Lesan, it will be as follows:

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

Yes, we send an empty Pipeline because all relationships are embedded in Lesan and we only send the projection to select the requested fields. But what happens if we penetrate one more level deeper into the relationships? For example, let’s request the provinces of countries again from within the countries and request the country of that city again from within the cities (it is true that this example is unrealistically funny, but we implement it only for comparison so that the concept can be easily conveyed). In the usual case, the Pipeline will be like this:

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

But the project created with Lesan will create a Pipeline as follows:

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

If you notice, we have no Pipeline to get the provinces inside the country because we know that in Lesan all relationships are stored in an embedded way and if we have the country with its relationships, we have definitely stored the last 50 provinces of each country inside it in an embedded way. So while we store the country as Pure and without relationships in the axis of each province and have it, we receive it again with a Pipeline.Now, instead of 50 _ 50 + 50 documents (if we have requested 50 provinces per country by default), we only receive 50 documents (the country where the provinces are embedded). Now imagine that if, for example, the last registered restaurants in each country were also requested in this query, usually 50 _ 50 + 50 \* 50 + 50 documents would have to be requested, but with Lesan, the same document received for each country will also have a list of the last 50 restaurants and we only request those 50 documents instead of 5050 documents. And as each relationship is added, these numbers will get further apart from each other.

The same policy applies to cities in relation to the country. The only difference is that here 50 provinces are requested, each province wants the last 50 cities and each city has a relationship with a country that has been requested and we have to receive 50 _ 50 + 2500 documents which with Lesan we have reduced this number to 50 _ 50 documents.

Another point to note is that the Pipeline created in the last stage in Lesan is very similar to the Pipeline created in the normal state in the first stage, only the Projection field in these two Pipelines is different.

## Queuing data changes

We faced a problem with repeated data updates and said that we have created a process to send data to smaller parts for updates in different time periods. In the same example of the news agency mentioned above, we can divide document updates into several sections based on different criteria. For example, we can update newer news (e.g., the past 2 months) immediately and put older news in a queue for updating. For this purpose, we have created an entity language called Query Queue or QQ, which is an object of all commands that are to be sent to the database for data change.

The existence of this object allows us to manage updates. For example, if there are millions of updates to be made, we divide them into smaller parts. Depending on the amount of server hardware resources involved, we send a small part for updating to the database. We check the server hardware resources again and if the server is not involved in heavy processing, we send another part for updating.

In this classification, in addition to dividing the number of requests, we can also reduce the number of requests by comparing changes. For example, the author above changed his name from Ali to Ali Akbar once and changed his interests from reading to reading and sports a few hours later. Now we have two commands for data modification that can be sent to the database together. Therefore, we can merge these requests and then send them.

If we consider this classification as a compartment for storing data modification commands, we can also use it to verify the consistency of repeated data. And if for any reason any part of the data encounters problems, we can use this compartment to find and correct those problems.

We can also use artificial intelligence to manage changes in this queue, which will be explained in the relevant section.

## CSR, SSR or SSG content

Content on the internet is usually divided into three parts: CSR or Client-Side Rendering, SSR or Server-Side Rendering and SSG or Static Site Generation. CSR content is usually created by JavaScript frameworks on the client side, which is why search engines cannot easily understand them. SSR content is processed on the server side and is easily understandable by search engines. However, to create this content, the server must be involved in processing them each time. The best contents for publishing on the web are SSG contents because they are completely understandable by search engines and the server will not be involved in processing their data. Static contents can be placed on CDNs (Content Delivery Networks) and requests for this content can be returned from the stored location on the network before it reaches the server. To understand the popularity of SSG content, you can refer to popular JavaScript frameworks such as Gastby and NextJS.

One of the biggest problems with creating SSG content is the complexity of the data model. As the number of requests for data from the database increases, the amount of content that can be converted to SSG decreases. Because to create SSG content, the number of requests to the database must reach zero in order to produce static content.

Lesan’s framework has simplified the conditions for creating SSG content by reducing the number of requests to the database. On the other hand, by dividing the content into two parts, dynamic and static, and creating a database inside RAM that is managed by processes similar to Redux, there will be more concentration on the processes of creating and requesting SSG content.

In addition, Lessen only updates SSG content when a data has changed. Unlike the process that is usually used in NextJS or Gastby, which uses time periods to create and update SSG content due to lack of awareness of data changes. In this way, a specific time is determined in advance (for example, one day) to generate SSG content, and when that time ends, they send a request to the server to receive the content again and convert it to SSG and repeat this process. This cycle has two major problems: first, it is possible that the data has not changed and an unnecessary processing task is imposed on the server which can cause problems if the number of these requests on the server increases. And the second problem is that it is possible for the content on the server to change and it may be necessary to quickly update that content everywhere, including places where SSG content is stored. But in current processes, we have to wait until the time we have set in advance ends and send another request to the server to update the SSG content.

Returning to the example of a news agency, if this website intends to convert its news to SSG content, it will face both of the above problems. On the one hand, the process of generating SSG content may be performed for many news items that have not changed, which creates an unnecessary processing load for the server. On the other hand, it is possible that a news item has been mistakenly converted to SSG content and the news agency wants to remove it quickly, but we have to wait until the end of the specified time for that content to disappear. Also, someone has to request this news after the end of this time. For these two simple reasons, many websites prefer to process their content in SSR form. But how can we create SSG content only when data changes in the main database? This can be easily done with Lesan.
