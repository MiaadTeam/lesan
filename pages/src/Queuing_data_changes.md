# Queuing data changes

## QQ
We faced a problem with repeated data `updates` and said that we have created a process to send data to smaller parts for `updates` in different `time periods`. In the same example of the `news agency` mentioned above, we can divide document updates into several sections based on different criteria. For example, we can update `newer news` (e.g., the past 2 months) immediately and put `older news` in a `queue` for updating. For this purpose, we have created an entity language called `Query Queue` or `QQ`, which is an object of all commands that are to be sent to the `database` for data change.

The existence of this object allows us to manage `updates`. For example, if there are `millions` of updates to be made, we divide them into smaller parts. Depending on the amount of server `hardware resources` involved, we send a small part for updating to the database. We check the server `hardware resources` again and if the server is not involved in heavy processing, we send another part for updating.

In this classification, in addition to dividing the number of requests, we can also reduce the number of requests by `comparing changes`. For example, the `author` above changed his name from `Ali` to `Ali Akbar` once and changed his interests from `reading` to `reading and sports` a few hours later. Now we have `two` commands for data modification that can be sent to the database together. Therefore, we can `merge` these requests and then send them.

If we consider this classification as a compartment for `storing` data modification commands, we can also use it to verify the `consistency` of repeated data. And if for any reason any part of the data encounters problems, we can use this compartment to `find` and `correct` those problems.

We can also use `artificial intelligence` to manage changes in this `queue`, which will be explained in the relevant section.

## in-memory DB
Document is comming soon ...

