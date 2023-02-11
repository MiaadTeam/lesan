# In the name of God the compassionate the merciful

# Introduction

Lesan is a collection of a [Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) and an ODM along with an idea to implement [microservices](https://www.ibm.com/cloud/learn/microservices).

In this framework, we tried to leave the management of receiving data to the client, inspired by the idea of [​​GraphQL](https://graphql.org/) , without adding an additional layer (such as [GQL](https://en.wikipedia.org/wiki/Graph_Query_Language)) on the client or server side, in addition to using all the capabilities of [NoSQL](https://en.wikipedia.org/wiki/NoSQL) databases. To be able to embed all the relations of a schema within itself without involving the server-side programmer in managing the creation, reception, update and deletion of embedded duplicates.

At the same time, we should have a regular structure (such as [SQL](https://en.wikipedia.org/wiki/SQL)) for the data models in the ODM so that we can always validate the data.

We have also simplified the understanding of the data structure for artificial intelligence so that we can manage the repetitions created in the data by this intelligence.

And then we tried the data structure along with the functions written on the server-side have the possibility to move. So that we can manage the microservices more easily.

Also, this data structure (due to fewer requests sent to the database) will simplify the creation process of the [SSG](https://en.wikipedia.org/wiki/Static_site_generator) content.

# Receive data

One of the most critical challenges for implementing the ability to receive data in Lesan was when the client requested the dependencies of a table.

Let us review the previous methods before explaining Lesan's method.

### Previous methods and the main challenge

Many of the current architectures for interacting with server-side applications require multiple requests to be sent to the server to receive a set of related information. Also, due to the incompatibility of the transmitted information with the customer's needs, much of the sent information will be unused and cause a waste of resources and bandwidth. The first problem is known as under-fetching, that is, the received information is less than what is needed, and the request needs to be re-sent to the server. This will reduce the number of requests that can be answered by the server per unit of time. And its processing load will increase.

The second problem is known as over-fetching. That is, the client needs only a certain part of the information, but the server also sends other data in the same table regardless of its needs. This problem causes the occupation of additional bandwidth and increases the time of data exchange. To solve this problem, Facebook introduced a new concept called [GraphQL](https://graphql.org/), which solved the above problems. This idea was very creative and practical, but it also comes with problems.

![over-fetching](https://miro.medium.com/max/1396/0*HzeviPdGTku_f5Dr)

### GraphQL problems

Considering that GraphQL is a language for describing data models and how to request them, in addition to the usual implementation of the server program, a specific implementation for GraphQL is also needed. This case violates one of the fundamental principles of programming, namely ["Don't repeat yourself" (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). And it forces developers to learn the descriptive language unique to GraphQL , namely GQL .

```TypeScript
# This Book type has two fields: title and author
type Book {
 title: String  # returns a String
 author: Author # returns an Author
}

type Mutation {
 addBook(title: String, author: String): Book
}
```

After the description of the data model is done in GraphQL language, in order to send each request to the server, it is necessary to analyze descriptive texts, which also has a [processing overhead](https://en.wikipedia.org/wiki/Overhead_(computing)) .
![proccess gql](https://camo.githubusercontent.com/e31c0377b14b9744768cd473d11ff40a1176db3cb8008b9ef16d6225b4f60443/68747470733a2f2f6772617068716c2d656e67696e652d63646e2e6861737572612e696f2f6173736574732f6a736f6e326772617068716c2f6a736f6e32706f7374677265732d6772617068716c2e706e67)

One of the things handled in GraphQL is sending data along with their relationships. But the depth and type of relationships that are requested cannot be easily managed and this causes non-optimal requests to be sent to the server.

![graphql depth](https://apim.docs.wso2.com/en/4.0.0/assets/img/learn/graphql-depth-limitation.png)

GraphQL is a descriptive language with a general approach and is not optimized for any particular database. In fact, this tool has no vision of what implementation has been done in other structures, and no special optimization has been done on it.

Sending requests in GraphQL is not in the common and popular formats like JSON. And this factor makes sending requests complicated with many current tools.

The common standards of requests on the web platform have not been used and [new concepts](https://graphql.org/learn/queries/) such as query, mutation, etc have been created (this has advantages and disadvantages).

## Lesan's solution for how to communicate between the server and the client

The idea of connecting client-side nodes with the backend in Lasan is inspired by GraphQL. But we tried to make this communication simpler and more practical. So that we can solve the problems mentioned above.

To do this, we paid attention to the following two points:

1. Do not add any language to the client and server side. (such as the GQL language in GraphQL ).
2. Instead of implementing complex logic to filter the fields selected by the user, let's use the logic implemented inside the databases (here we mean MongoDB). Because the algorithms implemented in the databases are more comprehensive and optimal due to direct connection with the data.

## proposed method

Facing this challenge, we decided to go to NoSQL databases (especially MongoDB) and store all relationships in each table (in MongoDB we call them schema) in an embedded form.

We divided the relationships into two types: simple (inrelation) and complex or impossible (outrelation) for embedding. We saved the simple relations completely and the complex relations only the number that could be requested in the first request.

We entrusted the management of receiving data to the client in exactly the same way as defined by MongoDB, i.e. sending an object with a data key and a value of zero or one.

We allowed the customer to see all the models and functions written on each model and select them in the same sent object.

We allowed the client to see the output of each function written for each model, along with the exact amount of penetration into the depth of the relationships of that model, which was previously determined by the server-side programmer, in a type-safe manner, so that it can more easily create the sent object.

We created an ODM so that we can simplify the process of receiving data along with its relationships and also manage the repetitions created from embedded relationships within this ODM so that the server-side programmer writes less code.

We prioritized the validation of input data and created a process for the server-side programmer to create a validator for each function he writes on each model, so that we can run the validator before executing the function.

In this validator, the return data management along with the depth of penetration in the relationships of each model must be clearly defined.

Let us clarify the issue with an example:

Consider a schema for a table named country with the following fields:

```TypeScript
id;
name;
abb;
description;
geoLocation;
capital;
provinces;
cities;
```

And also a schema for the province with the following fields:

```TypeScript
id;
name;
abb;
description;
geoLocation;
center;
country;
cities;
```

And also a schema for the city with the following fields:

```TypeScript
id;
name;
abb;
description;
geoLocation;
country;
province;
```

The field capital in the country and center in the province are of the city type and we embed them completely. This form of relationship is a simple relationship and we call it inrelation, its type is singular and it is defined in this way in Lesan:

```TypeScript
countryInrelations = {
  capital: { schemaName: "city", type: "one", optional: false },
};
```

All the relations of the country do not end here. This schema is also related to the province and city. Now, with a simple question, we can complete the country's relations:

Is the number of provinces that we are going to keep in the country too many? (That is, if the database is SQL, do we store the key of the province inside the country?)

Answer: The number of provinces is limited and we can store all the provinces inside the country schema. So this relationship is also inrelation. Therefore, the above object should look like this:

```TypeScript
countryInrelations = {
  capital: { schemaName: "city", type: "one", optional: false },
  provinces: { schemaName: "province", type: "many", optional: true },
};
```

Another relationship we have in the country is the city, how do we define it?

There are many cities in a country and we cannot store all the cities in a country schema.

So this is a complex relationship with a high number, we define it as an outrelation, the process of defining it requires more information to know exactly what value and what data we are going to embed, we add that information in the sort key.

```TypeScript
countryOutrelation = {
  cities: {
    schemaName: "city",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};
```

We also define the rest of the country's fields, which are specific to it and are not related to any relationship, as pure fields:

```TypeScript
countryPure: { name: string(), abb: optional(string()), ... }
```

In the same way for the province:

```TypeScript
provinceInrelations = { center: { schemaName : "city", type: "one" }, country: { schemaName: "country", type: "one" }}
provinceOutrelation = { cities: { schemaName: "city", number: 50, sort: { field: " _id", order: "desc", type: "objectId"}}}
provincePure: { name: string(), abb: optional(string()), ... }
```

And for the city in the same way:

```TypeScript
cityInrelations = { country: { schemaName: "country", type: "one" }, province: { schemaName: "province", type: "one" } }
cityOutrelation = {}
cityPure: { name: string(), abb: string() , ... }
```

If you pay attention, every relation that is kept as inrelation in a schema, the related schema has also stored this schema as outrelation.

It is worth noting that we save this form of defining schemas in the integrated runtime in an object called Schemas. We will discuss its structure further. But what is stored in the database is the initial form that we showed earlier. It means for the country:

```TypeScript
id;
name;
abb;
description;
geoLocation;
capital;
provinces;
cities;
```

The amount of pure fields is known. And the value of the fields that are of the relation type of schemas will be in the form of objects of the pure type of that relation. That is, for example, for the country:

```TypeScript
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
```

Now the user can filter and receive all the fields of a schema along with the first depth of its relations by sending only one request to the database.

This request is done according to the [projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/) process in MongoDB based on whether the field values are one or zero. Without our work framework interfering in this process. And we have written an additional layer to filter the requested fields in it. (The process and form of this request will be explained later.)

If the following fields are requested from the schema of a country in a request. Not only with a single request to the server but also with a single request to the database, all requested information will be received and returned to the user:

```TypeScript
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
```

What if the user penetrates deeper than one level? That is, to request the country, it should request the provinces and its cities from within the provinces. As in the following example:

```TypeScript
getCountry → id: 1
              name : 1
		  abb : 1
		  description : 1
		  capital → id : 1
                  name : 1
			abb : 1
		  provinces → id :1
                  name : 1
			description : 1
			cities → id : 1
				name : 1
				description : 1
		  cities → id : 1
                  name : 1
			abb : 1
```

Before we describe Lesan's framework solution, let's examine what happens in SQL databases:

- First of all, we make a query to find the country, because we have the country ID, we make an indexed query.
- After that, we make a query to find the capital, because we have stored its ID in the country, we make an indexed query.
- Then we send a query to find the first paginate of the provinces, if we have stored the ID of all the provinces of a country in it, we make an indexed query. If not, we should send a non-index query with the found country ID filter.
- In the following, for example, if we had found 35 provinces for the first paginate. We have to send a non-index query for each of them with province ID filter on city. and find the first paginate of the cities for each of the provinces. (for example, 50 numbers for each province, that is, 50 times 30)
- Finally, to find the first paginate of cities for this country, we must send a non-indexed query with the found country ID filter on the city table.

You saw that the process was very complicated in SQL, now let's see how the same process goes in Lesan:

In the previous section, we mentioned that in order to get the country along with the first depth of its relationships (i.e. capital, states and cities), we just send an indexed query to the country schema and get all the information.

Now we only need to get the city information for each province.

For this, while we have the information of the provinces, we send an indexed query to get the provinces again.

Because of the concept of outrelation, we are sure that the information of the cities is stored inside the provinces. That's why we will receive the information of the cities when we receive the provinces again.

This will have two advantages for us. First, instead of a non-index query to city, we send an index query to province, because we have received the IDs of the provinces in the first query. And the second advantage is that instead of receiving a large number of cities, we have received only a few provinces. (For example, in SQL, the number of documents requested from the database is equal to 1 + 1 + (35 * 50) + 50. But in Amir's method, only 1 + 35 documents are requested.)

Now imagine what would happen if more depth and relationships were requested? This is the Achilles' heel of projects written with GraphQL.

## Why duplicate data?

As you can see in the example above, if we can store all the dependencies of a table inside it, we will significantly reduce the number of requests sent to the database. This number is remarkably large. For example, in one of the best cases, if we have a table with 10 dependencies, each dependency is dependent on 10 other tables and all relationships are many to many. If we want to receive a list of 50 of that table with 2 levels of penetration in its relations with a signle request. In SQL, it should be: 50 * 10 * 50 * 10, which is equivalent to 250,000 (two hundred and fifty thousand) sending requests to the database. But in Lesan, all these data are collected with only 50 x 10, which is equivalent to 500 requests sent to the database.

### Ratio of creating and updating to receiving data

Imagine a news site, for the data of this news site we need a table for the author of the content and a table for the written news. Usually, the name and some information of the author of that news is included at the end of each news. If we embed the information we need for the author of the news into the news itself when creating the news, we don't need to send a separate request to the database to get the author's information when reading each news. But the problem arises when the news author updates his information. For example, change his name from John to John Smith. In this case, we have to update all the news written by that author. If this author has written an average of 10 news per day, and has been working on this news website for more than 5 years, at least: 10 * 365 * 5, i.e. 18,250 documents in the database must be updated. Is this work cost-effective? In general and in most cases, it can be cost-effective. Because usually the news may be read more than several thousand to several million times every day, and on the other hand, each author changes his information only once a year. So updating 18,250 documents once a year is much cheaper than reading data millions of times from two different tables in one day.

### Queuing data changes

The next point is the order of updating the documents. In the same example above, we can divide the document update into several parts according to different cases. For example, we can update the newer news (for example, the last 2 months) in real time and put the older news in a queue for updating. For this purpose, in Amir, we have created an entity called Query Queue or QQ, which is an object of all the commands that are supposed to be sent to the database to change the data.

The existence of this object allows us to manage updates.For example, if there are going to be several million updates, we break it into smaller parts. Due to the amount of server hardware resources involved, we send a small part to the database for updating. We will check the server's hardware resources again, if the server is still not involved in heavy processing, we will send another part for updating.

In this queue, in addition to dividing the number of requests, we can also reduce this number by comparing the changes.For example, the author above changed his name once from Ali to Ali Akbar and once again in a few hours later changed his interests from study to study and sports. Now we have two commands to change the data that can be sent to the database together. So we can merge these requests together and then send them.

If we consider this queue as a container for storing data change commands, we can also use it to verify the sameness of the repeated data, and if for any reason any part of the data encounters problems by using this container, those bugs can be found and corrected.

We can also use artificial intelligence to manage changes in this queue, which will be explained in the related section.

### CSR, SSR or SSG content

Usually, content on the Internet is divided into three sections: CSR or Client side rendering, SSR or Server side rendering, and SSG or Static site generation. CSR content is usually created by JavaScript frameworks on the client side, so search engines cannot easily understand them, SSR content is processed on the server side and is highly comprehensible to search engines. But to create this content, the server must be involved in their processing every time, and finally, the best content to publish on the web platform is SSG content, because search engines can fully understand them, and the server will not be involved in their data processing. Static content can be placed on CDNs (content delivery network) and requests to receive this content can be returned from the storage location on the network before it reaches the server. To understand the popularity of SSG content, you can refer to famous JavaScript frameworks such as Gastby and NextJS.

One of the biggest challenges for creating SSG content is the complexity of data models. As the number of requests to receive data to the database increases, the amount of content that can be converted into SSG decreases. Because to create SSG content, the amount of requests to the database must be zero in order to produce a static content.

Lesan has also simplified the conditions for creating SSG content by reducing the number of requests to the database. On the other hand, by dividing the content into two parts, dynamic and static, and creating a in-memory database that is managed by processes similar to Redux, it has focused more on the processes of creating and requesting SSG content.

In addition, Lesan, being aware of data changes, updates the content of SSG only when a data has changed. Unlike the process that is usually used in NextJS or Gastby due to not being aware of data changes, time periods are used to create and update SSG content. In this way, they set a certain time in advance to generate SSG content (for example, one day) and when that time is over with the first request for SSG content, they send a request to the server to receive the content again and convert to SSG and repeat the same process again. This cycle has two major drawbacks: First, the data may not have changed and a processing process may be unnecessarily imposed on a server, which will cause problems if the number of requests on the server increases. And the second problem is that it is possible that some content on the server changes and that content needs to be updated quickly everywhere, including the places where the SSG content is stored, but in the current processes, we have to wait until the time we set in advance is over. and send a request to the server again to update the SSG content.

Going back to the news agency example, if this website plans to convert its news into SSG content, it will face both of the above problems. On the other hand, for many news items that have not changed, the process of generating SSG content may be done, which creates an unreasonable processing load for the server. And on the other hand, news may have been mistakenly converted into SSG content, and the news agency wants to delete this news immediately, but we have to wait until the end of the set time to destroy the generated SSG content. Also, someone must request this news after the end of this time. For these two simple reasons, many websites prefer to process their content as SSR. But what if we could do the SSG content creation process only when the data in the main database changes? This can be done easily with Lesan.

### Penetration in the depths {#penetration-in-the-depths}

The next issue is how to penetrate deep. In GraphQL, you have very complex solutions to manage it, Lesan's solution to solve this problem is as follows (in Lesan, the start of a project will be like this):

- First of all, we create an app with the Lesan framework, for example (this example is written in TypeScript language):

  ```TypeScript
  const ecommerceApp = lesan();
  ```

- We write the model we want for the software with the pure-inrelation-outrelation method and add it to our ODM application. In this way (for countries and cities, consider the same information as in the above example):

  ```TypeScript
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
  ```
- Now we create a function for this model and add it to the actions of our application (in fact, this action is provided to the user on the client side to call it) like this:

  ```TypeScript
  const addStateFn: ActFn = async (body) => {
    const {
      set: { name, enName, countryId, geometries },
      get,
    } = body.details;

    const inState = await states().insertOne({
      name,
      enName,
      geometries,
    }, { country: new ObjectId(countryId) });
    return Object.keys(get).length != 0
      ? await states().findOne({ _id: new ObjectId(inState) }, get)
      : { _id: inState };
  };
  ```

- Now we write a validator for this function as follows:

  ```TypeScript
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
  ```

- As you can see, addState function validator has an object with set and get keys. The set key is used for information that we need to add state, and as you saw in addStateFn, this information is used. But the get key value is what we need to penetrate deep. This value must be an object of a model that accurately specifies the amount of penetration in each of the relations of that model for the validator of a function (here the addStateFn function). Here the get key is generated by a function called selectStruct. This function contains two inputs. The first input is the name of the model for which we want to generate this object, and the second input specifies the depth of each relationship. The second input can be a number like 2 or an object. The keys of this object must be the names of the relations of the selected model, and its value can be a number or an object of the relations of that key. As :

  ```TypeScript
  { country : { state: 2 }, cities: 1 }
  ```

As a result, an object will be produced as follows:

```TypeScript
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
```

This object is used to verify the data sent from the client side to the server. With this method, we have accurately and separately determined the amount of depth penetration for each function. If you pay attention, the get key is made exactly like the projection in mongodb, and after validation, we send the same object to the database without changes to receive the data. In addition, we can inform the client side user about the details of all requests written on the server side. As a result, on the client side, even before sending the request, we can understand what information should be sent and what information we can receive. Finally, we add this function and validator to our software with the setAct function.

```TypeScript
ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "state",
  fn: addStateFn,
  actName: "addState",
  validator: addStateValidator(),
});
```

## Microservice {#microservice}

### Microservice process implementation

There are different processes in the world to implement microservices. But in general, each service should have its own separate and unique logic and data model with minimal dependence on other services, so the team working on each service can independently think about its software development.

But finally, all services want to send or receive information to other services. If the data models are very different from each other, separate logic must be written to coordinate each data. In some microservice development models, it is preferred that the data model designed for services be as unified and identical as possible, because different services can have many common features.

Take an ERP for example. We have a service for accounting, a service for storage, and a service for the store. All three of these services deal with an entity called a product. Changing the product availability in each of these services affects the other service as well. Thus, if a product is sold, the warehouse must be informed of its sale so that it can replace it in the store on time, and accounting must have the sales information to be able to do the accounting work. As a result, if the product availability is integrated in all three services, it will be easier to write the server side logic. In this type of microservice development, there is usually a senior programmer who knows about all three services and designs their model. This procedure will slightly reduce the independence of the services, but in the end it will create less trouble for development.

Another problem that occurs in microservices is the lack of data coordination. Take the same example of ERP, if an item is sold but not registered in the accounting service or removing the goods from the warehouse but not registered in the store, it will cause data inconsistency. To reduce these inconsistencies, a tool called message broker is suggested. With the help of this tool, all messages that are supposed to be exchanged between two services are sent to an independent service and stored there, and if a service does not work properly, the messages will not be lost, and as a result, the data will always remain integrated and coordinated.

The next issue in microservices is the distribution of hardware resources on the server side. If we have many services, managing the hardware processing these services will be complicated and we need many tools to analyze the requests so that we can know the amount of hardware resources involved when each piece of written code is executed. In addition, exchanging messages between services is an additional processing load that must be done. Also, the repetitions created from the data, in addition to the additional space required for storage, also require writing parallel logics, because each logic processes separate data separately. But the main problem in processing load distribution occurs when it is divided horizontally. If the data is integrated in one place, it will be easy to manage the distribution of the processing load, but when each service has its own database and processing load and at the same time needs the data of other services, the distribution of the processing load for it will need to consider these dependencies. Due to the limitations of vertical distribution, it will be necessary to remove the obstacles of horizontal distribution. Lesan provides small solutions for implementing microservices that can reduce the complexity of their implementation. It also proposes a new process that has an architecture between microservice and monolith, which will be explained later.

## Lesan's solution

As mentioned in the above section, Lesan is a set of models and actions created for those models. But in fact, these models are embedded in another object called contentType (data type). contentType contains two other objects named dynamic and static (it will be explained about these two objects later). The contentType itself is embedded in another object named main or any other service that is active in this process. All the information in the main key can be obtained with the getMainActs function. All the functions that we create with the setAct function are stored in the main object by default. But there is another function called setService. Using this function, we can add another service to our project. After adding the new service, we can access it by sending an object from the client side that has the service key. The setService function has two inputs: the first input is the name of the service and the second input can be received in two ways:

- in the form of a string that is actually the access address to another service.
- as another object, which is actually the output of the getMainActs function in another service.

If the second input is a string, http or grpc methods are used to communicate with it, and if it is an object, that other service will be added as a plugin on the current service. As a result, we can simultaneously manage a project both as a [monolith](https://www.geeksforgeeks.org/monolithic-vs-microservices-architecture/) and as a microservice.

## A proposal for microservice (an architecture between microservice and monolith)

To create a model in Amir, it can be expanded based on another model so that it has nothing more than that and can only have a number of its keys. Therefore, it is possible to create a database for all services along with all models that these models have all the necessary keys in all services. Next, each service should define its model separately based on the integrated database model and take some of the keys it needs from that main model. According to the way the models are written in Lesan (implementation of the model based on a schema validator), it is possible to have a common database at the same time, and each service can validate its data separately based on the extended model of the comprehensive and original model. It is also possible to move the models and writing actions in Lesan, and you can easily have the database of each service separately or integrated with the rest of the services at the same time. On the other hand, NoSQL databases are usually without schema and you can easily give any form to the data in the database. And Lesan is currently developed based on MongoDB. If we can fit all the service models in a comprehensive database, we can avoid data duplication, and we will not need to write parallel logic to manage this duplication. In addition, we no longer need synchronization tools or writing separate logics for data synchronization. And finally, we can take advantage of the ease of horizontal distribution of NoSQL databases, without having to worry about data integrity. Consider the following example:

Suppose we have several services called core - ecommerce - blog, etc., all of which have a model for users called user. We can create a user model that has all the fields of all these services and share it between all services, like this:

```TypeScript
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
```

Now, for example, we create a user model for e-commerce and write its fields in such a way that it does not have anything more than the shared user model, like this:

```TypeScript
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
```

Now we can connect several services to a common database at the same time as they continue to work independently, while validating data schemas for each service works independently and only understands its own data. You can see a complete example of this type of microservice implementation [here](https://github.com/MiaadTeam/lesan/tree/main/examples/microservice).

# Artificial intelligence

As explained above (in the section Why Data Repetition), Amir will use machine learning to manage the repetitions created in the data.In this way, weight is given to each content according to different criteria, and if a request to update that content is registered in QQ, according to the weight of the content, the changes are sent to the database to be applied. These weights can be the amount of feedback of the content, the amount of its being shared, the amount of dependencies it has or the dependencies that other contents have on it, the time of content creation, whether the content is related to the public or an individual, and so on.

Artificial intelligence and machine learning can also be used to integrate and unify commands within QQ. So that if there are several requests to update a schema, we can find and merge them together.

AI suggestions can be used to optimize the data model to better manage how dependencies are embedded. to minimize the amount of processing and the speed of receiving information.
