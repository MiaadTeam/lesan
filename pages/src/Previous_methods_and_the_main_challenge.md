# Previous methods and the main challenge

Many of the current structures for interacting with server-side applications require multiple requests to be sent to the server to receive a set of information related to each other. Also, due to the mismatch between the sent information and the customer’s needs, much of the sent information will be unused and will waste resources and bandwidth. The first problem is known as under-fetching, meaning that the received information is less than what is needed and requires a resend request to the server. This causes the number of server-responsive requests per unit time to decrease and its processing load to increase.

The second problem is known as over-fetching, meaning that the customer only needs a specific part of the information, but the server sends other data in a table regardless of their needs. This problem causes additional bandwidth occupation and increases data exchange time. Facebook has introduced a new concept called GraphQL to solve these problems to some extent. This idea is very creative and practical but also comes with problems and challenges.

![](https://lh3.googleusercontent.com/e8kqfRVjEZ9Dl3MaZv_8Iq7XddcvZweVOpgu_EvJrGCtRdsBV9wDHKbWlax_ogP8FRf3CJlr1QSVw9oLej4xsvATgH9tKAu5w76P6JU58Rt2JdwvNLEuNZYwNGKCT2h6sAWQIkzUdlgxD_BXhL5VS0k)

## GraphQL Problems

Given that GraphQL is a language for describing data models and how to request them, in addition to the implementation of the usual server program, there is also a need for a dedicated implementation of GraphQL. This violates one of the fundamental principles of programming, which is ["Don't repeat yourself" (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and forces developers to learn the descriptive language specific to GraphQL, which is GQL.

```typescript
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
