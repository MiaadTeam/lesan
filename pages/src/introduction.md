# Introduction
Lesan is a collection of a [Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) and an `ODM` along with an idea to implement [microservices](https://www.ibm.com/cloud/learn/microservices).

In this framework, we tried to delegate data retrieval management to the client, inspired by the idea of [​​GraphQL](https://graphql.org/), without adding an extra layer (such as [GQL](https://en.wikipedia.org/wiki/Graph_Query_Language) language processors) on the client and server side. In addition, we use all the capabilities of [NoSQL](https://en.wikipedia.org/wiki/NoSQL) databases so that we can embed all the relationships of a schema within itself without involving the server-side programmer in managing the creation, retrieval, updating, and deletion of duplicated embeddings.

Meanwhile, we should have a regular structure (such as [SQL](https://en.wikipedia.org/wiki/SQL)) for data models in the `ODM` layer so that we can always validate the data.

We have also simplified the understanding of data structures for artificial intelligence so that we can manage the creation of duplicates in data by this intelligence.

Furthermore, we tried to provide the possibility of being movable for the data structure along with the functions written on the server side so that we can manage microservices more easily.

Finally, this data structure ( by the favor of fewer requests sent to the database) will also simplify the way [SSG](https://en.wikipedia.org/wiki/Static_site_generator) content is created.

# Benchmarks

![best-results](https://github.com/MiaadTeam/benchmark/assets/6236123/4146e561-55a3-4fd0-a6bb-61a37bb37532)
 
 We use this formula to calculate the difference : (B - A) ÷ A * 100  
 As you see on the chart:
 - [Lesan](https://github.com/MiaadTeam/lesan) return data to client `1168%` faster than the `prisma-express-rest`. Which uses `postgres` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) return data to client `1417%` faster than the `prisma-express-graphql`. Which uses `postgres` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) return data to client `4435%` faster than the `mongoose-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) return data to client `72289%` faster than the `mongo-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) return data to client `298971%` faster than the `mongoose-express-rest` (used sortby)

**Maybe we created the most performant framework in the world!** [see more detailed benchmark](https://github.com/MiaadTeam/benchmark)
