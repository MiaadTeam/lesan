# getSchemasKeys

```ts
getSchemasKeys: ()
```

</br>
<details open>
 <summary>
  Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      const coreApp = lesan();
      const locationPure = {
        name: string(),
        population: number(),
        abb: string(),
      };
      const cities = coreApp.odm.newModel(
        "city",
        locationPure,
        {
          country: {
            schemaName: "country",
            type: "single",
            optional: false,
            relatedRelations: {
              cities: {
                type: "multiple",
                limit: 5,
                sort: {
                  field: "_id",
                  order: "asc",
                },
              },
            },
          },
        },
      );
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000" >const getSchemasKeys = coreApp.schemas.getSchemasKeys();</p>
    </code>
  </pre>
</details>

<details>
  <summary>
    Return Of Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      ["country", "city", "user"]
    </code>
  </pre>
</details>
