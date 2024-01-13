# getPureFromMainRelations

```ts
getPureFromRelatedRelations: (schemaName: string)
```

</br>
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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const getCityPureFromMainRelations = coreApp.schemas.getPureFromMainRelations("city");</p>
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
  "country": {
    "type": "object",
    "schema": {
      "_id": {
        "type": "union",
        "schema": null
      },
      "name": {
        "type": "string",
        "schema": null
      },
      "population": {
        "type": "number",
        "schema": null
      },
      "abb": {
        "type": "string",
        "schema": null
      }
    }
  }
}
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
  schemaName: string
  </code>
</pre>
