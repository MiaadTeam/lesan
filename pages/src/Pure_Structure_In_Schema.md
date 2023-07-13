# Pure Structure In Schema

As mentioned in the previous section, pure include the pure features of a schema. In fact, the features that are specific to the schema itself, not the relationships it has.

For example, the schema of a city has pure features: city ID, city name, its geographical location, and so on.

The structure of a pure schema is as follows, which includes a key and its type of feature.

```typescript
export interface PureModel {
  [key: string]: Struct<any>;
}
```

for example, the pure features of the city schema are defined as follows:

```typescript
{
  name: string(),
  enName: optional(string()),
  geometries: optional(object({
	type: string(),
	coordinates: array(array(number())),
  })),
};
```
