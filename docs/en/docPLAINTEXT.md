## Introduction
Lesan is a collection of a [Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) and an `ODM` along with an idea to implement [microservices](https://www.ibm.com/cloud/learn/microservices).

In this framework, we tried to delegate data retrieval management to the client, inspired by the idea of [​​GraphQL](https://graphql.org/), without adding an extra layer (such as [GQL](https://en.wikipedia.org/wiki/Graph_Query_Language) language processors) on the client and server side. In addition, we use all the capabilities of [NoSQL](https://en.wikipedia.org/wiki/NoSQL) databases so that we can embed all the relationships of a schema within itself without involving the server-side programmer in managing the creation, retrieval, updating, and deletion of duplicated embeddings.

Meanwhile, we should have a regular structure (such as [SQL](https://en.wikipedia.org/wiki/SQL)) for data models in the `ODM` layer so that we can always validate the data.

We have also simplified the understanding of data structures for artificial intelligence so that we can manage the creation of duplicates in data by this intelligence.

Furthermore, we tried to provide the possibility of being movable for the data structure along with the functions written on the server side so that we can manage microservices more easily.

Finally, this data structure ( by the favor of fewer requests sent to the database) will also simplify the way [SSG](https://en.wikipedia.org/wiki/Static_site_generator) content is created.

## Receive data
One of the biggest challenges for implementing data retrieval capability in Lesan was when the customer requested dependencies of a table with more than two levels of penetration in depth.

Let us review the previous methods before explaining Lesan's method.

### Previous methods and the main challenge
Many of the current structures for interacting with server-side applications require multiple requests to be sent to the server to receive a set of information related to each other. Also, due to the mismatch between the sent information and the customer’s needs, much of the sent information will be unused and will waste resources and bandwidth. The first problem is known as under-fetching, meaning that the received information is less than what is needed and requires a resend request to the server. This causes the number of server-responsive requests per unit time to decrease and its processing load to increase.

The second problem is known as over-fetching, meaning that the customer only needs a specific part of the information, but the server sends other data in a table regardless of their needs. This problem causes additional bandwidth occupation and increases data exchange time. Facebook has introduced a new concept called GraphQL to solve these problems to some extent. This idea is very creative and practical but also comes with problems and challenges.

![](https://lh3.googleusercontent.com/e8kqfRVjEZ9Dl3MaZv_8Iq7XddcvZweVOpgu_EvJrGCtRdsBV9wDHKbWlax_ogP8FRf3CJlr1QSVw9oLej4xsvATgH9tKAu5w76P6JU58Rt2JdwvNLEuNZYwNGKCT2h6sAWQIkzUdlgxD_BXhL5VS0k)
### GraphQL problems
Given that GraphQL is a language for describing data models and how to request them, in addition to the implementation of the usual server program, there is also a need for a dedicated implementation of GraphQL. This violates one of the fundamental principles of programming, which is ["Don't repeat yourself" (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and forces developers to learn the descriptive language specific to GraphQL, which is GQL.
``` typescript 
# This Book type has two fields: title and author  
type Book {  
title: String # returns a String  
author: Author # returns an Author  
}  
  
type Mutation {  
addBook(title: String, author: String): Book  
}
```
After the data model is described in GraphQL, for each request sent to the server, there is a need to parse and analyze the descriptive texts, which also has overhead processing.

One of the things that is managed in GraphQL is sending data along with their relationships. However, the depth and type of relationships requested are not easily manageable, which causes non-optimal requests to be sent to the server.

![](https://lh3.googleusercontent.com/S9I5sW06-vEr5kaiIrnY62bK0Lhjicez34hrY-DRT6Mf_ihUzb5MsV6C0JYQ2fsuo35gXMVx2qOxR6KaIpZ-XXsJfKw-ZmnCnBWyq1tFS1icNJYTJjpHKfbESOE82hgScy7ZdnKhdy-2il3-r07Jnj8)
GraphQL is a general-purpose descriptive language and has not been optimized for a specific database. In fact, this tool has no view of what implementation has been done in other structures and certainly no specific optimization has been made on it.

Sending a request in GraphQL is not in common and popular formats such as JSON, and this factor makes sending a request with many current tools a complex matter.

Also, in GraphQL, the common standards for requests have not been used on the web and new concepts such as query, mutation, etc. have been created (this has both advantages and disadvantages).
### Lesan's solution for how to communicate between the server and the client
The idea of connecting client-side nodes to the backend in Lesan is inspired by GraphQL, but in Lesan we tried to make this connection simpler and more practical so that we can solve the problems mentioned above.

We focused on three points to do this:
1.  We do not add any language to the client and server (such as GQL language in GraphQL).
    
2.  Instead of implementing complex logic to filter fields selected by the user, we use the logic implemented within databases (here Aggregation in MongoDB). Because algorithms implemented within databases have more scalability and efficiency due to direct data communication.
    
3.  We store all relationships in data as embedded to reduce the amount of requests sent to the database.
    
4.  Let’s create descriptive information for different types of data and how they are embedded in server-side logic so that we can create more efficient data models in the NoSQL style. We can also simplify data management in the database without changing the information.
 
 ### Proposed Method
 In the first step, we tried to organize the data structure because we intended to use NoSQL databases and at the same time we needed to have structured data like SQL both at runtime and during development to simplify the management of embedded data as much as possible.
 
We divided the relationships into two types of simple (inrelation) and complex or impossible (outrelation) for embedding. We stored simple relationships completely and stored complex relationships only in the number that could be returned in the first request (first pagination).

We exactly left the data retrieval management to the client as MongoDB had defined it, that is, sending an object with a key (data name) and a value (0 or 1) to the client.

We found a creative way to produce Aggregation Pipelines in MongoDB so that fewer documents are requested when receiving data as much as possible.

We allowed the client to see all the models and functions written on each model and choose them in the same object sent.

We allowed the client to see the output of each function written for each model along with the exact depth of its relationships that had previously been determined by the server-side programmer in a type-safe manner to make it easier to create the sent object.

We created an ODM to simplify the process of receiving data along with its relationships and also to manage the repetitions created from embedded relationships within this ODM so that the server-side programmer writes less code.

We prioritized input data validation and created a process for the server-side programmer to create a validator for each function written on each model so that we can run that validator before executing the function. In this validator, recursive data management along with the depth of penetration into the relationships of each model must be explicitly specified.

Let us clarify the issue with an example:
Let’s consider a schema named country with the following fields:
````typescript
id  
name  
abb  
description  
geoLocation  
capital  
provinces  
cities
````
And also a schema for the province with the following fields:
````typescript
id  
name  
abb  
description  
geoLocation  
center  
country  
cities
````
And also a schema for the city with the following fields:
````typescript
id  
name  
abb  
description  
geoLocation  
country  
province
````
The capital field in the country and the center field in the province are of type city and we completely embed them. This form of relationship is a simple relationship and we call it inrelation, which ultimately is a single object of the pure city fields (inrelations can also be multiple and be an array of objects) which is defined as follows:
````typescript
countryInrelations = { capital: { schemaName: "city", type: "one", optional: false } }
````
All country relationships do not end here. This schema also has a relationship with the province and city. With one simple question, we can complete the country’s relationships:

Is the number of provinces that we are going to keep inside the country too high? (i.e., if it is an SQL database, do we store the province key inside the country?)

Answer: No, the number of provinces is limited and we can store all provinces inside the country schema. So this relationship is also inrelation. Therefore, the above object should be created in this way:
````typescript
countryInrelations = { capital: { schemaName: "city", type: "one", optional: false }, provinces: { schemaName: "province", type: "many", optional: true }}
````
Another relationship we have in the country is the city, how do we define it?

There are many cities in a country and we cannot store all the cities in a country schema.

So this is a complicated relationship with a large number, we define it as outrelation that the process of defining it requires more information to know exactly what amount and what data we are going to embed, we add that information in the sort key.

````typescript
countryOutrelation = { cities: { schemaName: "city", number: 50, sort: { field: "_id", order: "desc", type: "objectId"}}}
````
We also define the remaining fields of the country that are specific to it and are not related to any relationship as pure fields.

````typescript
countryPure: { name: string(), abb: optional(string()), ... }
````
For the province, it is the same way:
````typescript
provinceInrelations = { center: { schemaName : "city", type: "one" }, country: { schemaName: "country", type: "one" }}  
provinceOutrelation = { cities: { schemaName: "city", number: 50, sort: { field: " _id", order: "desc", type: "objectId"}}}  
provincePure: { name: string(), abb: optional(string()), ... }
````
And for the city, it is the same way:
````typescript
cityInrelations = { country: { schemaName: "country", type: "one" }, province: { schemaName: "province", type: "one" } }  
cityOutrelation = {}  
cityPure: { name: string(), abb: string() , ... }
````
If you pay attention, every relation that is kept as inrelation in a schema, the related schema has also stored this schema as outrelation.

It is worth noting that we save this form of defining schemas in the integrated runtime in an object called Schemas. We will discuss its structure further. But what is stored in the database is the initial form that we showed earlier. It means for the country:
````typescript
id  
name  
abb  
description  
geoLocation  
capital  
provinces  
cities
````
The amount of pure fields is known. And the value of the fields that are of the relation type of schemas will be in the form of objects of the pure type of that relation. That is, for example, for the country:
````typescript
{
id: "234fwee656",
name: "iran",
abb: "ir",
description: "a big country in asia",
geoLocation : [ [12,4], [32,45], ... ],
capital : {
	id: "234fwee656",
	name: "tehran",
	abb: "th",
	description: "the beautiful city in middle of iran",
	geoLocation : [ [12,4], [32,45], ... ]
},
provinces : [{
	id: "234fwee656",
	name: "tehran",
	abb: "th",
	description: "one of the irans provinces",
	geoLocation : [ [12,4], [32,45], ... ]
	},
	{

	id: "234fwee656",
	name: "hamedan",
	abb: "hm",
	description: "one of the irans provinces",
	geoLocation : [ [12,4], [32,45], ... ]
},
... til to end of the provinces
}],
cities :  [{
		id: "234fwee656",
	name: "tehran",
	abb: "th",
	description: "the beautiful city in middle of iran",
	geoLocation : [ [12,4], [32,45], ... ]
	},
	{
		Id: "234fwee656",
	name: "hamedan",
	abb: "hm",
	description: "one of the irans cities",
	geoLocation : [ [12,4], [32,45], ... ]
},
... til to end of the number limit for the first paginate
}],
````
Now the user can filter and receive all the fields of a schema along with the first depth of its relations by sending only one request to the database.

This request is performed based on the process of projection in MongoDB according to the values of fields being one or zero. Without our framework having any involvement in this process. And without us writing an additional layer to filter the requested fields in it. (The process and form of this request will be explained later.)

If the lower fields of a country’s schema are requested in a request, not only all the requested information will be received and returned to the user with one request to the server but also with one request to the database.

If the following fields are requested from the schema of a country in a request. Not only with a single request to the server but also with a single request to the database, all requested information will be received and returned to the user:

````typescript
getCountry → id: 1
              Name: 1
		  abb: 1
		  decsription: 1
		  capital → id: 1
                  name: 1
			abb : 1
		  provinces → id :1
                  name : 
			description : 1
		  cities → id : 1
                  name : 1
			abb : 1
````
If a user penetrates more than one level of depth, what should be done? For example, if they request provinces for a country, they may also want its cities from within the provinces.

````typescript

````
Let’s examine what happens in SQL databases before we explain the Lisan framework solution:
-   First of all, we run a query to find the country, because we have the country ID, we run an indexed query.

- After that, we run a query to find the capital, because we have its ID stored in the country, we run an indexed query.

-   Then we send a query to find the first paginate of provinces. If we have stored the ID of all the provinces of a country inside it, we run an indexed query. Otherwise, we must send an unindexed query with the country ID filter found.

-   Continuing with the example, if we had found 35 of the first paginate provinces. We should send a non-index query with a province ID filter for each one on each city and find the first paginated cities for each of the provinces. (For example, 50 for each province, which means 50 times 30)

-   Finally, to find the first paginate cities for this country too, we need to send a non-index query with the ID filter of the found country on the city table

You saw that the process was very complicated in SQL, now let’s see how the same process is done in Lesan .

In the previous section, we mentioned that to get a country along with the first depth of its relationships (i.e., capital, states, and cities), we only send an indexed query to the schema of the country and receive all the information.

Now we only need to receive information about cities for each province.

To do this, while we have access to the information of the provinces, we send an indexed query to receive the provinces again.

Because of the concept of outrelation, we are sure that the information of cities is stored within provinces. Therefore, by receiving the provinces again, we will also receive the information of cities.

This will have two advantages for us. First, instead of sending a non-index query to the city, we send an index query to the province because we have received the province IDs in the first query.The second advantage is that instead of receiving a large number of cities, we have only received a few provinces. (For example, in SQL, the number of requested documents from the database is equal to 1 + 1 + (35 * 50) + 50. But in the Lesan method, only 1 + 35 documents have been requested.)

Now imagine what would happen if more depth and relationships were requested? This is the Achilles' heel of projects written with GraphQL.

### Why duplicate data?
As you noticed in the above example, if we can store all the dependencies of a table inside it, we can significantly reduce the number of requests sent to the database. This number is remarkably large. For example, in one of the best cases, if we have a table with 10 dependencies, each dependency is related to 10 other tables and all relationships are many-to-many. If we want to receive a list of 50 items from that table along with 2 steps of penetration into its relationships with one request, in SQL we should send 50 * 10 * 50 * 10 which is equivalent to 250000 (two hundred and fifty thousand) requests sent to the database. But in Lesan all this data is collected with only 50 * 10 which is equivalent to 500 requests sent to the database.
### The Ratio Of Creation And Update To Data Retrieval
Imagine a news database. We need a table for the authors and another table for the news written. Usually, at the end of each news, the name and some information of the author of that news are also included. If we place the information we need for the author of that news inside the news at the time of creation, we will not need to send a separate request to the database to receive the information of the author of that news when reading each news. But the problem arises when the author updates their information. For example, if they change their name from Ali to Ali Akbar. In this case, we have to update all the news written by that author. If this author writes an average of 10 news per day and works on this news website for more than 5 years, at least 18250 documents in the database must be updated. Is this cost-effective? In general, and in most cases, it can be cost-effective because news can be read more than a few thousand times a day and on the other hand, each author only changes their information once a year. Therefore, updating 18250 documents once a year is much less expensive than reading information from two different tables millions of times a day. Moreover, we have created a different solution for updating these repetitions called QQ, which updates them based on the amount of hardware resources used by the server side in different time periods and based on the value of the data. This process will be fully explained below.
### ## Why noSQL?
As you have seen, data duplication reduces the number of multiple requests to the database, which affects both the speed of receiving data and the way SSG content is created. In addition, the number of methods for receiving embedded data in these databases (especially aggregations in Mongodb) makes managing and filtering this data easier.

### Why Mongodb?
We had two ways to achieve the best performance:

 1.  We would generally design a database from scratch to achieve at least the following points:
	
		-    give what we receive from the customer on the client side to the database so that we do not have any additional processing for analyzing the request.
    
		-  Embed all relationships at least to one level.
    
		-  In order to receive data from the database with any degree of penetration into the depths of relationships with only one query
	
1.  Among the available databases, let’s go for one of them and bring all our structures in line with it. Implementing a new database, although attractive, is infinitely time-consuming and requires a lot of time and cost to mature and become usable. Among the available databases, Mongodb met all our needs for at least three reasons:
      1. Mongodb is a NoSQL database and that’s exactly what we were looking for.
      2. The process of selecting recursive fields from this database, namely projection, is a standard object with the field name key and a value of zero or one, and we could ask the same object from the customer on the client side without any processing and send it to the database.
      3. And the key point was the creative idea of aggregation, because we could penetrate into the depths of relationships by sending only one request for any amount of data we wanted. [It was enough to create helper functions for building request pipelines in this way.](https://www.pagerduty.com/resources/learn/what-is-data-aggregation/)
 
 Let’s examine how to create a Pipeline for filtering and selecting data in Mongodb aggregations with an example:
 
 Consider the schemas we had for the country, province, and city tables, and now we want to receive a list of 25 provinces along with the country and cities of that province with one request. The Pipeline we create will be like this (the Pipeline that needs to be created for Lesan will be slightly different, which we will discuss later):
 
````typescript
provinces.aggregation([
    	{
      	"$lookup": {
        	from: "country",
        	localField: "country._id",
        	foreignField: "_id",
        	as: "country"
      	}
    	},
    	{ "$unwind": { path: "$country", preserveNullAndEmptyArrays: true } },
    	{
      	"$lookup": {
        	from: "city",
        	localField: "cities._id",
        	foreignField: "_id",
        	as: "cities"
      	}
    	},
    	{
      	"$project": {
        	_id: 1,
        	name: 1,
        	abb: 1,
        	country: { _id: 1, name: 1, abb: 1 },
             cities: { _id: 1, name: 1, abb: 1 }
      	}
    	}
  	]);


````
Now if we create the same Pipeline for a project that has been created with Lesan, it will be as follows:

````typescript
states.aggregation([
      	"$project": {
        	_id: 1,
        	name: 1,
        	abb: 1,
        	country: { _id: 1, name: 1, abb: 1 },
             cities: { _id: 1, name: 1, abb: 1 }
      	}
]);
````
Yes, we send an empty Pipeline because all relationships are embedded in Lesan and we only send the projection to select the requested fields. But what happens if we penetrate one more level deeper into the relationships? For example, let’s request the provinces of countries again from within the countries and request the country of that city again from within the cities (it is true that this example is unrealistically funny, but we implement it only for comparison so that the concept can be easily conveyed). In the usual case, the Pipeline will be like this:

````typescript
states.aggregation([
    	{
      	"$lookup": {
        	from: "country",
        	localField: "country._id",
        	foreignField: "_id",
        	as: "country"
      	}
    	},
    	{ "$unwind": { path: "$country", preserveNullAndEmptyArrays: true } },
    	{
      	"$lookup": {
        	from: "state",
        	localField: "country.states._id",
        	foreignField: "_id",
        	as: "country.states"
      	}
    	},
    	{
      	"$lookup": {
        	from: "city",
        	localField: "cities._id",
        	foreignField: "_id",
        	as: "cities"
      	}
    	},
    	{
      	"$lookup": {
        	from: "country",
        	localField: "cities.country._id",
        	foreignField: "_id",
        	as: "cities.country"
      	}
    	},
            { "$unwind": { path: "$cities.country", preserveNullAndEmptyArrays: true } },
    	{
      	"$project": {
        	_id: 1,
        	name: 1,
        	abb: 1,
        	country: { _id: 1, name: 1, abb: 1, states: { _id:1, name:1, abb:1 } },
             cities: { _id: 1, name: 1, abb: 1, country: { _id:1, name:1, abb:1 } }
      	}
    	}
  	]);
````
But the project created with Lesan will create a Pipeline as follows:

````typescript
states.aggregation([
    	{
      	"$lookup": {
        	from: "country",
        	localField: "country._id",
        	foreignField: "_id",
        	as: "country"
      	}
    	},
    	{ "$unwind": { path: "$country", preserveNullAndEmptyArrays: true } },
    	{
      	"$lookup": {
        	from: "city",
        	localField: "cities._id",
        	foreignField: "_id",
        	as: "cities"
      	}
    	},
    	{
      	"$project": {
        	_id: 1,
        	name: 1,
        	abb: 1,
        	country: { _id: 1, name: 1, abb: 1, states: { _id:1, name:1, abb:1 } },
             cities: { _id: 1, name: 1, abb: 1, country: { _id:1, name:1, abb:1 } }
      	}
    	}
  	]);
````
If you notice, we have no Pipeline to get the provinces inside the country because we know that in Lesan all relationships are stored in an embedded way and if we have the country with its relationships, we have definitely stored the last 50 provinces of each country inside it in an embedded way. So while we store the country as Pure and without relationships in the axis of each province and have it, we receive it again with a Pipeline.Now, instead of 50 * 50 + 50 documents (if we have requested 50 provinces per country by default), we only receive 50 documents (the country where the provinces are embedded). Now imagine that if, for example, the last registered restaurants in each country were also requested in this query, usually 50 * 50 + 50 * 50 + 50 documents would have to be requested, but with Lesan, the same document received for each country will also have a list of the last 50 restaurants and we only request those 50 documents instead of 5050 documents. And as each relationship is added, these numbers will get further apart from each other.

The same policy applies to cities in relation to the country. The only difference is that here 50 provinces are requested, each province wants the last 50 cities and each city has a relationship with a country that has been requested and we have to receive 50 * 50 + 2500 documents which with Lesan we have reduced this number to 50 * 50 documents.

Another point to note is that the Pipeline created in the last stage in Lesan is very similar to the Pipeline created in the normal state in the first stage, only the Projection field in these two Pipelines is different.
### Queuing data changes
We faced a problem with repeated data updates and said that we have created a process to send data to smaller parts for updates in different time periods. In the same example of the news agency mentioned above, we can divide document updates into several sections based on different criteria. For example, we can update newer news (e.g., the past 2 months) immediately and put older news in a queue for updating. For this purpose, we have created an entity language called Query Queue or QQ, which is an object of all commands that are to be sent to the database for data change.

The existence of this object allows us to manage updates. For example, if there are millions of updates to be made, we divide them into smaller parts. Depending on the amount of server hardware resources involved, we send a small part for updating to the database. We check the server hardware resources again and if the server is not involved in heavy processing, we send another part for updating.

In this classification, in addition to dividing the number of requests, we can also reduce the number of requests by comparing changes. For example, the author above changed his name from Ali to Ali Akbar once and changed his interests from reading to reading and sports a few hours later. Now we have two commands for data modification that can be sent to the database together. Therefore, we can merge these requests and then send them.

If we consider this classification as a compartment for storing data modification commands, we can also use it to verify the consistency of repeated data. And if for any reason any part of the data encounters problems, we can use this compartment to find and correct those problems.

We can also use artificial intelligence to manage changes in this queue, which will be explained in the relevant section.
### CSR, SSR or SSG content
Content on the internet is usually divided into three parts: CSR or Client-Side Rendering, SSR or Server-Side Rendering and SSG or Static Site Generation. CSR content is usually created by JavaScript frameworks on the client side, which is why search engines cannot easily understand them. SSR content is processed on the server side and is easily understandable by search engines. However, to create this content, the server must be involved in processing them each time. The best contents for publishing on the web are SSG contents because they are completely understandable by search engines and the server will not be involved in processing their data. Static contents can be placed on CDNs (Content Delivery Networks) and requests for this content can be returned from the stored location on the network before it reaches the server. To understand the popularity of SSG content, you can refer to popular JavaScript frameworks such as Gastby and NextJS.

One of the biggest problems with creating SSG content is the complexity of the data model. As the number of requests for data from the database increases, the amount of content that can be converted to SSG decreases. Because to create SSG content, the number of requests to the database must reach zero in order to produce static content.

Lesan’s framework has simplified the conditions for creating SSG content by reducing the number of requests to the database. On the other hand, by dividing the content into two parts, dynamic and static, and creating a database inside RAM that is managed by processes similar to Redux, there will be more concentration on the processes of creating and requesting SSG content.

In addition, Lessen only updates SSG content when a data has changed. Unlike the process that is usually used in NextJS or Gastby, which uses time periods to create and update SSG content due to lack of awareness of data changes. In this way, a specific time is determined in advance (for example, one day) to generate SSG content, and when that time ends, they send a request to the server to receive the content again and convert it to SSG and repeat this process. This cycle has two major problems: first, it is possible that the data has not changed and an unnecessary processing task is imposed on the server which can cause problems if the number of these requests on the server increases. And the second problem is that it is possible for the content on the server to change and it may be necessary to quickly update that content everywhere, including places where SSG content is stored. But in current processes, we have to wait until the time we have set in advance ends and send another request to the server to update the SSG content.

Returning to the example of a news agency, if this website intends to convert its news to SSG content, it will face both of the above problems. On the one hand, the process of generating SSG content may be performed for many news items that have not changed, which creates an unnecessary processing load for the server. On the other hand, it is possible that a news item has been mistakenly converted to SSG content and the news agency wants to remove it quickly, but we have to wait until the end of the specified time for that content to disappear. Also, someone has to request this news after the end of this time. For these two simple reasons, many websites prefer to process their content in SSR form. But how can we create SSG content only when data changes in the main database? This can be easily done with Lesan.

### ### Penetration Into Depths
The next issue is how to penetrate the depths. [In GraphQL, you have very complex solutions to manage it](https://escape.tech/blog/cyclic-queries-and-depth-limit/), but in Lesan, this issue does not exist by default because in projects written with Lassan, the server-side programmer must determine the depth of the relationships of each accessible point from the program before writing any accessible point. Let’s take a look at implementing a small project with Lesan to clarify the matter.

In Lassan, starting a project will be like this:
- First of all, we create an app with the Lesan framework, for example (this sample is written in TypeScript):

````typescript
const ecommerceApp = lesan();
````

-   We write the model we want for the software using the pure - inrelation - outrelation method and add it to our ODM application. Like this (consider the same information we mentioned in the above example for country and cities):
````typescript
const statePureObj = {
	id: optional(any()),
	name: string(),
	geometries: optional(object({
    	type: string(),
    	coordinates: array(array(number())),
	})),
abb: optional(string()),
description: optional(string()),
};

const stateInRel = {
	country: {
    	schemaName: "country",
    	type: "one",
    	optional: false,
	},
	cities: {
    	schemaName: "city",
    	type: "many",
    	optional: true,
	},
};

const stateOutRel = {};

const states = () =>
	    ecommerceApp.odm.setModel(
    	    "state",
    	    statePureObj,
    	    stateInRel as Record<string, InRelation>,
    	    stateOutRel as Record<string, OutRelation>,
	);
````
-   Now we create a function for this model and add it to our application actions (in fact, this action is available to the customer side user to call it) like this:

````typescript
const addStateFn: ActFn = async (body) => {
	const {
    	    set: { name, enName, countryId, geometries },
    	    get,
	} = body.details;

	return await states().insertOne({
          doc: {
    	        name,
    	        enName,
    	        geometries,
	    },
          relation: { country: new ObjectId(countryId) },
          get
      });
};
````
###### In the Method written for insertOne in Lesan’s ODM, the input get is also received and returned using the aggregation method. The input relation also receives the relationships of the selected model and finds the pure information of all relationships based on the information we have given it before and stores them in an embedded form.
-   Now we write a validator for this function as follows:

````typescript
const addStateValidator = () => {
	return object({
    	set: object({
        	countryId: string(),
        	name: string(),
        	enName: string(),
        	geometries: optional(object({
            	type: string(),
            	coordinates: array(array(number())),
        	})),
    	}),
    	get: selectStruct("state", 2),
	});
};
````

-   As you can see, the validator function addState has an object with keys set and get. The set key is used for information that we need to add state, and as you saw in addStateFn, this information has been used. But the value of the get key is what we need to penetrate into its depth. This value must be an object of a model that accurately specifies the degree of penetration into each of the relationships of that model (here in addStateFn). Here the get key is generated by a function called selectStruct. This function has two inputs. The first input is the name of the model for which we want to generate this object, and the second input specifies the degree of penetration into each relationship. The second input of the selectStruct function can be entered as a number or an object. If entered as an object, the keys of this object must be the names of the selected model relationships, and its value can again be a number or an object of its key relationships. Such as:

````typescript
{ country : { state: 2 }, cities: 1 }
````
As a result, an object will be produced as follows :
````typescript
{
    id: enums([0,1]),
    name: enums([0,1]),
    abb: enums([0,1]),
    description: enums([0,1]),
    geoLocation: enums([0,1]),
    country: {
        id: enums([0,1]),
        name: enums([0,1]),
        abb: enums([0,1]),
        description: enums([0,1]),
        geoLocation: enums([0,1]),
    },
    cities: {
        id: enums([0,1]),
        name: enums([0,1]),
        abb: enums([0,1]),
        description: enums([0,1]),
        geoLocation: enums([0,1]),
    }
}
````
This object is used for validating the data sent from the client to the server. With this method, we have accurately and separately determined the depth of penetration for each function. If you notice, the key “get” is exactly similar to “projection” in MongoDB and after validating this object, we send it to the database without any changes to receive the data. Besides, we can inform the customer side of all the details of the written requests on the server. As a result, even before sending a request on the customer's side, we can understand what information needs to be sent and what information we can receive. Finally, we add this function and validator to our software with the setAct function.

````typescript
ecommerceApp.acts.setAct({
    	type: "dynamic",
    	schema: "state",
    	fn: addStateFn,
    	actName: "addState",
    	validator: addStateValidator(),
});

````

## Microservice
 ### Microservice process implementation
There are different processes for implementing microservices around the world. However, in general, each service must have a separate and unique logic and data model with the least amount of dependency on other services. Therefore, the team working on each service can think independently about developing their software.

Ultimately all services want to send and/or receive information from other services. If the data models are very different from each other, separate logic must be written for each data to be coordinated. In some microservice development models, it is preferred that the data model designed for services be as consistent as possible because different services can have many common features.

Consider an ERP as an example. We have a service for accounting, a service for warehousing, and a service for running a store. All three of these services work with an entity called a product. Changing the product entity in any of these services affects the other services as well. For example, if a product is sold, the warehouse must be notified so that it can replace it in the store in time, and accounting must also have sales information to do its job. Therefore, if the product entity is consistent across all three services, writing server-side logic will be easier. In this type of microservice development, there is usually a senior programmer who knows about all three services and designs their models. This procedure will somewhat reduce the independence of services but ultimately create less trouble for development.

Another problem that arises in microservices is the lack of data consistency. Take the same ERP example. If a product is sold but not registered in the accounting service or removed from the warehouse but not registered in the store, it will cause data inconsistency. To reduce these inconsistencies, a tool called a message broker is recommended. With this tool, all messages that are supposed to be exchanged between two services are sent to an independent service and stored there. If a service does not work properly, messages are not lost and as a result, data always remains consistent and coordinated.

The next issue in microservices is the distribution of server-side hardware resources. If we have a large number of services, managing the processors of these services will be complicated and we will need many tools to analyze requests so that we can know the amount of hardware resources involved in running each piece of code. In addition, the exchange of messages between services is also an additional processing load that must be performed. Also, the repetitions created from the data require not only additional space for storage but also the need to write parallel logic because each logic processes a separate data. However, the main problem in distribution of processing load arises at the time of horizontal load division. If the data is integrated in one place, managing the distribution of processing load will be simple but when each service has its own database and processing load and at the same time needs other service data, distribution of processing load for it requires considering these dependencies. Given the limitations of vertical load division, removing obstacles to horizontal load division is essential. Lassan offers small solutions for implementation of microservices that can reduce their implementation complexity. It also proposes a new process that has an architecture between microservices and monoliths that will be explained later.
### Lesan solution
As mentioned in the above section, Lesan is a collection of models and actions created for those models. But in fact, these models are placed inside another object called contentType. contentType includes two other objects called dynamic and static (which will be explained later). contentType itself is also placed inside another object called main or any other service that is active in this process. All the information available in the main key can be obtained with the getMainActs function. All functions created with the setAct function are stored by default inside the main object. But there is another function called setService. With this function, we can add another service to our project. After adding a new service, we can access it by sending an object from the client side that has a service key. The setService function has two inputs: the first input is the name of the service and the second input can be obtained in two ways:
-   As a string, which is actually the address of access to another service.
    

-   As another object, which is actually the output of the getMainActs function in another service.

If the second input is a string, http or grpc methods are used to communicate with it, and if it is an object, that other service comes up as a plugin on this current service. As a result, we can manage a project both as a monolith and as a microservice at the same time.

### A suggestion for microservices (an architecture between microservices and monolith)
To create a model in Lesan, it can be expanded based on another extensive model so that it has nothing more than that and can only have some of its keys. Therefore, we can create a database for all services along with all models that have all the necessary keys in all services. Then each service defines its own model separately based on the integrated database model and takes some of its required keys from that main model. Given the way models are written in Lesan (model implementation based on a schema validator), we can have a common database and at the same time each service can validate its own data based on the expanded model of the comprehensive and original model. Also, it is possible to move models and actions written in Lesan, and we can easily have each service’s database separately or simultaneously with other services. On the other hand, NoSQL databases are usually schemaless and any shape or form can be given to data in the database. Lesan is currently developed based on MongoDB. If we can put all service models in a comprehensive database, we can prevent data duplication and we no longer need to write parallel logic to manage this duplication. In addition, we do not need any tools for synchronization or writing separate logic to standardize data. Finally, we can also take advantage of the ease of horizontal distribution of NoSQL databases without worrying about data consistency. Consider the following example:

Suppose we have several services named core - ecommerce - blog and so on, all of which have a model for users named user. We can create a model of the user that has all the fields of all these services and share it among all services, like this:

````typescript
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
	location: optional(object({
    	type: string(),
    	coordinates: array(array(number())),
	})),
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

export const userInRel: Record<string, InRelation> = {};
// TODO how c
export const userOutRel: Record<string, OutRelation> = {
	blogPosts: {
    	    schemaName: "blogPosts",
    	    number: 50,
    	    sort: { type: "objectId", field: "_id", order: "desc" },
	},
	orders: {
    	    schemaName: "order",
    	    number: 50,
    	    sort: { type: "objectId", field: "_id", order: "desc" },
	},
};
````
Now, for example, we create a model of the user for ecommerce as well and write its fields in such a way that it does not have anything more than the shared user model, like this:

````typescript
import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, boolean, date, InRelation, number, optional, OutRelation, string } from "../../../deps.ts";

import {
	addressObj,
	gender,
	level,
	pureUserObj as sharedPureUserObj,
	userInRel as sharedUserInRel,
	userOutRel as sharedUserOutRel,
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

const userInRel: Partial<typeof sharedUserInRel> = {};

const userOutRel: Partial<typeof sharedUserOutRel> = {
	// blogPosts: {
	// 	schemaName: "blogPosts",
	// 	number: 50,
	// 	sort: { type: "objectId", field: "_id", order: "desc" },
	// },
	orders: {
    	    schemaName: "order",
    	    number: 50,
    	    sort: { type: "objectId", field: "_id", order: "desc" },
	},
};

export const users = () =>
	ecommerceApp.odm.setModel(
    	    "user",
    	    userPureObj,
    	    userInRel as Record<string, InRelation>,
    	    userOutRel as Record<string, OutRelation>,
	);
````
Now we can connect them to a common database while several services continue their work independently, provided that the data validation of the schemas works independently for each service and only understands its own data. You can see a complete example of this type of microservice implementation here.
## Artificial intelligence
As explained in the section “Why data duplication” above, machine learning will be used in Lesan to manage the repetitions created in the data. In this way, a weight is given to each content according to different criteria, and if a request is made to update that content within QQ, changes are sent to the database according to the weight of the content. These weights can be feedback rate of the content, the amount of sharing it has, its dependencies or dependencies that other contents have on it, the time of content creation, whether it is related to the public or an individual and so on.

Also, artificial intelligence and machine learning can be used to integrate and standardize commands within QQ. In this way, if we find several requests to update a schema that have been registered, we can merge them together.

Artificial intelligence suggestions can be used to optimize the data model to better manage how dependencies are placed. This will minimize the amount of processing and speed up the receipt of information.

## Starting work with Lesan
Let's create a simple web server with deno:

You can find a complete implementation of this example [here](https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMircoservice).

First of all, create a mod.ts file and import the latest version of lesan and assign it to a constant variable called coreApp:

````typescript
import { lesan } from  "https://deno.land/x/lesan@vx.xx/mod.ts";  
  
const coreApp = lesan();
````
###### Please select the final version of Lusan from [here](https://deno.land/x/lusan) and replace xxx with it.

Before anything, let's connect a database to our app, so add a new MongoDb instance to your code.

First, import MongoClient from lesan:

````typescript
import { lesan, MongoClient } from  "https://deno.land/x/lesan@vx.xx/mod.ts";
````
and create a database instance via new MongoClient:
````typescript
const client = new MongoClient();  
  
await client.connect("mongodb://localhost:27017/${your_database_name}");  
  
const db = client.database("core");
````
We should set up the ODM with a new database instance:
````typescript
coreApp.odm.setDb(db);
````
As we have said before, to create a model, we need to define its pure fields with the name of pure and the relations of that model in two types of inrelation and outrelation.

pure is merely a simple object with key of string and a value similar to [SuperStruct](https://github.com/ianstormtaylor/superstruct) structure.

inrelation represents an **array** or a **single** pure object of another MongoDb collection, we want to embed in the current document. In SQL modeling, for every relation we save the key or id which we call inrelation. As an example, we have a blogPost which has a creator from the user collection and we save the pure model of the user in the blogPost collection.

outrelation specifies a relation for a specific collection but it could contain an unbound set of data that could outgrow the **16MB** limit size of a document in MongoDB. Thus we do not even save its key or id in SQL modeling. For example, we have a user entity who writes many blog posts and we save for example an array of pure objects of blogPost in order of the date published for the first pagination in the user collection containing the latest 50 blog posts.

Now let's get our hands dirty and create the user and country schemas:

First import string number optional InRelation and OutRelation from lesan :

````typescript
import {
  InRelation,
  lesan,
  MongoClient,
  number,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.xx/mod.ts";
````
and then create the schema shapes:
````typescript
const userPure = {
  name: string(),
  address: optional(string()),
  age: number(),
};

const countryPure = {
  name: string(),
  description: string(),
};

const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
    optional: false,
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};
````
We should set the schema in coreApp:

````typescript
const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);
````
At this point, we need to have some endpoints to call from an HTTP request, so let's write some endpoints.

For creating an endpoint, we need to set the act from coreApp.acts.setAct function which requires type schema actName validator and fn.

-   The type is just an enum of two possible options namely, static and dynamic.
    
-   schema is the name of the model to which we want to set an action.
    
-   actName is just a simple string to identify the act.
    
-   a validator is a superstruct object which is called before the act fn calling and validation the given data.
    
-   validator includes set and get objects.
    
-   fn is the function we call when a request for it arrives.
    

The following is an one example of act:

Before creating act, import object and ActFn from lesan:

````typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.xx/mod.ts";
````
and the act will be in the following form:
````typescript
const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) => await users.insertOne({
    doc: body.details.set, 
    get: body.details.get
});

coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});
````
The last thing we need is just to run the web server:

````typescript
coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
````
When typeGeneration is set to true, it creates a **declarations** folder with some typescript typings we need in the project.

Now run this command in the terminal:
````typescript
deno run -A mod.ts
````
If the web server comes up correctly, you will see the following message:

We are all set and now we can send a POST HTTP request to http://localhost:8080/lesan, include the following in JSON format inside the body in order to retrieve the desired data:
````typescript
{
  "contents": "dynamic",
  "wants": {
    "model": "user",
    "act": "addUser"
  },
  "details": {
    "set": {
      "name": "Seyyedeh Sare Hosseini",
      "address": "Iran, Hamedan",
      "age": 5
    },
    "get": {
      "age": 1,
      "address": 1
    }
  }
}
````
The working of projection for retrieving data is fundamentally based on [MongoDb Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/).

The coreApp.schemas.selectStruct function can limit the projection based on your schema relationships and prevent an infinite loop in retrieving data.

After running the server with typeGeneration set to true, the declarations folder is created and you can import userInp from generated type and make coreApp.schemas.selectStruct<userInp>("user", { country: 1 }) type safe:

````typescript
import { userInp } from "./declarations/selectInp.ts";

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct<userInp>("user", { country: 1 }),
  });
};
````

The following is the full example of what we have discussed so far:

````typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.xx/mod.ts";

const coreApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

coreApp.odm.setDb(db);

const userPure = {
  name: string(),
  address: optional(string()),
  age: number(),
};

const countryPure = {
  name: string(),
  description: string(),
};

const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
    optional: false,
  },
};

const userOutRel = {};

const countryInRel: Record<string, InRelation> = {};

const countryOutRel: Record<string, OutRelation> = {
  users: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};

const users = coreApp.odm.setModel("user", userPure, userInRel, userOutRel);
const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);

const addUserValidator = () => {
  return object({
    set: object(userPure),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};

const addUser: ActFn = async (body) => await users.insertOne({
    doc: body.details.set, 
    get: body.details.get
});

coreApp.acts.setAct({
  type: "dynamic",
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
  });
};

const addCountry: ActFn = async (body) => {
  const createdCountry = await countries.insertOne(body.details.set);
  return await countries.findOne({ _id: createdCountry }, body.details.get);
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

coreApp.runServer({ port: 8080, typeGeneration: true, playground: false });
````
### Microservice Architecture with Lesan:
Lesan provides the capability to create independent services which follow the distributed architecture for your system.

Follow the below instructions in order to create a microservice example:

Move the mod.ts file to core/mod.ts and create another file in ecommerce/mod.ts and place the following code in it:

````typescript
import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "https://deno.land/x/lesan@vx.xx/mod.ts";

const ecommerceApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

ecommerceApp.odm.setDb(db);

const warePure = {
  name: string(),
  brand: optional(string()),
  price: number(),
};

const wareTypePure = {
  name: string(),
  description: string(),
};

const wareInRel: Record<string, InRelation> = {
  wareType: {
    schemaName: "wareType",
    type: "one",
  },
};

const wareOutRel = {};

const wareTypeInRel: Record<string, InRelation> = {};

const wareTypeOutRel: Record<string, OutRelation> = {
  wares: {
    schemaName: "ware",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

const wares = ecommerceApp.odm.setModel(
  "ware",
  warePure,
  wareInRel,
  wareOutRel,
);
const wareTypes = ecommerceApp.odm.setModel(
  "wareType",
  wareTypePure,
  wareTypeInRel,
  wareTypeOutRel,
);

const addWareValidator = () => {
  return object({
    set: object(warePure),
    get: ecommerceApp.schemas.selectStruct("ware", { country: 1 }),
  });
};

const addWare: ActFn = async (body) => await wares.insertOne({
    doc: body.details.set, 
    get: body.details.get
});

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "ware",
  actName: "addWare",
  validator: addWareValidator(),
  fn: addWare,
});

const addWareTypeValidator = () => {
  return object({
    set: object(wareTypePure),
    get: ecommerceApp.schemas.selectStruct("wareType", 2),
  });
};

const addWareType: ActFn = async (body) => await wareTypes.insertOne({
    doc: body.details.set, 
    get: body.details.get
});

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "wareType",
  actName: "addWareType",
  validator: addWareTypeValidator(),
  fn: addWareType,
});

ecommerceApp.runServer({ port: 8282, typeGeneration: true, playground: false });
````
Now we have to create servers, one for the core on port: 8080 and another server for ecommerce on port: 8585.

Then let's implement ecommerce as a microservice in core. It can be done quite easily by just adding these lines of code before coreApp.runServer(...).

````typescript
coreApp.acts.setService("ecommerce", "http://localhost:8282/lesan");
````
Now execute deno run -A mod.ts in both of core/ and ecommerce/ folders until you could see the following message in your terminal:

/on core :
````typescript
HTTP webserver running. Access it at: http://localhost:8080/
````
and on /ecommerce :
````typescript
HTTP webserver running. Access it at: http://localhost:8282/
````
You can now send an HTTP POST request for adding wareType which belongs to the ecommerce service on the http://localhost:8585/lesan endpoint with the following JSON in the request body:

````typescript
{
  "contents": "dynamic",
  "wants": {
    "model": "wareType",
    "act": "addWareType"
  },
  "details": {
    "set": {
      "name": "digital",
      "description": "digital products include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
````
And even add wareType by sending an HTTP POST request to http://localhost:8080/lesan which is for core service with this JSON on request body :

````typescript
{
  "service": "ecommerce",
  "contents": "dynamic",
  "wants": {
    "model": "wareType",
    "act": "addWareType"
  },
  "details": {
    "set": {
      "name": "digital",
      "description": "digital products include phone and ..."
    },
    "get": {
      "name": 1
    }
  }
}
````
and even better you can export all ecommerce actions with just one line of code. Thus, add the below code before `ecommerceApp.runServer(...)` in `ecommerce/mod.ts` and comment the runServer line.

````typescript
export  const ecommerceActs = ecommerceApp.acts.getMainActs();  
// ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });
````
Now import ecommerceActs in core/mod.ts:
````typescript
import { ecommerceActs } from  "../ecommerce/mod.ts";
````
and change coreApp.acts.setService to :
````typescript
coreApp.acts.setService("ecommerce", ecommerceActs);
````
Now we have all the ecommerce actions, even without running the ecommerce server and sending addWareType request to the core service for creating wareType.

If you want to see your actions, simply use this line of code anywhere in your code:

````typescript
const acts = coreApp.acts.getAtcsWithServices();  
  
console.log();  
console.info({ acts }, " ------ ");  
console.log();
````
## Structures
### Schemas
Above, it was said briefly about schemas; In general, each schema includes:

pure, inrelation, outrelation, embedded and struct, which is enclosed in two types, dynamic and static, and is included in another object called service. By default, the service object has the main key. And by adding other microservices, other keys will be added to it.

We have used the superstruct library to create a pure structure in each schema; As a result, these values can be used for each field:
[https://docs.superstructjs.org/api-reference/types](https://docs.superstructjs.org/api-reference/types)
### Pure Structure In Schema
As mentioned in the previous section, pure include the pure features of a schema. In fact, the features that are specific to the schema itself, not the relationships it has.

For example, the schema of a city has pure features: city ID, city name, its geographical location, and so on.

The structure of a pure schema is as follows, which includes a key and its type of feature.

````typescript
export interface PureModel {
  [key: string]: Struct<any>;
}
````
for example, the pure features of the city schema are defined as follows:

````typescript
{
  name: string(),
  enName: optional(string()),
  geometries: optional(object({
	type: string(),
	coordinates: array(array(number())),
  })),
};
````
### The InRelation Structure In Schema
As mentioned in the proposed method section, when schema A has a relationship with schema B, we store the pure values of schema B in the form of embed in schema A.

The relationship inrelation is divided into two types of single and multiple. If it is single, inrelation will be an object. If it is multiple, it will be an array of objects. The important issue is how many pure objects we can store in relation as embed? We have no limitation for this issue in Lesan but MongoDB database has a limitation of **16 megabytes** for each BSON document. Since the number of our relations may not end up with one relation, it is better to consider a limitation ourselves. For example, if the total number of documents we want to embed is less than 100, we consider this relationship as inrelation. If the number is more than 100, we define this relationship as outrelation. The outrelation will be explained later.

The structure of the inrelation relationship is as follows:

````typescript
export interface InRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: "one" | "many";
}
````
In this structure, SchemaName is the name of the schema that schema ‘A’ is associated with. Type can also have the values one or many. If the relationship is single, type takes the value of one and if it is more, it receives the value of many.

For example; As you can see below, the province schema has an inrelation relationship with the country schema, and since each province has only one country, the type of this relationship is single, so type = “one”. And since the number of cities in a province is also very limited. The province schema also has an inRelation relationship with the city, and since its number is more than one, its type becomes many.

````typescript
stateInrelations = { cities: { schemaName: "city", type: "many" }, country: { schemaName: "country", type: "one" }}
````
### The structure of OutRelation in the schema
The outerRelation structure is a relationship that has more than the limitation that we have considered by default for the inrelation relationship. In this type of relationship, we try to store a limited number that may be requested in the first request in an embedded way with a special algorithm. The important point is that for the next user request, they can easily send their request to the main schema and receive the rest of the list from there. Ultimately, this will significantly reduce the number of requests sent to the server.

For example, the number of cities in a country is usually more than a few hundred cities. Our limitation for the inrelation relationship was one hundred, so we store a limited number of cities within the country as an embedded outrelation relationship. By default, we have considered this limited number to be fifty and have sorted these fifty cities by their creation date and in DESC order. Or in another example, if we consider the user schema and the order schema in a shopping program, each order has a customer who is of the user schema type. Therefore, the user is stored in the order schema as an inrelation relationship of type one and embedded. On the other hand, the user schema is also related to the order schema. The user’s orders may be very large, so we store a limited number of each user’s orders as an outRelation relationship embedded in the user schema. We can even store orders multiple times as an outrelation relationship in the user schema. Once sorted by order registration date and once sorted by order price and …

The structure of the outrelation relationship is as follows:

````typescript
export interface OutRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * number of value that we want to keep
   */
  number: number;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort: {
	field: string;
	order: "asc" | "desc";
	type: "number" | "date" | "objectId";
  };
}
````
In this structure, schemaName is the name of the schema that schema A is related to. Number is the number of fields we want to keep in this schema, and an object called sort that includes three values:

1- field that we want to sort by.

2- Order type of ascending or descending.

3- Type the type of field we want to sort by.
### The structure of embed in the schema
The embed structure is created at runtime and when the createEmbeded function is executed, it finds all the inrelation and outrelation relationships of all schemas from other schemas and replaces the pure relationship values.

If we consider the relationships of a schema as follows:

````typescript
inrelation: {
"country": { schemaName: "country", type: "many" },
 },
outrelation: {
   	"orders": {
     	schemaName: "order",
     	number: 50,
     	sort: { filed: "id", order: "desc" },
   	},
},
````
The structure of the embedded will be as follows:

````typescript
embedded: {
   	"country": object({
     	    "id": string(),
     	    "name": string(),
  	}),
 	"orders": array({
     	    "id": string(),
     	    "price": number(),
  	}),
 },
````

### The structure of Struct in the schema
The Struct is also created at runtime and when the createStruct function is executed, it is used to fully validate that schema. The Struct contains the pure properties of a schema and the embedded properties extracted above. For example, the struct for the user schema that has a relationship with country and order is as follows:

````typescript
struct: {
	name:string(),
	lastName:string(),
   	"country": {
     	    "id": string(),
     	    "name": string(),
  	}),
 	"orders": array({
     	    "id": string(),
     	    "price": number(),
  	}),
 },
````
You can read all the features of the superstruct library [here](https://docs.superstructjs.org/api-reference/types).

### ODM (Acts structure)
Given the schema structure in the lesan (inrelations and outrelations), we will need a document object mapper in particular, as explained above, we only store the pure values of each relationship inside the document in the database. In fact, the database is not aware of the inrelation and outrelation relationships. Therefore, we had to manage the creation, retrieval, update, and deletion of embedded information based on the information we had previously received at a higher layer than the database.
For example, suppose we want to add a blog post to the database that has an inrelation relationship with the user schema. Like the document below:

````typescript
post: {
    content: "set fire to the rain",
    title:"second",
    user:{
        _id: "12312jhdjnfas",
        name: "amir",
        lastName: "hshm"
    }
}

````

Against the user schema, it also has an outrelation relationship with the blog post, so we must also add the added post to the user schema.
````typescript
_id: "12312jhdjnfas",
name: "amir",
lastName: "hshm",
posts: [
{
   _id: 1,
   content: "good day",
   title:"first",
},
{
  _id: 2,
 content: "set fire to the rain",
 title:"second",
}
  ],
}
````
As we said, the database itself does not do this for us. We check these relationships by writing an ODM that includes functions such as insertOne, findOne, update, delete, etc., and send an optimized query to the database to meet all our needs (…, insert, find) based on the depth given.
### runServer (web server structure)
Inside the lesan, there is a web server without any dependencies that receives requests and responds appropriately. The structure of this web server is included in a try-catch, so the rest of the written code does not need to be covered with try-catch and it is only necessary to return an appropriate error for each function so that the same error can be sent to the customer side without any unexpected crashes.

The structure of the requests that should be sent to the server is a JSON as follows:

````typescript
{
   "service": "ecommerce",
   "contents": "dynamic",
   "wants": {
       "model": "state",
       "act": "getState"
   },
   "details": {
       "set": {
           "_id": "626fbe6e4b628d43f7e92ae9"
       },
       "get": {
           "name": 1,
           "country": {
               "_id": 1,
               "name": 1,
               "states": {
                   "_id": 1,
                   "name": 1,
                   "country": {
                       "name": 1
                   }
               }
           }
       }
   }
}
````
With the service key, we can choose which microservice is going to respond to the request. By default, the value of this field is main. Sending this key is not mandatory.

The contents key receives the values dynamic and static.

The “wants” key is an object with two keys: model and act. In the model key, the models that exist in the static and dynamic values are selectable and in the act key, the actions that exist in the selected model are selectable.

  

In the details key, there is also an object with two keys set and get. The set key includes all the information that the selected action in the act key needs and the get key includes information that this action is supposed to return to us and we can choose whether to return details with values of zero or one.
### Request processing
In addition to processing the sending structure explained above and delivering the correct information with the correct facilities to the final function, this web server can also process requests that are for downloading or uploading files and ultimately has a context within itself that can be shared between validators and action functions.
### Dynamic structure
In fact, every model we create in the database will be one of the dynamic object keys inside the schemas object. Inside this key, for each of the actions written on that model, we create a key and this key also has two other keys. The validator key is executed before the action function and validates the data required by the action before executing its function. The act key is actually the main action function and at runtime will apply the requested changes to the model.

The structure of dynamic is as follows:

````typescript
dynamic: {
	user: {
  	    create: {
    	        validator: () => {
      	            return true;
    	    },
    	    fn: (body) => {
      	        return result;
    	    },
  	},
  	    update: {
    	        validator: (input: any) => {
      	            return true;
    	        },
    	        fn: (input: any) => {
      	            return input;
    	        },
  	    },
	},
  },
````
### Static structure
The structure of static is exactly the same as the structure of dynamic, except that it stores information in RAM and is usually used to store a parsed page of client-side apps. This has two advantages: first, if a page was supposed to send multiple requests to the dynamic structure, by storing its information in the static structure, we can receive this information by sending only one request to one of the keys set on the static structure models. Second, the stored information inside the static structure is stored in RAM so that it can be created, updated, deleted and retrieved more quickly.

The stored information inside the static structure is managed with an immutable state management.

Finally, the static structure acts as a cache layer, a layer whose information has an appropriate interaction with the actual data inside the database and can be easily updated and managed.

The structure of static is as follows:

````typescript
static: {
	"blogFirstPage": {
  		"get": {
    			"validator": (input: any) => {
      				return true;
    		},
    		"fn": (input: any) => {
      			return input;
    		},
  	},
  		"set": {
    			"validator": (input: any) => {
      				return true;
    		},
    		"fn": (input: any) => {
      			return input;
    		},
  	},
},
````
