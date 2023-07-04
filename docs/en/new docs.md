---


---

<h2 id="introduction">Introduction</h2>
<p>Lesan is a collection of a <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server">Web Server</a> and an ODM along with an idea to implement <a href="https://www.ibm.com/cloud/learn/microservices">microservices</a>.</p>
<p>In this framework, we tried to delegate data retrieval management to the client, inspired by the idea of <a href="https://graphql.org/">​​GraphQL</a>, without adding an extra layer (such as <a href="https://en.wikipedia.org/wiki/Graph_Query_Language">GQL</a> language processors) on the client and server side. In addition, we use all the capabilities of <a href="https://en.wikipedia.org/wiki/NoSQL">NoSQL</a> databases so that we can embed all the relationships of a schema within itself without involving the server-side programmer in managing the creation, retrieval, updating, and deletion of duplicated embeddings.</p>
<p>Meanwhile, we should have a regular structure (such as <a href="https://en.wikipedia.org/wiki/SQL">SQL</a>) for data models in the ODM layer so that we can always validate the data.</p>
<p>We have also simplified the understanding of data structures for artificial intelligence so that we can manage the creation of duplicates in data by this intelligence.</p>
<p>Furthermore, we tried to provide the possibility of being movable for the data structure along with the functions written on the server side so that we can manage microservices more easily.</p>
<p>Finally, this data structure ( by the favor of fewer requests sent to the database) will also simplify the way <a href="https://en.wikipedia.org/wiki/Static_site_generator">SSG</a> content is created.</p>
<h2 id="receive-data">Receive data</h2>
<p>One of the biggest challenges for implementing data retrieval capability in Lesan was when the customer requested dependencies of a table with more than two levels of penetration in depth.</p>
<p>Let us review the previous methods before explaining Lesan’s method.</p>
<h3 id="previous-methods-and-the-main-challenge">Previous methods and the main challenge</h3>
<p>Many of the current structures for interacting with server-side applications require multiple requests to be sent to the server to receive a set of information related to each other. Also, due to the mismatch between the sent information and the customer’s needs, much of the sent information will be unused and will waste resources and bandwidth. The first problem is known as under-fetching, meaning that the received information is less than what is needed and requires a resend request to the server. This causes the number of server-responsive requests per unit time to decrease and its processing load to increase.</p>
<p>The second problem is known as over-fetching, meaning that the customer only needs a specific part of the information, but the server sends other data in a table regardless of their needs. This problem causes additional bandwidth occupation and increases data exchange time. Facebook has introduced a new concept called GraphQL to solve these problems to some extent. This idea is very creative and practical but also comes with problems and challenges.</p>
<p><img src="https://lh3.googleusercontent.com/e8kqfRVjEZ9Dl3MaZv_8Iq7XddcvZweVOpgu_EvJrGCtRdsBV9wDHKbWlax_ogP8FRf3CJlr1QSVw9oLej4xsvATgH9tKAu5w76P6JU58Rt2JdwvNLEuNZYwNGKCT2h6sAWQIkzUdlgxD_BXhL5VS0k" alt=""></p>
<h3 id="graphql-problems">GraphQL problems</h3>
<p>Given that GraphQL is a language for describing data models and how to request them, in addition to the implementation of the usual server program, there is also a need for a dedicated implementation of GraphQL. This violates one of the fundamental principles of programming, which is <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">“Don’t repeat yourself” (DRY)</a>, and forces developers to learn the descriptive language specific to GraphQL, which is GQL.</p>
<pre class=" language-typescript"><code class="prism  language-typescript"># This Book <span class="token keyword">type</span> has two fields<span class="token punctuation">:</span> title and author  
<span class="token keyword">type</span> Book <span class="token punctuation">{</span>  
title<span class="token punctuation">:</span> String # returns a String  
author<span class="token punctuation">:</span> Author # returns an Author  
<span class="token punctuation">}</span>  
  
