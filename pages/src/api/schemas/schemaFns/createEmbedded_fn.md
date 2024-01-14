# createEmbedded

```ts
createEmbedded: (schemaName: string)
```

_Create embed features, embed feature is equal to all of pure features of inerRelations and outerRelations_

</br>
<details open>
  <summary>
    Return
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
    <a href="./getPureFromMainRelations_fn.md" target="_blank" style="text-decoration: none;                   cursor:pointer">getPureFromMainRelations</a>
    <a href="./getPureFromRelatedRelations_fn.md" target="_blank" style="text-decoration: none; cursor:pointer">getPureFromRelatedRelations</a>    
    </code>
  </pre>
</details>

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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const createCityEmbedded = coreApp.schemas.createEmbedded("city");</p>
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
  },
  "users": {
    "type": "array",
    "schema": {
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
        "age": {
          "type": "number",
          "schema": null
        }
      }
    }
  },
  "lovedByUser": {
    "type": "array",
    "schema": {
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
        "age": {
          "type": "number",
          "schema": null
        }
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
