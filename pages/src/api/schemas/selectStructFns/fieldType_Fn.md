# fieldType

```ts
const fieldType = optional(enums([0, 1]));
```

<details open>
 <summary>
  Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
const cities = coreApp.odm.newModel("city", locationPure, {
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
});
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000" >const fieldType = coreApp.schemas.fieldType;</p>
    </code>
  </pre>
</details>

<details>
  <summary>
    Return Of Example
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
{
  "type": "enums",
  "schema": {
    "0": 0,
    "1": 1
  }
}
    </code>
  </pre>
</details>
