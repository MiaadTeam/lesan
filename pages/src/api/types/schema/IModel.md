# IModel types

```ts
export interface IModel {
  pure: IPureFields;
  relations: Record<string, TRelation>;
  mainRelations: Record<string, IMainRelation>;
  relatedRelations: Record<string, IRelatedRelation>;
}
```

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./model/TRelation.md" target="_blank" style="text-decoration: none; cursor:pointer">TRelation</a>
    <a href="./model/IMainRelation.md" target="_blank" style="text-decoration: none; cursor:pointer">IMainRelation</a>
    <a href="./model/IRelatedRelation.md" target="_blank" style="text-decoration: none; cursor:pointer">IRelatedRelation</a>
  </code>
</pre>
