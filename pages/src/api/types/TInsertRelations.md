# TInsertRelations

```ts
type TInsertRelations<T extends IRelationsFileds> = {
  [mainKey in keyof T]?: {
    _ids: ObjectId | ObjectId[];
    relatedRelations?: {
      [key in keyof T[mainKey]["relatedRelations"]]: boolean;
    };
  };
};
```

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./TInsertRelations/IRelationsFileds.md" target="_blank" style="text-decoration: none; cursor:pointer">IRelationsFileds</a>
  </code>
</pre>
