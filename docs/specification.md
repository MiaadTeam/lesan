# **Lesan** Specification:

> Standardizing the output through the use of "data modeling" based on NoSQL

The following documentation attempts to clarify the motivation behind the "Lesan".

## Design Philosophy:

The inital concept of "Lesan" was first conceived during a project using GraphQL. As you may already know, GraphQL deals with the data in a graph structure with a view to solving some limitation in REST APIs, namely "overfetch" and "underfetch".

The first design decision for "Lesan" was to introduce the idea of using functions/methods that we can declare to selectively return the amount and type of data.

Using "NoSQL" documents as the underpinning way to store large amount of data, a few utility interface models are specified for each entity in our model domain.

- inRelation: In order to minimize the number of queries to obtain a piece of information, some data are embedded in a document, for instance, a user can be saved within a blog document.
- outRelation: A document within a collection has the capacity to store 16MB of data, thus, in a specific context the data that you have chosen to embed might grow large enough to exceed this number.
  To proactively design our program to deal with this situation, a part of the data is stored within the document in the form of "paginate" as an embedded collection of data.
  The rationale behind this decision was that, in a example of a blog with comments, more often than not only a piece of the large number of comments is needed, so by stroing only a chunk of this data within a blog, we prevent unnecessary queries to retireve all the comments.
  -pureRelation: These are the properties that are native to a model

## Performance:

Due to the fact that the number of queries are minimized to the least number possible and having information stored as embedded piece of information, the number of aggregate queries are greatly reduced.

To shed some light on why this can happen, let's compare the number of queries for a real case scnenario.

In the first step, we have 1 query for both SQL and NoSQL, as the relations expands the number of queries in a SQL database increases dramatically; however, in our design we keep the queries in control by retrieving information in the most optimal fashion.

### Updating documents

Updating a field of a document could result in a cascade of updates in different relationships between different entities in our models. For instance, if a user decides to updates his name on his profile, his name must get updated in hundreds if not thousands of documents. In order to optimize this heavy and resouce-consuming operation a **\*Query Queue** is incorporated in "Lesan" which is capable of merging the relationship to make optimal update queries in the system.
