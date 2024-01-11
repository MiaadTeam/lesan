# TRelation

```ts
export interface TRelation {
  schemaName: string;
  type: RelationDataType;
  optional: boolean;
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
  relatedRelations: {
    [key: string]: TRelatedRelation;
  };
}
```

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./TRelation/RelationDataType.md" target="_blank" style="text-decoration: none; cursor:pointer">RelationDataType</a>
    <a href="./TRelation/RelationSortOrderType.md" target="_blank" style="text-decoration: none; cursor:pointer">RelationSortOrderType</a>
    <a href="./TRelation/TRelatedRelation.md" target="_blank" style="text-decoration: none; cursor:pointer">TRelatedRelation</a>
  </code>
</pre>
