# setAct

```ts
setAct: (actInp: ActInp)
```

_set Actions to main service_

<br>
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

  <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line">const setAddCityAct = coreApp.acts.setAct({
  schema: "city",
  actName: "addCity",
  validator: addCityValidator(),
  fn: addCity,
});</P>

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
  "validator": {
    "type": "object",
    "schema": {
      "set": {
        "type": "object",
        "schema": {
          "name": { "type": "string", "schema": null },
          "population": { "type": "number", "schema": null },
          "abb": { "type": "string", "schema": null },
          "isCapital": { "type": "boolean", "schema": null },
          "country": { "type": "union", "schema": null }
        }
      },
      "get": {
        "type": "object",
        "schema": {
          "_id": { "type": "enums", "schema": { "0": 0, "1": 1 } },
          "name": { "type": "enums", "schema": { "0": 0, "1": 1 } },
          "population": { "type": "enums", "schema": { "0": 0, "1": 1 } },
          "abb": { "type": "enums", "schema": { "0": 0, "1": 1 } },
          "country": {
            "type": "object",
            "schema": {
              "_id": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "name": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "population": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "abb": { "type": "enums", "schema": { "0": 0, "1": 1 } }
            }
          },
          "users": {
            "type": "object",
            "schema": {
              "_id": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "name": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "age": { "type": "enums", "schema": { "0": 0, "1": 1 } }
            }
          },
          "lovedByUser": {
            "type": "object",
            "schema": {
              "_id": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "name": { "type": "enums", "schema": { "0": 0, "1": 1 } },
              "age": { "type": "enums", "schema": { "0": 0, "1": 1 } }
            }
          }
        }
      }
    }
  },
  "validationRunType": "assert"
}
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    actInp: <a href="../../types/Services/ActInp.md" target="_blank" style="text-decoration: none; cursor:pointer">ActInp</a>
  </code>
</pre>
