# IRelatedRelation

```ts
export interface IRelatedRelation {
  schemaName: string;
  mainRelationName: string;
  mainRelationType: RelationDataType;
  type: RelationDataType;
  limit?: null | number;
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}
```

_if schema has relation with other schema and in SQL that we dont keep foriegn key._
<br>

_store in OutRelation feature and usually the number of it greater thant of 50_

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./TRelation/RelationDataType.md" target="_blank" style="text-decoration: none; cursor:pointer">RelationDataType</a>
  </code>
</pre>
