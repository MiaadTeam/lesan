# Act

```ts
export interface Act {
  validator: Struct<any>;
  fn: ActFn;
  preAct?: Function[];
  preValidation?: Function[];
  validationRunType?: "assert" | "create";
}
```

_interface of Act is include of two features: validator of function and fn_
<br>

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="https://docs.superstructjs.org/" target="_blank" style="text-decoration: none; cursor:pointer">Struct</a>
    <a href="./Act/ActFn.md" target="_blank" style="text-decoration: none; cursor:pointer">ActFn</a>
  </code>
</pre>
