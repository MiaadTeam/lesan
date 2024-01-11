# Services types

```ts
export interface Services {
  main: Acts;
  [key: string]: Acts | string | undefined;
}
```

*service inteface is include main service and functions and also maybe include other services*
</br>

*main services is type of Acts , other services maybe type of string or Act:*
</br>
*if type of string we get answer of req with http Request , but if type of it equal to Acts with answer to req directly*
</br>
</br>


the `Services` type has the following type :
- [`Acts`](./Acts.md) 
