# Services types

```ts
export interface Services {
  main: Acts;
  [key: string]: Acts | string | undefined;
}
```

_service inteface is include main service and functions and also maybe include other services_
</br>

_main services is type of Acts , other services maybe type of string or Act:_
</br>
_if type of string we get answer of req with http Request , but if type of it equal to Acts with answer to req directly_
</br>

<h3>Types</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    <a href="./Acts.md" target="_blank" style="text-decoration: none; cursor:pointer">Acts</a>
  </code>
</pre>
