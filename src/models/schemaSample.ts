// const schemasSample = {
//   "user": {
//     pure: {
//       "id": string(),
//       "name": string(),
//       "age": number(),
//     },
//     inrelation: {
//       "posts": { schemaName: "post", type: "many" },
//     },
//     outrelation: {
//       "comments": {
//         schemaName: "comment",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "posts": array({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//       "comments": array({
//         "id": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       object({
//         "posts": array({
//           "id": string(),
//           "title": string(),
//           "content": string(),
//         }),
//         "comments": array({
//           "id": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
//   "post": {
//     pure: {
//       "id": string(),
//       "title": string(),
//       "content": string(),
//     },
//     inrelation: {
//       "user": { schemaName: "user", type: "one" },
//     },
//     outrelation: {
//       "comments": {
//         schemaName: "comment",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "user": object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       "comments": array({
//         "id": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//       object({
//         "user": object({
//           "id": string(),
//           "name": string(),
//           "age": number(),
//         }),
//         "comments": array({
//           "id": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
//   "comment": {
//     pure: {
//       "id": string(),
//       "content": string(),
//     },
//     inrelation: {
//       "user": { schemaName: "user", type: "one" },
//     },
//     outrelation: {
//       "post": {
//         schemaName: "post",
//         number: 50,
//         sort: { filed: "id", order: "desc" },
//       },
//     },
//     embedded: {
//       "user": object({
//         "id": string(),
//         "name": string(),
//         "age": number(),
//       }),
//       "post": object({
//         "id": string(),
//         "title": string(),
//         "content": string(),
//       }),
//     },
//     sttuct: assign(
//       object({
//         "id": string(),
//         "content": string(),
//       }),
//       object({
//         "user": object({
//           "id": string(),
//           "name": string(),
//           "age": number(),
//         }),
//         "post": object({
//           "id": string(),
//           "title": string(),
//           "content": string(),
//         }),
//       }),
//     ),
//   },
// };
