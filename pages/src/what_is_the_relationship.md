# What is the relationship really?

Let's compare a bit, it may be funny, but let's do it.   

what are a real relationship between `People`?
- Right relationships are lasting and long -term.
- Both parties accept responsibility for relationships and changes.
- Changes on one side of the relationship also affect the other side.
- The two sides of a relationship live together.
- If the relationship leads to the birth of a child, both parties will accept the relationship.  

Now let's look at the relationship features in `SQL`:
- There is no real relationship. The two sides have only one connection.
- Relationships are not together. And each lives independently.
- Relationships are not deep.
- Relationships do not give birth to any children. (In **Lesan**, you will see that relationships encourage you to create new models)  

What are the relationships in `NoSQL`?
- There is no real relationship. In fact, there is no proper connection between the two sides.
- If we consider embeding as a relationship: 
  - the changes of each party have no effect on the other side and cause many inconsistencies in the data.
  - the two sides leave each other after the relationship.
- In this type of databases, they prevent the child from being born, and if a child is born, only one side will be informed of it and probably will not take much responsibility for it.  

And finally what are the relationships in `Lesan`:
- Relationships are as strong as possible, and are described in detail when creating a model.
- Relationships fully contain each other's pure properties within themselves.
- If a relationship changes, all related parties will be notified and apply the changes according to a process.
- By establishing a relationship and seeing many changes on one side of this relationship, you are encouraged to create new relationships. Don't worry, this issue will not add more complexity to the data model, but it will also make the data more understandable. (Below there is an example to understand this)

## Example
### SQL
So let's go back to our example (countries, cities and users)  
If we want to define a relationship between the country, city and user models in `SQL`, this relationship will be as follows (The code below is written for `PostgreSQL`):
```sql
CREATE TABLE country (
  id serial PRIMARY KEY,
  name VARCHAR ( 50 ) UNIQUE NOT NULL,
  abb VARCHAR ( 50 ) NOT NULL,
  population INT NOT NULL,
);

CREATE TABLE city (
  id serial PRIMARY KEY,
  name VARCHAR ( 50 ) UNIQUE NOT NULL,
  abb VARCHAR ( 50 ) NOT NULL,
  population INT NOT NULL,
  country_id INT NOT NULL,
  FOREIGN KEY (country_id)
    REFERENCES country (country_id),
);

CREATE TABLE user (
  id serial PRIMARY KEY,
  name VARCHAR ( 50 ) UNIQUE NOT NULL,
  age INT NOT NULL,
  country_id INT NOT NULL,
  FOREIGN KEY (country_id)
    REFERENCES country (country_id),
  city_id INT NOT NULL,
  FOREIGN KEY (city_id)
    REFERENCES city_id (city_id),
);

```

Pay attention that the relationships are separated from each other as much as possible and only one ID is kept on one side. Whenever we need to know the details of the relationship, we have to visit both sides of the relationship.  
For example, let's imagine that we want the cities of Iran, we must first find Iran and then filter the city using Iran ID.  
Now let's imagine that we want to find the country of Iran along with its 50 most populated cities, we have to find Iran first, then find the cities according to the ID filter of the country of Iran along with the sort based on the city population field and the limit of 50.  
Let's run a more complex query. Suppose we want to receive 50 most populous cities from the 50 most populous countries in the world.  
Or we want to find the oldest people in the 50 most populous countries in the world.  
To get the above cities or users, we have to create and execute much more complex queries that may be time-consuming in some cases, although there are alternative ways such as creating separate tables in SQL for these specific purposes, but these ways also add a lot of complexity to the project.  

### NoSQL
What if we could do the above with just a simple query? `NoSQL` is designed for this, let's see how these tables are implemented in `NoSQL` databases (Here we have used `mongoose` so that we can have the shape of the schemas):
```ts
const CountrySchema = new mongoose.Schema ({
	name: String,
	abb: String,
	population: Number,
});
const Country = mongoose.model("Country", CountrySchema)

const CitySchema = new mongoose.Schema ({
	name: String,
	abb: String,
	population: Number,
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Country
	} 
});
const City = mongoose.model("City", CitySchema)

const UserSchema = new mongoose.Schema ({
	name: String,
	age: Number,
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Country
	},
	city: {
		type: mongoose.Schema.Types.ObjectId,
		ref: City
	} 
});
const User = mongoose.model("User", CitySchema)
```
The code above is exactly equivalent to the code we wrote for `PostgreSQL` and creates exactly the same tables in `MongoDB`. All the issues we described for `SQL` will be present here as well, but wait, we can add other fields to these tables to simplify the complex queries we talked about above.  

