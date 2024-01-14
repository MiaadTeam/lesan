# ActInp

```ts
export interface ActInp {
  schema: string;
  actName: string;
  validator: Struct<any>;
  fn: ActFn;
  preAct?: Function[];
  preValidation?: Function[];
  validationRunType?: "assert" | "create";
}
```

_ActInp is type of action in lesan for set action function_

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="https://docs.superstructjs.org/" target="_blank" style="text-decoration: none; cursor:pointer">Struct</a>
    <a href="./Acts/Act/ActFn.md" target="_blank" style="text-decoration: none; cursor:pointer">ActFn</a>
  </code>
</pre>