<span class="token keyword">type</span> Mutation <span class="token punctuation">{</span>  
<span class="token function">addBook</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> String<span class="token punctuation">,</span> author<span class="token punctuation">:</span> String<span class="token punctuation">)</span><span class="token punctuation">:</span> Book  
<span class="token punctuation">}</span>
</code></pre>
<p>After the data model is described in GraphQL, for each request sent to the server, there is a need to parse and analyze the descriptive texts, which also has overhead processing.</p>
<p>One of the things that is managed in GraphQL is sending data along with their relationships. However, the depth and type of relationships requested are not easily manageable, which causes non-optimal requests to be sent to the server.</p>
<p><img src="https://lh3.googleusercontent.com/S9I5sW06-vEr5kaiIrnY62bK0Lhjicez34hrY-DRT6Mf_ihUzb5MsV6C0JYQ2fsuo35gXMVx2qOxR6KaIpZ-XXsJfKw-ZmnCnBWyq1tFS1icNJYTJjpHKfbESOE82hgScy7ZdnKhdy-2il3-r07Jnj8" alt=""><br>
GraphQL is a general-purpose descriptive language and has not been optimized for a specific database. In fact, this tool has no view of what implementation has been done in other structures and certainly no specific optimization has been made on it.</p>
<p>Sending a request in GraphQL is not in common and popular formats such as JSON, and this factor makes sending a request with many current tools a complex matter.</p>
<p>Also, in GraphQL, the common standards for requests have not been used on the web and new concepts such as query, mutation, etc. have been created (this has both advantages and disadvantages).</p>
<h3 id="lesans-solution-for-how-to-communicate-between-the-server-and-the-client">Lesan’s solution for how to communicate between the server and the client</h3>
<p>The idea of connecting client-side nodes to the backend in Lesan is inspired by GraphQL, but in Lesan we tried to make this connection simpler and more practical so that we can solve the problems mentioned above.</p>
<p>We focused on three points to do this:</p>
<ol>
<li>
<p>We do not add any language to the client and server (such as GQL language in GraphQL).</p>
</li>
<li>
<p>Instead of implementing complex logic to filter fields selected by the user, we use the logic implemented within databases (here Aggregation in MongoDB). Because algorithms implemented within databases have more scalability and efficiency due to direct data communication.</p>
</li>
<li>
<p>We store all relationships in data as embedded to reduce the amount of requests sent to the database.</p>
</li>
<li>
<p>Let’s create descriptive information for different types of data and how they are embedded in server-side logic so that we can create more efficient data models in the NoSQL style. We can also simplify data management in the database without changing the information.</p>
</li>
</ol>
<h3 id="proposed-method">Proposed Method</h3>
<p>In the first step, we tried to organize the data structure because we intended to use NoSQL databases and at the same time we needed to have structured data like SQL both at runtime and during development to simplify the management of embedded data as much as possible.</p>
<p>We divided the relationships into two types of simple (inrelation) and complex or impossible (outrelation) for embedding. We stored simple relationships completely and stored complex relationships only in the number that could be returned in the first request (first pagination).</p>
<p>We exactly left the data retrieval management to the client as MongoDB had defined it, that is, sending an object with a key (data name) and a value (0 or 1) to the client.</p>
<p>We found a creative way to produce Aggregation Pipelines in MongoDB so that fewer documents are requested when receiving data as much as possible.</p>
<p>We allowed the client to see all the models and functions written on each model and choose them in the same object sent.</p>
<p>We allowed the client to see the output of each function written for each model along with the exact depth of its relationships that had previously been determined by the server-side programmer in a type-safe manner to make it easier to create the sent object.</p>
<p>We created an ODM to simplify the process of receiving data along with its relationships and also to manage the repetitions created from embedded relationships within this ODM so that the server-side programmer writes less code.</p>
<p>We prioritized input data validation and created a process for the server-side programmer to create a validator for each function written on each model so that we can run that validator before executing the function. In this validator, recursive data management along with the depth of penetration into the relationships of each model must be explicitly specified.</p>
<p>Let us clarify the issue with an example:<br>
Let’s consider a schema named country with the following fields:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">id  
name  
abb  
description  
geoLocation  
capital  
provinces  
cities
</code></pre>
<p>And also a schema for the province with the following fields:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">id  
name  
abb  
description  
geoLocation  
center  
country  
cities
</code></pre>
<p>And also a schema for the city with the following fields:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">id  
name  
abb  
description  
geoLocation  
country  
province
</code></pre>
<p>The capital field in the country and the center field in the province are of type city and we completely embed them. This form of relationship is a simple relationship and we call it inrelation, which ultimately is a single object of the pure city fields (inrelations can also be multiple and be an array of objects) which is defined as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">countryInrelations <span class="token operator">=</span> <span class="token punctuation">{</span> capital<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span> optional<span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre>
<p>All country relationships do not end here. This schema also has a relationship with the province and city. With one simple question, we can complete the country’s relationships:</p>
<p>Is the number of provinces that we are going to keep inside the country too high? (i.e., if it is an SQL database, do we store the province key inside the country?)</p>
<p>Answer: No, the number of provinces is limited and we can store all provinces inside the country schema. So this relationship is also inrelation. Therefore, the above object should be created in this way:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">countryInrelations <span class="token operator">=</span> <span class="token punctuation">{</span> capital<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span> optional<span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> provinces<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"province"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"many"</span><span class="token punctuation">,</span> optional<span class="token punctuation">:</span> <span class="token keyword">true</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre>
<p>Another relationship we have in the country is the city, how do we define it?</p>
<p>There are many cities in a country and we cannot store all the cities in a country schema.</p>
<p>So this is a complicated relationship with a large number, we define it as outrelation that the process of defining it requires more information to know exactly what amount and what data we are going to embed, we add that information in the sort key.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">countryOutrelation <span class="token operator">=</span> <span class="token punctuation">{</span> cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre>
<p>We also define the remaining fields of the country that are specific to it and are not related to any relationship as pure fields.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">countryPure<span class="token punctuation">:</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre>
<p>For the province, it is the same way:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">provinceInrelations <span class="token operator">=</span> <span class="token punctuation">{</span> center<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName <span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> country<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>  
provinceOutrelation <span class="token operator">=</span> <span class="token punctuation">{</span> cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> field<span class="token punctuation">:</span> <span class="token string">" _id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>  
provincePure<span class="token punctuation">:</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre>
<p>And for the city, it is the same way:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">cityInrelations <span class="token operator">=</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> province<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"province"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>  
cityOutrelation <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>  
cityPure<span class="token punctuation">:</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre>
<p>If you pay attention, every relation that is kept as inrelation in a schema, the related schema has also stored this schema as outrelation.</p>
<p>It is worth noting that we save this form of defining schemas in the integrated runtime in an object called Schemas. We will discuss its structure further. But what is stored in the database is the initial form that we showed earlier. It means for the country:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">id  
name  
abb  
description  
geoLocation  
capital  
provinces  
cities
</code></pre>
<p>The amount of pure fields is known. And the value of the fields that are of the relation type of schemas will be in the form of objects of the pure type of that relation. That is, for example, for the country:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"iran"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"ir"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"a big country in asia"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>  
capital <span class="token punctuation">:</span> <span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"tehran"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"th"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"the beautiful city in middle of iran"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
provinces <span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"tehran"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"th"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"one of the irans provinces"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
  
id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"hamedan"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"hm"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"one of the irans provinces"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token operator">...</span> til to end <span class="token keyword">of</span> the provinces  
<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  
cities <span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"tehran"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"th"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"the beautiful city in middle of iran"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
Id<span class="token punctuation">:</span> <span class="token string">"234fwee656"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"hamedan"</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token string">"hm"</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token string">"one of the irans cities"</span><span class="token punctuation">,</span>  
geoLocation <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">]</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token operator">...</span> til to end <span class="token keyword">of</span> the <span class="token keyword">number</span> limit <span class="token keyword">for</span> the first paginate  
<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre>
<p>Now the user can filter and receive all the fields of a schema along with the first depth of its relations by sending only one request to the database.</p>
<p>This request is performed based on the process of projection in MongoDB according to the values of fields being one or zero. Without our framework having any involvement in this process. And without us writing an additional layer to filter the requested fields in it. (The process and form of this request will be explained later.)</p>
<p>If the lower fields of a country’s schema are requested in a request, not only all the requested information will be received and returned to the user with one request to the server but also with one request to the database.</p>
<p>If the following fields are requested from the schema of a country in a request. Not only with a single request to the server but also with a single request to the database, all requested information will be received and returned to the user:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">getCountry → id<span class="token punctuation">:</span> <span class="token number">1</span>  
Name<span class="token punctuation">:</span> <span class="token number">1</span>  
abb<span class="token punctuation">:</span> <span class="token number">1</span>  
decsription<span class="token punctuation">:</span> <span class="token number">1</span>  
capital → id<span class="token punctuation">:</span> <span class="token number">1</span>  
name<span class="token punctuation">:</span> <span class="token number">1</span>  
abb <span class="token punctuation">:</span> <span class="token number">1</span>  
provinces → id <span class="token punctuation">:</span><span class="token number">1</span>  
name <span class="token punctuation">:</span>  
description <span class="token punctuation">:</span> <span class="token number">1</span>  
cities → id <span class="token punctuation">:</span> <span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
abb <span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre>
<p>If a user penetrates more than one level of depth, what should be done? For example, if they request provinces for a country, they may also want its cities from within the provinces.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">getCountry → id<span class="token punctuation">:</span> <span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
abb <span class="token punctuation">:</span> <span class="token number">1</span>  
description <span class="token punctuation">:</span> <span class="token number">1</span>  
capital → id <span class="token punctuation">:</span> <span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
abb <span class="token punctuation">:</span> <span class="token number">1</span>  
provinces → id <span class="token punctuation">:</span><span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
description <span class="token punctuation">:</span> <span class="token number">1</span>  
cities → id <span class="token punctuation">:</span> <span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
description <span class="token punctuation">:</span> <span class="token number">1</span>  
cities → id <span class="token punctuation">:</span> <span class="token number">1</span>  
name <span class="token punctuation">:</span> <span class="token number">1</span>  
abb <span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre>
<p>Let’s examine what happens in SQL databases before we explain the Lisan framework solution:</p>
<ul>
<li>
<p>First of all, we run a query to find the country, because we have the country ID, we run an indexed query.</p>
</li>
<li>
<p>Then we send a query to find the first paginate of provinces. If we have stored the ID of all the provinces of a country inside it, we run an indexed query. Otherwise, we must send an unindexed query with the country ID filter found.</p>
</li>
<li>
<p>Continuing with the example, if we had found 35 of the first paginate provinces. We should send a non-index query with a province ID filter for each one on each city and find the first paginated cities for each of the provinces. (For example, 50 for each province, which means 50 times 30)</p>
</li>
<li>
<p>Finally, to find the first paginate cities for this country too, we need to send a non-index query with the ID filter of the found country on the city table</p>
</li>
</ul>
<p>You saw that the process was very complicated in SQL, now let’s see how the same process is done in Lesan .</p>
<p>In the previous section, we mentioned that to get a country along with the first depth of its relationships (i.e., capital, states, and cities), we only send an indexed query to the schema of the country and receive all the information.</p>
<p>Now we only need to receive information about cities for each province.</p>
<p>To do this, while we have access to the information of the provinces, we send an indexed query to receive the provinces again.</p>
<p>Because of the concept of outrelation, we are sure that the information of cities is stored within provinces. Therefore, by receiving the provinces again, we will also receive the information of cities.</p>
<p>This will have two advantages for us. First, instead of sending a non-index query to the city, we send an index query to the province because we have received the province IDs in the first query.The second advantage is that instead of receiving a large number of cities, we have only received a few provinces. (For example, in SQL, the number of requested documents from the database is equal to 1 + 1 + (35 * 50) + 50. But in the Lesan method, only 1 + 35 documents have been requested.)</p>
<p>Now imagine what would happen if more depth and relationships were requested? This is the Achilles’ heel of projects written with GraphQL.</p>
<h3 id="why-duplicate-data">Why duplicate data?</h3>
<p>As you noticed in the above example, if we can store all the dependencies of a table inside it, we can significantly reduce the number of requests sent to the database. This number is remarkably large. For example, in one of the best cases, if we have a table with 10 dependencies, each dependency is related to 10 other tables and all relationships are many-to-many. If we want to receive a list of 50 items from that table along with 2 steps of penetration into its relationships with one request, in SQL we should send 50 * 10 * 50 * 10 which is equivalent to 250000 (two hundred and fifty thousand) requests sent to the database. But in Lesan all this data is collected with only 50 * 10 which is equivalent to 500 requests sent to the database.</p>
<h3 id="the-ratio-of-creation-and-update-to-data-retrieval">The Ratio Of Creation And Update To Data Retrieval</h3>
<p>Imagine a news database. We need a table for the authors and another table for the news written. Usually, at the end of each news, the name and some information of the author of that news are also included. If we place the information we need for the author of that news inside the news at the time of creation, we will not need to send a separate request to the database to receive the information of the author of that news when reading each news. But the problem arises when the author updates their information. For example, if they change their name from Ali to Ali Akbar. In this case, we have to update all the news written by that author. If this author writes an average of 10 news per day and works on this news website for more than 5 years, at least 18250 documents in the database must be updated. Is this cost-effective? In general, and in most cases, it can be cost-effective because news can be read more than a few thousand times a day and on the other hand, each author only changes their information once a year. Therefore, updating 18250 documents once a year is much less expensive than reading information from two different tables millions of times a day. Moreover, we have created a different solution for updating these repetitions called QQ, which updates them based on the amount of hardware resources used by the server side in different time periods and based on the value of the data. This process will be fully explained below.</p>
<h3 id="why-nosql">## Why noSQL?</h3>
<p>As you have seen, data duplication reduces the number of multiple requests to the database, which affects both the speed of receiving data and the way SSG content is created. In addition, the number of methods for receiving embedded data in these databases (especially aggregations in Mongodb) makes managing and filtering this data easier.</p>
<h3 id="why-mongodb">Why Mongodb?</h3>
<p>We had two ways to achieve the best performance:</p>
<ol>
<li>
<p>We would generally design a database from scratch to achieve at least the following points:</p>
<ul>
<li>
<p>give what we receive from the customer on the client side to the database so that we do not have any additional processing for analyzing the request.</p>
</li>
<li>
<p>Embed all relationships at least to one level.</p>
</li>
<li>
<p>In order to receive data from the database with any degree of penetration into the depths of relationships with only one query</p>
</li>
</ul>
</li>
<li>
<p>Among the available databases, let’s go for one of them and bring all our structures in line with it. Implementing a new database, although attractive, is infinitely time-consuming and requires a lot of time and cost to mature and become usable. Among the available databases, Mongodb met all our needs for at least three reasons:</p>
<ol>
<li>Mongodb is a NoSQL database and that’s exactly what we were looking for.</li>
<li>The process of selecting recursive fields from this database, namely projection, is a standard object with the field name key and a value of zero or one, and we could ask the same object from the customer on the client side without any processing and send it to the database.</li>
<li>And the key point was the creative idea of aggregation, because we could penetrate into the depths of relationships by sending only one request for any amount of data we wanted. <a href="https://www.pagerduty.com/resources/learn/what-is-data-aggregation/">It was enough to create helper functions for building request pipelines in this way.</a></li>
</ol>
</li>
</ol>
<p>Let’s examine how to create a Pipeline for filtering and selecting data in Mongodb aggregations with an example:</p>
<p>Consider the schemas we had for the country, province, and city tables, and now we want to receive a list of 25 provinces along with the country and cities of that province with one request. The Pipeline we create will be like this (the Pipeline that needs to be created for Lesan will be slightly different, which we will discuss later):</p>
<pre class=" language-typescript"><code class="prism  language-typescript">provinces<span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token punctuation">[</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"country._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"country"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span> <span class="token string">"$unwind"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> path<span class="token punctuation">:</span> <span class="token string">"$country"</span><span class="token punctuation">,</span> preserveNullAndEmptyArrays<span class="token punctuation">:</span> <span class="token keyword">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"cities._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"cities"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$project"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now if we create the same Pipeline for a project that has been created with Lesan, it will be as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">states<span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token punctuation">[</span>  
<span class="token string">"$project"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Yes, we send an empty Pipeline because all relationships are embedded in Lesan and we only send the projection to select the requested fields. But what happens if we penetrate one more level deeper into the relationships? For example, let’s request the provinces of countries again from within the countries and request the country of that city again from within the cities (it is true that this example is unrealistically funny, but we implement it only for comparison so that the concept can be easily conveyed). In the usual case, the Pipeline will be like this:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">states<span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token punctuation">[</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"country._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"country"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span> <span class="token string">"$unwind"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> path<span class="token punctuation">:</span> <span class="token string">"$country"</span><span class="token punctuation">,</span> preserveNullAndEmptyArrays<span class="token punctuation">:</span> <span class="token keyword">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"state"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"country.states._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"country.states"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"cities._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"cities"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"cities.country._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"cities.country"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span> <span class="token string">"$unwind"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> path<span class="token punctuation">:</span> <span class="token string">"$cities.country"</span><span class="token punctuation">,</span> preserveNullAndEmptyArrays<span class="token punctuation">:</span> <span class="token keyword">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$project"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> states<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span><span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span><span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>But the project created with Lesan will create a Pipeline as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">states<span class="token punctuation">.</span><span class="token function">aggregation</span><span class="token punctuation">(</span><span class="token punctuation">[</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"country._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"country"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span> <span class="token string">"$unwind"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> path<span class="token punctuation">:</span> <span class="token string">"$country"</span><span class="token punctuation">,</span> preserveNullAndEmptyArrays<span class="token punctuation">:</span> <span class="token keyword">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$lookup"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token keyword">from</span><span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span>  
localField<span class="token punctuation">:</span> <span class="token string">"cities._id"</span><span class="token punctuation">,</span>  
foreignField<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span>  
<span class="token keyword">as</span><span class="token punctuation">:</span> <span class="token string">"cities"</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
<span class="token string">"$project"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> states<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span><span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> country<span class="token punctuation">:</span> <span class="token punctuation">{</span> _id<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">,</span> abb<span class="token punctuation">:</span><span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>If you notice, we have no Pipeline to get the provinces inside the country because we know that in Lesan all relationships are stored in an embedded way and if we have the country with its relationships, we have definitely stored the last 50 provinces of each country inside it in an embedded way. So while we store the country as Pure and without relationships in the axis of each province and have it, we receive it again with a Pipeline.Now, instead of 50 * 50 + 50 documents (if we have requested 50 provinces per country by default), we only receive 50 documents (the country where the provinces are embedded). Now imagine that if, for example, the last registered restaurants in each country were also requested in this query, usually 50 * 50 + 50 * 50 + 50 documents would have to be requested, but with Lesan, the same document received for each country will also have a list of the last 50 restaurants and we only request those 50 documents instead of 5050 documents. And as each relationship is added, these numbers will get further apart from each other.</p>
<p>The same policy applies to cities in relation to the country. The only difference is that here 50 provinces are requested, each province wants the last 50 cities and each city has a relationship with a country that has been requested and we have to receive 50 * 50 + 2500 documents which with Lesan we have reduced this number to 50 * 50 documents.</p>
<p>Another point to note is that the Pipeline created in the last stage in Lesan is very similar to the Pipeline created in the normal state in the first stage, only the Projection field in these two Pipelines is different.</p>
<h3 id="queuing-data-changes">Queuing data changes</h3>
<p>We faced a problem with repeated data updates and said that we have created a process to send data to smaller parts for updates in different time periods. In the same example of the news agency mentioned above, we can divide document updates into several sections based on different criteria. For example, we can update newer news (e.g., the past 2 months) immediately and put older news in a queue for updating. For this purpose, we have created an entity language called Query Queue or QQ, which is an object of all commands that are to be sent to the database for data change.</p>
<p>The existence of this object allows us to manage updates. For example, if there are millions of updates to be made, we divide them into smaller parts. Depending on the amount of server hardware resources involved, we send a small part for updating to the database. We check the server hardware resources again and if the server is not involved in heavy processing, we send another part for updating.</p>
<p>In this classification, in addition to dividing the number of requests, we can also reduce the number of requests by comparing changes. For example, the author above changed his name from Ali to Ali Akbar once and changed his interests from reading to reading and sports a few hours later. Now we have two commands for data modification that can be sent to the database together. Therefore, we can merge these requests and then send them.</p>
<p>If we consider this classification as a compartment for storing data modification commands, we can also use it to verify the consistency of repeated data. And if for any reason any part of the data encounters problems, we can use this compartment to find and correct those problems.</p>
<p>We can also use artificial intelligence to manage changes in this queue, which will be explained in the relevant section.</p>
<h3 id="csr-ssr-or-ssg-content">CSR, SSR or SSG content</h3>
<p>Content on the internet is usually divided into three parts: CSR or Client-Side Rendering, SSR or Server-Side Rendering and SSG or Static Site Generation. CSR content is usually created by JavaScript frameworks on the client side, which is why search engines cannot easily understand them. SSR content is processed on the server side and is easily understandable by search engines. However, to create this content, the server must be involved in processing them each time. The best contents for publishing on the web are SSG contents because they are completely understandable by search engines and the server will not be involved in processing their data. Static contents can be placed on CDNs (Content Delivery Networks) and requests for this content can be returned from the stored location on the network before it reaches the server. To understand the popularity of SSG content, you can refer to popular JavaScript frameworks such as Gastby and NextJS.</p>
<p>One of the biggest problems with creating SSG content is the complexity of the data model. As the number of requests for data from the database increases, the amount of content that can be converted to SSG decreases. Because to create SSG content, the number of requests to the database must reach zero in order to produce static content.</p>
<p>Lesan’s framework has simplified the conditions for creating SSG content by reducing the number of requests to the database. On the other hand, by dividing the content into two parts, dynamic and static, and creating a database inside RAM that is managed by processes similar to Redux, there will be more concentration on the processes of creating and requesting SSG content.</p>
<p>In addition, Lessen only updates SSG content when a data has changed. Unlike the process that is usually used in NextJS or Gastby, which uses time periods to create and update SSG content due to lack of awareness of data changes. In this way, a specific time is determined in advance (for example, one day) to generate SSG content, and when that time ends, they send a request to the server to receive the content again and convert it to SSG and repeat this process. This cycle has two major problems: first, it is possible that the data has not changed and an unnecessary processing task is imposed on the server which can cause problems if the number of these requests on the server increases. And the second problem is that it is possible for the content on the server to change and it may be necessary to quickly update that content everywhere, including places where SSG content is stored. But in current processes, we have to wait until the time we have set in advance ends and send another request to the server to update the SSG content.</p>
<p>Returning to the example of a news agency, if this website intends to convert its news to SSG content, it will face both of the above problems. On the one hand, the process of generating SSG content may be performed for many news items that have not changed, which creates an unnecessary processing load for the server. On the other hand, it is possible that a news item has been mistakenly converted to SSG content and the news agency wants to remove it quickly, but we have to wait until the end of the specified time for that content to disappear. Also, someone has to request this news after the end of this time. For these two simple reasons, many websites prefer to process their content in SSR form. But how can we create SSG content only when data changes in the main database? This can be easily done with Lesan.</p>
<h3 id="penetration-into-depths">### Penetration Into Depths</h3>
<p>The next issue is how to penetrate the depths. <a href="https://escape.tech/blog/cyclic-queries-and-depth-limit/">In GraphQL, you have very complex solutions to manage it</a>, but in Lesan, this issue does not exist by default because in projects written with Lassan, the server-side programmer must determine the depth of the relationships of each accessible point from the program before writing any accessible point. Let’s take a look at implementing a small project with Lesan to clarify the matter.</p>
<p>In Lassan, starting a project will be like this:</p>
<ul>
<li>First of all, we create an app with the Lesan framework, for example (this sample is written in TypeScript):</li>
</ul>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> ecommerceApp <span class="token operator">=</span> <span class="token function">lesan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<ul>
<li>We write the model we want for the software using the pure - inrelation - outrelation method and add it to our ODM application. Like this (consider the same information we mentioned in the above example for country and cities):</li>
</ul>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> statePureObj <span class="token operator">=</span> <span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geometries<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
coordinates<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> stateInRel <span class="token operator">=</span> <span class="token punctuation">{</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span>  
optional<span class="token punctuation">:</span> <span class="token keyword">false</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"many"</span><span class="token punctuation">,</span>  
optional<span class="token punctuation">:</span> <span class="token keyword">true</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> stateOutRel <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">states</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>  
ecommerceApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"state"</span><span class="token punctuation">,</span>  
statePureObj<span class="token punctuation">,</span>  
stateInRel <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span><span class="token punctuation">,</span>  
stateOutRel <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span><span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<ul>
<li>Now we create a function for this model and add it to our application actions (in fact, this action is available to the customer side user to call it) like this:</li>
</ul>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> addStateFn<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">const</span> <span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> enName<span class="token punctuation">,</span> countryId<span class="token punctuation">,</span> geometries <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token operator">=</span> body<span class="token punctuation">.</span>details<span class="token punctuation">;</span>  
  
<span class="token keyword">return</span>  <span class="token keyword">await</span> <span class="token function">states</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

doc<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">,</span>  
enName<span class="token punctuation">,</span>  
geometries<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>

relation<span class="token punctuation">:</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span>countryId<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token keyword">get</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<h6 id="in-the-method-written-for-insertone-in-lesan’s-odm-the-input-get-is-also-received-and-returned-using-the-aggregation-method.-the-input-relation-also-receives-the-relationships-of-the-selected-model-and-finds-the-pure-information-of-all-relationships-based-on-the-information-we-have-given-it-before-and-stores-them-in-an-embedded-form.">In the Method written for insertOne in Lesan’s ODM, the input get is also received and returned using the aggregation method. The input relation also receives the relationships of the selected model and finds the pure information of all relationships based on the information we have given it before and stores them in an embedded form.</h6>
<ul>
<li>Now we write a validator for this function as follows:</li>
</ul>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> <span class="token function-variable function">addStateValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
countryId<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
enName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geometries<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
coordinates<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> <span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<ul>
<li>As you can see, the validator function addState has an object with keys set and get. The set key is used for information that we need to add state, and as you saw in addStateFn, this information has been used. But the value of the get key is what we need to penetrate into its depth. This value must be an object of a model that accurately specifies the degree of penetration into each of the relationships of that model (here in addStateFn). Here the get key is generated by a function called selectStruct. This function has two inputs. The first input is the name of the model for which we want to generate this object, and the second input specifies the degree of penetration into each relationship. The second input of the selectStruct function can be entered as a number or an object. If entered as an object, the keys of this object must be the names of the selected model relationships, and its value can again be a number or an object of its key relationships. Such as:</li>
</ul>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span> country <span class="token punctuation">:</span> <span class="token punctuation">{</span> state<span class="token punctuation">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> cities<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre>
<p>As a result, an object will be produced as follows :</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geoLocation<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geoLocation<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
cities<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
id<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
abb<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geoLocation<span class="token punctuation">:</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>This object is used for validating the data sent from the client to the server. With this method, we have accurately and separately determined the depth of penetration for each function. If you notice, the key “get” is exactly similar to “projection” in MongoDB and after validating this object, we send it to the database without any changes to receive the data. Besides, we can inform the customer side of all the details of the written requests on the server. As a result, even before sending a request on the customer’s side, we can understand what information needs to be sent and what information we can receive. Finally, we add this function and validator to our software with the setAct function.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">ecommerceApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"state"</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addStateFn<span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addState"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addStateValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h2 id="microservice">Microservice</h2>
<h3 id="microservice-process-implementation">Microservice process implementation</h3>
<p>There are different processes for implementing microservices around the world. However, in general, each service must have a separate and unique logic and data model with the least amount of dependency on other services. Therefore, the team working on each service can think independently about developing their software.</p>
<p>Ultimately all services want to send and/or receive information from other services. If the data models are very different from each other, separate logic must be written for each data to be coordinated. In some microservice development models, it is preferred that the data model designed for services be as consistent as possible because different services can have many common features.</p>
<p>Consider an ERP as an example. We have a service for accounting, a service for warehousing, and a service for running a store. All three of these services work with an entity called a product. Changing the product entity in any of these services affects the other services as well. For example, if a product is sold, the warehouse must be notified so that it can replace it in the store in time, and accounting must also have sales information to do its job. Therefore, if the product entity is consistent across all three services, writing server-side logic will be easier. In this type of microservice development, there is usually a senior programmer who knows about all three services and designs their models. This procedure will somewhat reduce the independence of services but ultimately create less trouble for development.</p>
<p>Another problem that arises in microservices is the lack of data consistency. Take the same ERP example. If a product is sold but not registered in the accounting service or removed from the warehouse but not registered in the store, it will cause data inconsistency. To reduce these inconsistencies, a tool called a message broker is recommended. With this tool, all messages that are supposed to be exchanged between two services are sent to an independent service and stored there. If a service does not work properly, messages are not lost and as a result, data always remains consistent and coordinated.</p>
<p>The next issue in microservices is the distribution of server-side hardware resources. If we have a large number of services, managing the processors of these services will be complicated and we will need many tools to analyze requests so that we can know the amount of hardware resources involved in running each piece of code. In addition, the exchange of messages between services is also an additional processing load that must be performed. Also, the repetitions created from the data require not only additional space for storage but also the need to write parallel logic because each logic processes a separate data. However, the main problem in distribution of processing load arises at the time of horizontal load division. If the data is integrated in one place, managing the distribution of processing load will be simple but when each service has its own database and processing load and at the same time needs other service data, distribution of processing load for it requires considering these dependencies. Given the limitations of vertical load division, removing obstacles to horizontal load division is essential. Lassan offers small solutions for implementation of microservices that can reduce their implementation complexity. It also proposes a new process that has an architecture between microservices and monoliths that will be explained later.</p>
<h3 id="lesan-solution">Lesan solution</h3>
<p>As mentioned in the above section, Lesan is a collection of models and actions created for those models. But in fact, these models are placed inside another object called contentType. contentType includes two other objects called dynamic and static (which will be explained later). contentType itself is also placed inside another object called main or any other service that is active in this process. All the information available in the main key can be obtained with the getMainActs function. All functions created with the setAct function are stored by default inside the main object. But there is another function called setService. With this function, we can add another service to our project. After adding a new service, we can access it by sending an object from the client side that has a service key. The setService function has two inputs: the first input is the name of the service and the second input can be obtained in two ways:</p>
<ul>
<li>
<p>As a string, which is actually the address of access to another service.</p>
</li>
<li>
<p>As another object, which is actually the output of the getMainActs function in another service.</p>
</li>
</ul>
<p>If the second input is a string, http or grpc methods are used to communicate with it, and if it is an object, that other service comes up as a plugin on this current service. As a result, we can manage a project both as a monolith and as a microservice at the same time.</p>
<h3 id="a-suggestion-for-microservices-an-architecture-between-microservices-and-monolith">A suggestion for microservices (an architecture between microservices and monolith)</h3>
<p>To create a model in Lesan, it can be expanded based on another extensive model so that it has nothing more than that and can only have some of its keys. Therefore, we can create a database for all services along with all models that have all the necessary keys in all services. Then each service defines its own model separately based on the integrated database model and takes some of its required keys from that main model. Given the way models are written in Lesan (model implementation based on a schema validator), we can have a common database and at the same time each service can validate its own data based on the expanded model of the comprehensive and original model. Also, it is possible to move models and actions written in Lesan, and we can easily have each service’s database separately or simultaneously with other services. On the other hand, NoSQL databases are usually schemaless and any shape or form can be given to data in the database. Lesan is currently developed based on MongoDB. If we can put all service models in a comprehensive database, we can prevent data duplication and we no longer need to write parallel logic to manage this duplication. In addition, we do not need any tools for synchronization or writing separate logic to standardize data. Finally, we can also take advantage of the ease of horizontal distribution of NoSQL databases without worrying about data consistency. Consider the following example:</p>
<p>Suppose we have several services named core - ecommerce - blog and so on, all of which have a model for users named user. We can create a model of the user that has all the fields of all these services and share it among all services, like this:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>  
<span class="token keyword">any</span><span class="token punctuation">,</span>  
array<span class="token punctuation">,</span>  
<span class="token keyword">boolean</span><span class="token punctuation">,</span>  
date<span class="token punctuation">,</span>  
enums<span class="token punctuation">,</span>  
InRelation<span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">,</span>  
object<span class="token punctuation">,</span>  
optional<span class="token punctuation">,</span>  
OutRelation<span class="token punctuation">,</span>  
<span class="token keyword">string</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"../../../deps.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">export</span>  <span class="token keyword">const</span> level <span class="token operator">=</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"Admin"</span><span class="token punctuation">,</span> <span class="token string">"Editor"</span><span class="token punctuation">,</span> <span class="token string">"Author"</span><span class="token punctuation">,</span> <span class="token string">"Ghost"</span><span class="token punctuation">,</span> <span class="token string">"Normal"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">export</span>  <span class="token keyword">const</span> gender <span class="token operator">=</span> <span class="token function">enums</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"Male"</span><span class="token punctuation">,</span> <span class="token string">"Female"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">export</span>  <span class="token keyword">const</span> addressObj <span class="token operator">=</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
addressId<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
countryId<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
stateId<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
cityId<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
addressText<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
location<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
coordinates<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">export</span>  <span class="token keyword">const</span> pureUserObj <span class="token operator">=</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
age<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
lastName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
phone<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
gender<span class="token punctuation">:</span> gender<span class="token punctuation">,</span>  
birthDate<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
postalCode<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
level<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span>level<span class="token punctuation">)</span><span class="token punctuation">,</span>  
email<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
isActive<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
creditCardNumber<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
address<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span>addressObj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">export</span>  <span class="token keyword">const</span> userInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
<span class="token comment">// TODO how c  </span>
<span class="token keyword">export</span>  <span class="token keyword">const</span> userOutRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
blogPosts<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"blogPosts"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span><span class="token punctuation">,</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
orders<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"order"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span><span class="token punctuation">,</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>Now, for example, we create a model of the user for ecommerce as well and write its fields in such a way that it does not have anything more than the shared user model, like this:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> ecommerceApp <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"../../../../../apps/ecommerce/mod.ts"</span><span class="token punctuation">;</span>  
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">any</span><span class="token punctuation">,</span> array<span class="token punctuation">,</span> <span class="token keyword">boolean</span><span class="token punctuation">,</span> date<span class="token punctuation">,</span> InRelation<span class="token punctuation">,</span> <span class="token keyword">number</span><span class="token punctuation">,</span> optional<span class="token punctuation">,</span> OutRelation<span class="token punctuation">,</span> <span class="token keyword">string</span> <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"../../../deps.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">import</span> <span class="token punctuation">{</span>  
addressObj<span class="token punctuation">,</span>  
gender<span class="token punctuation">,</span>  
level<span class="token punctuation">,</span>  
pureUserObj <span class="token keyword">as</span> sharedPureUserObj<span class="token punctuation">,</span>  
userInRel <span class="token keyword">as</span> sharedUserInRel<span class="token punctuation">,</span>  
userOutRel <span class="token keyword">as</span> sharedUserOutRel<span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"../../shared/mod.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userPureObj<span class="token punctuation">:</span> Partial<span class="token operator">&lt;</span><span class="token keyword">typeof</span> sharedPureUserObj<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
age<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
lastName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
phone<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
gender<span class="token punctuation">:</span> gender<span class="token punctuation">,</span>  
birthDate<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
postalCode<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
level<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span>level<span class="token punctuation">)</span><span class="token punctuation">,</span>  
email<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
isActive<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
creditCardNumber<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
address<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span>addressObj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userInRel<span class="token punctuation">:</span> Partial<span class="token operator">&lt;</span><span class="token keyword">typeof</span> sharedUserInRel<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userOutRel<span class="token punctuation">:</span> Partial<span class="token operator">&lt;</span><span class="token keyword">typeof</span> sharedUserOutRel<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
<span class="token comment">// blogPosts: {  </span>
<span class="token comment">// schemaName: "blogPosts",  </span>
<span class="token comment">// number: 50,  </span>
<span class="token comment">// sort: { type: "objectId", field: "_id", order: "desc" },  </span>
<span class="token comment">// },  </span>
orders<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"order"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span><span class="token punctuation">,</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">export</span>  <span class="token keyword">const</span> <span class="token function-variable function">users</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>  
ecommerceApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"user"</span><span class="token punctuation">,</span>  
userPureObj<span class="token punctuation">,</span>  
userInRel <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span><span class="token punctuation">,</span>  
userOutRel <span class="token keyword">as</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span><span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now we can connect them to a common database while several services continue their work independently, provided that the data validation of the schemas works independently for each service and only understands its own data. You can see a complete example of this type of microservice implementation here.</p>
<h2 id="artificial-intelligence">Artificial intelligence</h2>
<p>As explained in the section “Why data duplication” above, machine learning will be used in Lesan to manage the repetitions created in the data. In this way, a weight is given to each content according to different criteria, and if a request is made to update that content within QQ, changes are sent to the database according to the weight of the content. These weights can be feedback rate of the content, the amount of sharing it has, its dependencies or dependencies that other contents have on it, the time of content creation, whether it is related to the public or an individual and so on.</p>
<p>Also, artificial intelligence and machine learning can be used to integrate and standardize commands within QQ. In this way, if we find several requests to update a schema that have been registered, we can merge them together.</p>
<p>Artificial intelligence suggestions can be used to optimize the data model to better manage how dependencies are placed. This will minimize the amount of processing and speed up the receipt of information.</p>
<h2 id="starting-work-with-lesan">Starting work with Lesan</h2>
<p>Let’s create a simple web server with deno:</p>
<p>You can find a complete implementation of this example <a href="https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMircoservice">here</a>.</p>
<p>First of all, create a mod.ts file and import the latest version of lesan and assign it to a constant variable called coreApp:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> lesan <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> coreApp <span class="token operator">=</span> <span class="token function">lesan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h6 id="please-select-the-final-version-of-lusan-from-here-and-replace-xxx-with-it.">Please select the final version of Lusan from <a href="https://deno.land/x/lusan">here</a> and replace xxx with it.</h6>
<p>Before anything, let’s connect a database to our app, so add a new MongoDb instance to your code.</p>
<p>First, import MongoClient from lesan:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> lesan<span class="token punctuation">,</span> MongoClient <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>
</code></pre>
<p>and create a database instance via new MongoClient:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/${your_database_name}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> db <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token string">"core"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>We should set up the ODM with a new database instance:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setDb</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>As we have said before, to create a model, we need to define its pure fields with the name of pure and the relations of that model in two types of inrelation and outrelation.<br>
pure is merely a simple object with key of string and a value similar to <a href="https://github.com/ianstormtaylor/superstruct">SuperStruct</a> structure.</p>
<p>inrelation represents an <strong>array</strong> or a <strong>single</strong> pure object of another MongoDb collection, we want to embed in the current document. In SQL modeling, for every relation we save the key or id which we call inrelation. As an example, we have a blogPost which has a creator from the user collection and we save the pure model of the user in the blogPost collection.</p>
<p>outrelation specifies a relation for a specific collection but it could contain an unbound set of data that could outgrow the <strong>16MB</strong> limit size of a document in MongoDB. Thus we do not even save its key or id in SQL modeling. For example, we have a user entity who writes many blog posts and we save for example an array of pure objects of blogPost in order of the date published for the first pagination in the user collection containing the latest 50 blog posts.</p>
<p>Now let’s get our hands dirty and create the user and country schemas:</p>
<p>First import string number optional InRelation and OutRelation from lesan :</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>  
InRelation<span class="token punctuation">,</span>  
lesan<span class="token punctuation">,</span>  
MongoClient<span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">,</span>  
optional<span class="token punctuation">,</span>  
OutRelation<span class="token punctuation">,</span>  
<span class="token keyword">string</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>
</code></pre>
<p>and then create the schema shapes:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> userPure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
address<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
age<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryPure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span>  
optional<span class="token punctuation">:</span> <span class="token keyword">false</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userOutRel <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryOutRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
users<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"user"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>We should set the schema in coreApp:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> users <span class="token operator">=</span> coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> userPure<span class="token punctuation">,</span> userInRel<span class="token punctuation">,</span> userOutRel<span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> countries <span class="token operator">=</span> coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"country"</span><span class="token punctuation">,</span>  
countryPure<span class="token punctuation">,</span>  
countryInRel<span class="token punctuation">,</span>  
countryOutRel<span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>At this point, we need to have some endpoints to call from an HTTP request, so let’s write some endpoints.</p>
<p>For creating an endpoint, we need to set the act from coreApp.acts.setAct function which requires type schema actName validator and fn.</p>
<ul>
<li>
<p>The type is just an enum of two possible options namely, static and dynamic.</p>
</li>
<li>
<p>schema is the name of the model to which we want to set an action.</p>
</li>
<li>
<p>actName is just a simple string to identify the act.</p>
</li>
<li>
<p>a validator is a superstruct object which is called before the act fn calling and validation the given data.</p>
</li>
<li>
<p>validator includes set and get objects.</p>
</li>
<li>
<p>fn is the function we call when a request for it arrives.</p>
</li>
</ul>
<p>The following is an one example of act:</p>
<p>Before creating act, import object and ActFn from lesan:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>  
ActFn<span class="token punctuation">,</span>  
InRelation<span class="token punctuation">,</span>  
lesan<span class="token punctuation">,</span>  
MongoClient<span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">,</span>  
object<span class="token punctuation">,</span>  
optional<span class="token punctuation">,</span>  
OutRelation<span class="token punctuation">,</span>  
<span class="token keyword">string</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>
</code></pre>
<p>and the act will be in the following form:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> <span class="token function-variable function">addUserValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>userPure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> coreApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span><span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> addUser<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> users<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

doc<span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">,</span>

<span class="token keyword">get</span><span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">get</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"user"</span><span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addUser"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addUserValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addUser<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>The last thing we need is just to run the web server:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">coreApp<span class="token punctuation">.</span><span class="token function">runServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> port<span class="token punctuation">:</span> <span class="token number">8080</span><span class="token punctuation">,</span> typeGeneration<span class="token punctuation">:</span> <span class="token keyword">true</span><span class="token punctuation">,</span> playground<span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>When typeGeneration is set to true, it creates a <strong>declarations</strong> folder with some typescript typings we need in the project.</p>
<p>Now run this command in the terminal:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">deno run <span class="token operator">-</span>A mod<span class="token punctuation">.</span>ts
</code></pre>
<p>If the web server comes up correctly, you will see the following message:</p>
<p>We are all set and now we can send a POST HTTP request to <a href="http://localhost:8080/lesan">http://localhost:8080/lesan</a>, include the following in JSON format inside the body in order to retrieve the desired data:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
<span class="token string">"contents"</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
<span class="token string">"wants"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"model"</span><span class="token punctuation">:</span> <span class="token string">"user"</span><span class="token punctuation">,</span>  
<span class="token string">"act"</span><span class="token punctuation">:</span> <span class="token string">"addUser"</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"details"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"set"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Seyyedeh Sare Hosseini"</span><span class="token punctuation">,</span>  
<span class="token string">"address"</span><span class="token punctuation">:</span> <span class="token string">"Iran, Hamedan"</span><span class="token punctuation">,</span>  
<span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">5</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"get"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
<span class="token string">"address"</span><span class="token punctuation">:</span> <span class="token number">1</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>The working of projection for retrieving data is fundamentally based on <a href="https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/">MongoDb Projection</a>.</p>
<p>The coreApp.schemas.selectStruct function can limit the projection based on your schema relationships and prevent an infinite loop in retrieving data.</p>
<p>After running the server with typeGeneration set to true, the declarations folder is created and you can import userInp from generated type and make coreApp.schemas.selectStruct(“user”, { country: 1 }) type safe:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> userInp <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"./declarations/selectInp.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">addUserValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>userPure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> coreApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span>selectStruct<span class="token operator">&lt;</span>userInp<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>The following is the full example of what we have discussed so far:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>  
ActFn<span class="token punctuation">,</span>  
InRelation<span class="token punctuation">,</span>  
lesan<span class="token punctuation">,</span>  
MongoClient<span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">,</span>  
object<span class="token punctuation">,</span>  
optional<span class="token punctuation">,</span>  
OutRelation<span class="token punctuation">,</span>  
<span class="token keyword">string</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> coreApp <span class="token operator">=</span> <span class="token function">lesan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/arc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> db <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token string">"core"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setDb</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userPure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
address<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
age<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryPure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
country<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span>  
optional<span class="token punctuation">:</span> <span class="token keyword">false</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> userOutRel <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> countryOutRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
users<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"user"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"objectId"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> users <span class="token operator">=</span> coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> userPure<span class="token punctuation">,</span> userInRel<span class="token punctuation">,</span> userOutRel<span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> countries <span class="token operator">=</span> coreApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"country"</span><span class="token punctuation">,</span>  
countryPure<span class="token punctuation">,</span>  
countryInRel<span class="token punctuation">,</span>  
countryOutRel<span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">addUserValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>userPure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> coreApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span><span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> addUser<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> users<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

doc<span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">,</span>

<span class="token keyword">get</span><span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">get</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"user"</span><span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addUser"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addUserValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addUser<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">addCountryValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>countryPure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> coreApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span><span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"country"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> users<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> addCountry<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">const</span> createdCountry <span class="token operator">=</span> <span class="token keyword">await</span> countries<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span>body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">return</span>  <span class="token keyword">await</span> countries<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> _id<span class="token punctuation">:</span> createdCountry <span class="token punctuation">}</span><span class="token punctuation">,</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addCountry"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addCountryValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addCountry<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
coreApp<span class="token punctuation">.</span><span class="token function">runServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> port<span class="token punctuation">:</span> <span class="token number">8080</span><span class="token punctuation">,</span> typeGeneration<span class="token punctuation">:</span> <span class="token keyword">true</span><span class="token punctuation">,</span> playground<span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h3 id="microservice-architecture-with-lesan">Microservice Architecture with Lesan:</h3>
<p>Lesan provides the capability to create independent services which follow the distributed architecture for your system.</p>
<p>Follow the below instructions in order to create a microservice example:</p>
<p>Move the mod.ts file to core/mod.ts and create another file in ecommerce/mod.ts and place the following code in it:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span>  
ActFn<span class="token punctuation">,</span>  
InRelation<span class="token punctuation">,</span>  
lesan<span class="token punctuation">,</span>  
MongoClient<span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">,</span>  
object<span class="token punctuation">,</span>  
optional<span class="token punctuation">,</span>  
OutRelation<span class="token punctuation">,</span>  
<span class="token keyword">string</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"https://deno.land/x/lesan@vx.xx/mod.ts"</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> ecommerceApp <span class="token operator">=</span> <span class="token function">lesan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/arc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> db <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token string">"core"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
ecommerceApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setDb</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> warePure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
brand<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
price<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wareTypePure <span class="token operator">=</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
description<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wareInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
wareType<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"wareType"</span><span class="token punctuation">,</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wareOutRel <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wareTypeInRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> InRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wareTypeOutRel<span class="token punctuation">:</span> Record<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OutRelation<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>  
wares<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"ware"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> field<span class="token punctuation">:</span> <span class="token string">"_id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> wares <span class="token operator">=</span> ecommerceApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"ware"</span><span class="token punctuation">,</span>  
warePure<span class="token punctuation">,</span>  
wareInRel<span class="token punctuation">,</span>  
wareOutRel<span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> wareTypes <span class="token operator">=</span> ecommerceApp<span class="token punctuation">.</span>odm<span class="token punctuation">.</span><span class="token function">setModel</span><span class="token punctuation">(</span>  
<span class="token string">"wareType"</span><span class="token punctuation">,</span>  
wareTypePure<span class="token punctuation">,</span>  
wareTypeInRel<span class="token punctuation">,</span>  
wareTypeOutRel<span class="token punctuation">,</span>  
<span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">addWareValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>warePure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> ecommerceApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span><span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"ware"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> country<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> addWare<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> wares<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

doc<span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">,</span>

<span class="token keyword">get</span><span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">get</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
ecommerceApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"ware"</span><span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addWare"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addWareValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addWare<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> <span class="token function-variable function">addWareTypeValidator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
<span class="token keyword">return</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span>wareTypePure<span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token keyword">get</span><span class="token punctuation">:</span> ecommerceApp<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span><span class="token function">selectStruct</span><span class="token punctuation">(</span><span class="token string">"wareType"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
  
<span class="token keyword">const</span> addWareType<span class="token punctuation">:</span> ActFn <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> wareTypes<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

doc<span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">,</span>

<span class="token keyword">get</span><span class="token punctuation">:</span> body<span class="token punctuation">.</span>details<span class="token punctuation">.</span><span class="token keyword">get</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
ecommerceApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setAct</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
schema<span class="token punctuation">:</span> <span class="token string">"wareType"</span><span class="token punctuation">,</span>  
actName<span class="token punctuation">:</span> <span class="token string">"addWareType"</span><span class="token punctuation">,</span>  
validator<span class="token punctuation">:</span> <span class="token function">addWareTypeValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
fn<span class="token punctuation">:</span> addWareType<span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
ecommerceApp<span class="token punctuation">.</span><span class="token function">runServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> port<span class="token punctuation">:</span> <span class="token number">8282</span><span class="token punctuation">,</span> typeGeneration<span class="token punctuation">:</span> <span class="token keyword">true</span><span class="token punctuation">,</span> playground<span class="token punctuation">:</span> <span class="token keyword">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now we have to create servers, one for the core on port: 8080 and another server for ecommerce on port: 8585.</p>
<p>Then let’s implement ecommerce as a microservice in core. It can be done quite easily by just adding these lines of code before coreApp.runServer(…).</p>
<pre class=" language-typescript"><code class="prism  language-typescript">coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setService</span><span class="token punctuation">(</span><span class="token string">"ecommerce"</span><span class="token punctuation">,</span> <span class="token string">"http://localhost:8282/lesan"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now execute deno run -A mod.ts in both of core/ and ecommerce/ folders until you could see the following message in your terminal:</p>
<p>/on core :</p>
<pre class=" language-typescript"><code class="prism  language-typescript">HTTP webserver running<span class="token punctuation">.</span> Access it at<span class="token punctuation">:</span> http<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token punctuation">:</span><span class="token number">8080</span><span class="token operator">/</span>
</code></pre>
<p>and on /ecommerce :</p>
<pre class=" language-typescript"><code class="prism  language-typescript">HTTP webserver running<span class="token punctuation">.</span> Access it at<span class="token punctuation">:</span> http<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token punctuation">:</span><span class="token number">8282</span><span class="token operator">/</span>
</code></pre>
<p>You can now send an HTTP POST request for adding wareType which belongs to the ecommerce service on the <a href="http://localhost:8585/lesan">http://localhost:8585/lesan</a> endpoint with the following JSON in the request body:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
<span class="token string">"contents"</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
<span class="token string">"wants"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"model"</span><span class="token punctuation">:</span> <span class="token string">"wareType"</span><span class="token punctuation">,</span>  
<span class="token string">"act"</span><span class="token punctuation">:</span> <span class="token string">"addWareType"</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"details"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"set"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"digital"</span><span class="token punctuation">,</span>  
<span class="token string">"description"</span><span class="token punctuation">:</span> <span class="token string">"digital products include phone and ..."</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"get"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>And even add wareType by sending an HTTP POST request to <a href="http://localhost:8080/lesan">http://localhost:8080/lesan</a> which is for core service with this JSON on request body :</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
<span class="token string">"service"</span><span class="token punctuation">:</span> <span class="token string">"ecommerce"</span><span class="token punctuation">,</span>  
<span class="token string">"contents"</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>  
<span class="token string">"wants"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"model"</span><span class="token punctuation">:</span> <span class="token string">"wareType"</span><span class="token punctuation">,</span>  
<span class="token string">"act"</span><span class="token punctuation">:</span> <span class="token string">"addWareType"</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"details"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"set"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"digital"</span><span class="token punctuation">,</span>  
<span class="token string">"description"</span><span class="token punctuation">:</span> <span class="token string">"digital products include phone and ..."</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token string">"get"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>and even better you can export all ecommerce actions with just one line of code. Thus, add the below code before <code>ecommerceApp.runServer(...)</code> in <code>ecommerce/mod.ts</code> and comment the runServer line.</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">export</span>  <span class="token keyword">const</span> ecommerceActs <span class="token operator">=</span> ecommerceApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">getMainActs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token comment">// ecommerceApp.runServer({ port: 8585, typeGeneration: true, playground: false });</span>
</code></pre>
<p>Now import ecommerceActs in core/mod.ts:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">import</span> <span class="token punctuation">{</span> ecommerceActs <span class="token punctuation">}</span> <span class="token keyword">from</span>  <span class="token string">"../ecommerce/mod.ts"</span><span class="token punctuation">;</span>
</code></pre>
<p>and change coreApp.acts.setService to :</p>
<pre class=" language-typescript"><code class="prism  language-typescript">coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">setService</span><span class="token punctuation">(</span><span class="token string">"ecommerce"</span><span class="token punctuation">,</span> ecommerceActs<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now we have all the ecommerce actions, even without running the ecommerce server and sending addWareType request to the core service for creating wareType.</p>
<p>If you want to see your actions, simply use this line of code anywhere in your code:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">const</span> acts <span class="token operator">=</span> coreApp<span class="token punctuation">.</span>acts<span class="token punctuation">.</span><span class="token function">getAtcsWithServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">{</span> acts <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">" ------ "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h2 id="structures">Structures</h2>
<h3 id="schemas">Schemas</h3>
<p>Above, it was said briefly about schemas; In general, each schema includes:</p>
<p>pure, inrelation, outrelation, embedded and struct, which is enclosed in two types, dynamic and static, and is included in another object called service. By default, the service object has the main key. And by adding other microservices, other keys will be added to it.</p>
<p>We have used the superstruct library to create a pure structure in each schema; As a result, these values can be used for each field:<br>
<a href="https://docs.superstructjs.org/api-reference/types">https://docs.superstructjs.org/api-reference/types</a></p>
<h3 id="pure-structure-in-schema">Pure Structure In Schema</h3>
<p>As mentioned in the previous section, pure include the pure features of a schema. In fact, the features that are specific to the schema itself, not the relationships it has.</p>
<p>For example, the schema of a city has pure features: city ID, city name, its geographical location, and so on.</p>
<p>The structure of a pure schema is as follows, which includes a key and its type of feature.</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">export</span>  <span class="token keyword">interface</span> <span class="token class-name">PureModel</span> <span class="token punctuation">{</span>  
<span class="token punctuation">[</span>key<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">]</span><span class="token punctuation">:</span> Struct<span class="token operator">&lt;</span><span class="token keyword">any</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>for example, the pure features of the city schema are defined as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>  
name<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
enName<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
geometries<span class="token punctuation">:</span> <span class="token function">optional</span><span class="token punctuation">(</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
coordinates<span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<h3 id="the-inrelation-structure-in-schema">The InRelation Structure In Schema</h3>
<p>As mentioned in the proposed method section, when schema A has a relationship with schema B, we store the pure values of schema B in the form of embed in schema A.</p>
<p>The relationship inrelation is divided into two types of single and multiple. If it is single, inrelation will be an object. If it is multiple, it will be an array of objects. The important issue is how many pure objects we can store in relation as embed? We have no limitation for this issue in Lesan but MongoDB database has a limitation of <strong>16 megabytes</strong> for each BSON document. Since the number of our relations may not end up with one relation, it is better to consider a limitation ourselves. For example, if the total number of documents we want to embed is less than 100, we consider this relationship as inrelation. If the number is more than 100, we define this relationship as outrelation. The outrelation will be explained later.</p>
<p>The structure of the inrelation relationship is as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">export</span>  <span class="token keyword">interface</span> <span class="token class-name">InRelation</span> <span class="token punctuation">{</span>  
<span class="token comment">/**  
* name of schema that this schema has relation with  
*/</span>  
schemaName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>  
<span class="token comment">/**  
* type of relation if equal to one: this schema record one object from other schema else  
* this schema record array of object from other schema  
*/</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token operator">|</span> <span class="token string">"many"</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>In this structure, SchemaName is the name of the schema that schema ‘A’ is associated with. Type can also have the values one or many. If the relationship is single, type takes the value of one and if it is more, it receives the value of many.</p>
<p>For example; As you can see below, the province schema has an inrelation relationship with the country schema, and since each province has only one country, the type of this relationship is single, so type = “one”. And since the number of cities in a province is also very limited. The province schema also has an inRelation relationship with the city, and since its number is more than one, its type becomes many.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">stateInrelations <span class="token operator">=</span> <span class="token punctuation">{</span> cities<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"city"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"many"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> country<span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"one"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre>
<h3 id="the-structure-of-outrelation-in-the-schema">The structure of OutRelation in the schema</h3>
<p>The outerRelation structure is a relationship that has more than the limitation that we have considered by default for the inrelation relationship. In this type of relationship, we try to store a limited number that may be requested in the first request in an embedded way with a special algorithm. The important point is that for the next user request, they can easily send their request to the main schema and receive the rest of the list from there. Ultimately, this will significantly reduce the number of requests sent to the server.</p>
<p>For example, the number of cities in a country is usually more than a few hundred cities. Our limitation for the inrelation relationship was one hundred, so we store a limited number of cities within the country as an embedded outrelation relationship. By default, we have considered this limited number to be fifty and have sorted these fifty cities by their creation date and in DESC order. Or in another example, if we consider the user schema and the order schema in a shopping program, each order has a customer who is of the user schema type. Therefore, the user is stored in the order schema as an inrelation relationship of type one and embedded. On the other hand, the user schema is also related to the order schema. The user’s orders may be very large, so we store a limited number of each user’s orders as an outRelation relationship embedded in the user schema. We can even store orders multiple times as an outrelation relationship in the user schema. Once sorted by order registration date and once sorted by order price and …</p>
<p>The structure of the outrelation relationship is as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">export</span>  <span class="token keyword">interface</span> <span class="token class-name">OutRelation</span> <span class="token punctuation">{</span>  
<span class="token comment">/**  
* name of schema that this schema has relation with  
*/</span>  
schemaName<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>  
<span class="token comment">/**  
* number of value that we want to keep  
*/</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">;</span>  
<span class="token comment">/**  
* sort : {field , order} - field of sort , and order of sort  
*/</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
field<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>  
order<span class="token punctuation">:</span> <span class="token string">"asc"</span> <span class="token operator">|</span> <span class="token string">"desc"</span><span class="token punctuation">;</span>  
<span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"number"</span> <span class="token operator">|</span> <span class="token string">"date"</span> <span class="token operator">|</span> <span class="token string">"objectId"</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>In this structure, schemaName is the name of the schema that schema A is related to. Number is the number of fields we want to keep in this schema, and an object called sort that includes three values:</p>
<p>1- field that we want to sort by.</p>
<p>2- Order type of ascending or descending.</p>
<p>3- Type the type of field we want to sort by.</p>
<h3 id="the-structure-of-embed-in-the-schema">The structure of embed in the schema</h3>
<p>The embed structure is created at runtime and when the createEmbeded function is executed, it finds all the inrelation and outrelation relationships of all schemas from other schemas and replaces the pure relationship values.</p>
<p>If we consider the relationships of a schema as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">inrelation<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"country"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> schemaName<span class="token punctuation">:</span> <span class="token string">"country"</span><span class="token punctuation">,</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token string">"many"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
outrelation<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"orders"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
schemaName<span class="token punctuation">:</span> <span class="token string">"order"</span><span class="token punctuation">,</span>  
<span class="token keyword">number</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>  
sort<span class="token punctuation">:</span> <span class="token punctuation">{</span> filed<span class="token punctuation">:</span> <span class="token string">"id"</span><span class="token punctuation">,</span> order<span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre>
<p>The structure of the embedded will be as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">embedded<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"country"</span><span class="token punctuation">:</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token string">"id"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"orders"</span><span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token string">"id"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre>
<h3 id="the-structure-of-struct-in-the-schema">The structure of Struct in the schema</h3>
<p>The Struct is also created at runtime and when the createStruct function is executed, it is used to fully validate that schema. The Struct contains the pure properties of a schema and the embedded properties extracted above. For example, the struct for the user schema that has a relationship with country and order is as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">struct<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
name<span class="token punctuation">:</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
lastName<span class="token punctuation">:</span><span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"country"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>  
<span class="token string">"id"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"orders"</span><span class="token punctuation">:</span> <span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">{</span>  
<span class="token string">"id"</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token string">"price"</span><span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre>
<p>You can read all the features of the superstruct library <a href="https://docs.superstructjs.org/api-reference/types">here</a>.</p>
<h3 id="odm-acts-structure">ODM (Acts structure)</h3>
<p>Given the schema structure in the lesan (inrelations and outrelations), we will need a document object mapper in particular, as explained above, we only store the pure values of each relationship inside the document in the database. In fact, the database is not aware of the inrelation and outrelation relationships. Therefore, we had to manage the creation, retrieval, update, and deletion of embedded information based on the information we had previously received at a higher layer than the database.<br>
For example, suppose we want to add a blog post to the database that has an inrelation relationship with the user schema. Like the document below:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">post<span class="token punctuation">:</span> <span class="token punctuation">{</span>  
content<span class="token punctuation">:</span> <span class="token string">"set fire to the rain"</span><span class="token punctuation">,</span>  
title<span class="token punctuation">:</span><span class="token string">"second"</span><span class="token punctuation">,</span>  
user<span class="token punctuation">:</span><span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token string">"12312jhdjnfas"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"amir"</span><span class="token punctuation">,</span>  
lastName<span class="token punctuation">:</span> <span class="token string">"hshm"</span>  
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Against the user schema, it also has an outrelation relationship with the blog post, so we must also add the added post to the user schema.</p>
<pre class=" language-typescript"><code class="prism  language-typescript">_id<span class="token punctuation">:</span> <span class="token string">"12312jhdjnfas"</span><span class="token punctuation">,</span>  
name<span class="token punctuation">:</span> <span class="token string">"amir"</span><span class="token punctuation">,</span>  
lastName<span class="token punctuation">:</span> <span class="token string">"hshm"</span><span class="token punctuation">,</span>  
posts<span class="token punctuation">:</span> <span class="token punctuation">[</span>  
<span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  
content<span class="token punctuation">:</span> <span class="token string">"good day"</span><span class="token punctuation">,</span>  
title<span class="token punctuation">:</span><span class="token string">"first"</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span><span class="token punctuation">,</span>  
<span class="token punctuation">{</span>  
_id<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>  
content<span class="token punctuation">:</span> <span class="token string">"set fire to the rain"</span><span class="token punctuation">,</span>  
title<span class="token punctuation">:</span><span class="token string">"second"</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span>  
<span class="token punctuation">]</span><span class="token punctuation">,</span>  
<span class="token punctuation">}</span>
</code></pre>
<p>As we said, the database itself does not do this for us. We check these relationships by writing an ODM that includes functions such as insertOne, findOne, update, delete, etc., and send an optimized query to the database to meet all our needs (…, insert, find) based on the depth given.</p>
<h3 id="runserver-web-server-structure">runServer (web server structure)</h3>
<p>Inside the lesan, there is a web server without any dependencies that receives requests and responds appropriately. The structure of this web server is included in a try-catch, so the rest of the written code does not need to be covered with try-catch and it is only necessary to return an appropriate error for each function so that the same error can be sent to the customer side without any unexpected crashes.</p>
<p>The structure of the requests that should be sent to the server is a JSON as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token punctuation">{</span>
   <span class="token string">"service"</span><span class="token punctuation">:</span> <span class="token string">"ecommerce"</span><span class="token punctuation">,</span>
   <span class="token string">"contents"</span><span class="token punctuation">:</span> <span class="token string">"dynamic"</span><span class="token punctuation">,</span>
   <span class="token string">"wants"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
       <span class="token string">"model"</span><span class="token punctuation">:</span> <span class="token string">"state"</span><span class="token punctuation">,</span>
       <span class="token string">"act"</span><span class="token punctuation">:</span> <span class="token string">"getState"</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token string">"details"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
       <span class="token string">"set"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
           <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token string">"626fbe6e4b628d43f7e92ae9"</span>
       <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token string">"get"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
           <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
           <span class="token string">"country"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
               <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
               <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
               <span class="token string">"states"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                   <span class="token string">"_id"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                   <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                   <span class="token string">"country"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                       <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token number">1</span>
                   <span class="token punctuation">}</span>
               <span class="token punctuation">}</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>With the service key, we can choose which microservice is going to respond to the request. By default, the value of this field is main. Sending this key is not mandatory.</p>
<p>The contents key receives the values dynamic and static.</p>
<p>The “wants” key is an object with two keys: model and act. In the model key, the models that exist in the static and dynamic values are selectable and in the act key, the actions that exist in the selected model are selectable.</p>
<p>In the details key, there is also an object with two keys set and get. The set key includes all the information that the selected action in the act key needs and the get key includes information that this action is supposed to return to us and we can choose whether to return details with values of zero or one.</p>
<h3 id="request-processing">Request processing</h3>
<p>In addition to processing the sending structure explained above and delivering the correct information with the correct facilities to the final function, this web server can also process requests that are for downloading or uploading files and ultimately has a context within itself that can be shared between validators and action functions.</p>
<h3 id="dynamic-structure">Dynamic structure</h3>
<p>In fact, every model we create in the database will be one of the dynamic object keys inside the schemas object. Inside this key, for each of the actions written on that model, we create a key and this key also has two other keys. The validator key is executed before the action function and validates the data required by the action before executing its function. The act key is actually the main action function and at runtime will apply the requested changes to the model.</p>
<p>The structure of dynamic is as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript">dynamic<span class="token punctuation">:</span> <span class="token punctuation">{</span>
	user<span class="token punctuation">:</span> <span class="token punctuation">{</span>
  	    create<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    	        validator<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      	            <span class="token keyword">return</span> <span class="token keyword">true</span><span class="token punctuation">;</span>
    	    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    	    fn<span class="token punctuation">:</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      	        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    	    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  	<span class="token punctuation">}</span><span class="token punctuation">,</span>
  	    update<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    	        validator<span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      	            <span class="token keyword">return</span> <span class="token keyword">true</span><span class="token punctuation">;</span>
    	        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    	        fn<span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      	            <span class="token keyword">return</span> input<span class="token punctuation">;</span>
    	        <span class="token punctuation">}</span><span class="token punctuation">,</span>
  	    <span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre>
<h3 id="static-structure">Static structure</h3>
<p>The structure of static is exactly the same as the structure of dynamic, except that it stores information in RAM and is usually used to store a parsed page of client-side apps. This has two advantages: first, if a page was supposed to send multiple requests to the dynamic structure, by storing its information in the static structure, we can receive this information by sending only one request to one of the keys set on the static structure models. Second, the stored information inside the static structure is stored in RAM so that it can be created, updated, deleted and retrieved more quickly.</p>
<p>The stored information inside the static structure is managed with an immutable state management.</p>
<p>Finally, the static structure acts as a cache layer, a layer whose information has an appropriate interaction with the actual data inside the database and can be easily updated and managed.</p>
<p>The structure of static is as follows:</p>
<pre class=" language-typescript"><code class="prism  language-typescript"><span class="token keyword">static</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
	<span class="token string">"blogFirstPage"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
  		<span class="token string">"get"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    			<span class="token string">"validator"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      				<span class="token keyword">return</span> <span class="token keyword">true</span><span class="token punctuation">;</span>
    		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    		<span class="token string">"fn"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      			<span class="token keyword">return</span> input<span class="token punctuation">;</span>
    		<span class="token punctuation">}</span><span class="token punctuation">,</span>
  	<span class="token punctuation">}</span><span class="token punctuation">,</span>
  		<span class="token string">"set"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    			<span class="token string">"validator"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      				<span class="token keyword">return</span> <span class="token keyword">true</span><span class="token punctuation">;</span>
    		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    		<span class="token string">"fn"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>input<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      			<span class="token keyword">return</span> input<span class="token punctuation">;</span>
    		<span class="token punctuation">}</span><span class="token punctuation">,</span>
  	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre>

