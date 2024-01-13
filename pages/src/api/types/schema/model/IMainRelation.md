# IMainRelation

```ts
export interface IMainRelation {
  schemaName: string;
  type: RelationDataType;
  optional: boolean;
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}
```

_if schema has relation with other schema and in SQL that we keep foreign key._
<br>

_store in InRelation feature_

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./TRelation/RelationDataType.md" target="_blank" style="text-decoration: none; cursor:pointer">RelationDataType</a>
  </code>
</pre>
