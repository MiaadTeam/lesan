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

 *interface of Act is include of two features: validator of function and fn*

 <br>

- [`Struct`](https://docs.superstructjs.org/)