We can store its cities inside each country by adding a field called cities. Pay attention to the following code:
```ts
const CountrySchema = new mongoose.Schema ({
  name: String,
  abb: String,
  population: Number,
  cities: [{
    name: String,
    abb: String,
    population: Number,
  }]
});
```

Now we can get a country along with its cities just by sending a single query. For example, we can get the country of Iran along with its cities with just one query from the database. But wait, some new issues have arisen.  
- How should we save the cities inside the country ?  
For this, it is necessary to find the country associated with the city in the function we write to add the city and add this new city to the cities field of that country. This means that when adding a city in the table of cities, we must insert a new record and edit a record in the table of countries.
- Can we store all the cities of a country within itself ?  
The short answer is no, although it is possible that the number of cities in a country can be stored within the country, but in some situations, the number of documents that we need to store inside another document may be very large, such as the users of a country. So what should we do? Save a limited number of cities, how many? The number that we feel should be requested in the first pagination (for example, 50 numbers). So, in the function we have written to store the city, we must be aware that if the field of cities within the country has stored 50 cities within itself, do not add this new city to this field.
- What if a city changes ?  
Well, as a rule, we should find the country related to that city and check whether this city is stored in the field of cities of that country or not, if yes, we should correct it.
- What if a city is removed ?  
We need to find the country associated with the city and if this city is present in the field of cities of that country, we should modify that field as well. How? First, we remove this city from the array of cities, then we check whether this field has reached the limited number that we have previously considered for it, if yes, then this country may have other cities that are not in this field. So we need to find one of them and add it to this field.  

All this was added just so that we can have its cities when receiving a country!  
Don't worry, it's worth it. Because we usually add cities and countries once, besides, its information does not change much (except for the population, which we will talk about later). And on the other hand, these cities and countries will be received many times.
  
Now, what if we want to get the 50 most populous countries along with the 50 most populous cities of that country?  
We can add a new field to the country. Pay attention to the following code:
```ts
const CountrySchema = new mongoose.Schema ({
  name: String,
  abb: String,
  population: Number,
  cities: [{
    name: String,
    abb: String,
    population: Number,
  }],
  mostPopulousCities: [{
    name: String,
    abb: String,
    population: Number,
  }],
});
```
For `mostPopulousCities` Field, we should consider all the events that happened above, although with a slight change:

### Lesan
  
اول راجع به ایمکه رابطه چی هست حرف می‌زنم، بعد می‌گم اس‌کیوال فقط کانکشن برقرار می‌کنه، بعد می‌گم نواس‌کیوال هم فقط امبد می‌کنه و مدیریت درست نداره.   

بعد میام راجع به اینکه هر فیلد پر تغییری می‌تونه به رابطه تبدیل بشه حرف می‌زنم، مثال بانک و ثبت احوال کشورها رو می‌گم.  

بعد میام راجع به اینکه رابطه‌های دو سر چندتایی نمی‌تونه دو سر بی انتها داشته باشه حرف می‌زنم و چندتا مثال می‌زنم.  

 بعد راجع به آپدیت شدن رابطه‌ها حرف می‌زنم.  

بعد راجع به دیتابیس اینمموری حرف می‌زنم.  

بعد راجع به مدیریت کیوکیو حرف می‌زنم.  


حتما یادم باشه راجع به اینکه وقتی امبد می‌کنی چقدر دریافت داده‌ها راحت هست هم حرف بزنیم، از اون طرف راجع به اینکه فیلتر کردنشون بر اساس فیلد امبد شده چه معجزه‌ای میکنه هم حرف بزنم  

حتما راجع به اینکه چه نکته‌هایی داره طراحی مدل توی لسان حرف بزنم یعنی اینکه بگم رابطه‌ها از یک طرف تعریف می‌شن بعد توی طرف بعدی از همینجا ساید افکت‌هاش مشخص میشه بگم و اینکه نگران نباشن چون توی پلی‌گراند می‌تونن برای یک مدل همه‌ی رابطه‌هایی که داره چه از طرف خودش تعریف شده باشه چه بقیه براش تعریف کرده باشن رو ببینه و یه عکس از پلی‌گراند بذارم، نکته مهمش اینه که بگم همیشه رابطه رو از طرف مهمش درخواست بدن تا بشه هر چقدر می‌خوایم ساید افکت مناسب براش بذاریم
