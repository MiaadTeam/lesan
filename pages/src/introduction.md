![Besmellah Allah Alrahman Alrahim](./img/besmelah.jpg)

# Introduction
**Lesan** is a collection of a [Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) and an `ODM` along with an idea to implement [microservices](https://www.ibm.com/cloud/learn/microservices).

In this framework, we tried to delegate data retrieval management to the `client`, inspired by the idea of [​​GraphQL](https://graphql.org/), without adding an extra layer (such as [GQL](https://en.wikipedia.org/wiki/Graph_Query_Language) language processors) on the `client` and `server` side. In addition, we use all the capabilities of [NoSQL](https://en.wikipedia.org/wiki/NoSQL) databases so that we can `embed` all the `relationships` of a schema within itself without involving the `server-side` programmer in managing the `creation`, `retrieval`, `updating`, and `deletion` of duplicated embeddings.

Meanwhile, we should have a regular structure (such as [SQL](https://en.wikipedia.org/wiki/SQL)) for data models in the `ODM` layer so that we can always `validate` the data.

Also, we have provided a new definition for creating `relationships` between `data`, which makes us fully master its details and do wonderful things with them. Read more aboit it [here](./what_is_the_relationship.md)

Furthermore, we tried to provide the possibility of being movable for the `data structure` along with the `functions` written on the `server` side so that we can manage microservices more easily.

Finally, this data structure (by the favor of fewer requests sent to the database) will also simplify the way [SSG](https://en.wikipedia.org/wiki/Static_site_generator) content is created.

In one sentence, **Lesan** may add a few to five hundred milliseconds to the `creation`, `update`, and `deletion` process, but it makes `reading` data fifteen to several hundred times faster.

# Benchmarks

<div class="animation-container">
  <section class="animation-item lesan">
    <span class="title">Lesan</span>
    <div class="details">
      <span class="chart"></span>
      <span class="time">0.130s</span>
    </div>
  </section>
  <section class="animation-item prisma-postgres">
    <span class="title">Prisma Postgres</span>
    <div class="details">
      <span class="chart"></span>
      <span class="time">1.649s</span>
    </div>
  </section>
  <section class="animation-item prisma-postgres-graphql">
    <span class="title">Prisma Postgres GraphQL</span>
    <div class="details">
      <span class="chart"></span>
      <span class="time">1.973s</span>
    </div>
  </section>
  <section class="animation-item mongoose-no-sort">
    <span class="title">Mongoose Not Sort</span>
    <div class="details">
      <span class="chart"></span>
      <span class="time">5.896s</span>
    </div>
  </section>
  <section class="animation-item mongoose-sort">
    <span class="title">Mongoose Sort</span>
    <div class="details">
      <span class="line"></span>
      <span class="chart"></span>
      <span class="time">94.106s</span>
    </div>
  </section>
</div>

 
 We use this formula to calculate the difference : (B - A) ÷ A * 100  
 As you see on the chart:
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `1168%` faster than the `prisma-express-rest`. Which uses `postgres` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `1417%` faster than the `prisma-express-graphql`. Which uses `postgres` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `4435%` faster than the `mongoose-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `72289%` faster than the `mongo-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `298971%` faster than the `mongoose-express-rest` (used sortby)

**Maybe we created the most performant framework in the world!** [see more detailed benchmark](https://github.com/MiaadTeam/benchmark)
