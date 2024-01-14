# selectStruct

```ts
const selectStruct = <T>(schema: keyof TSchemas, depth: number | T = 2)
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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const selectStruct = coreApp.schemas.selectStruct("city", {});</p>
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
  "type": "object",
  "schema": {
    "_id": {
      "type": "enums",
      "schema": {
        "0": 0,
        "1": 1
      }
    },
    "name": {
      "type": "enums",
      "schema": {
        "0": 0,
        "1": 1
      }
    },
    "population": {
      "type": "enums",
      "schema": {
        "0": 0,
        "1": 1
      }
    },
    "abb": {
      "type": "enums",
      "schema": {
        "0": 0,
        "1": 1
      }
    }
  }
}
    </code>
  </pre>
</details>

<h3 style="margin-top:0">Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
  schema: keyof <a href="../../types/schema/Tschemas.md" target="_blank" style="text-decoration: none;   cursor:pointer">TSchemas</a>,
  depth: number | T = 2
  </code>
</pre>
