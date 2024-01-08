# getActs
```ts
getActs: ( schema: string ) 
```

get actions of schema of main service

<!-- >> return `getCityActs` -->

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

  <p style=" border-radius: 5px; padding: 5px 1rem; background-color: #7A7A7A">const getCityActs = coreApp.acts.getActs("city");</p>


</code>
  </pre>
</details>

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-json">
  "addCity": {
    "validator": {
      "type": "object",
      "schema": {
        "set": {
          "type": "object",
          "schema": {
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
            },
            "isCapital": {
              "type": "boolean",
              "schema": null
            },
            "country": {
              "type": "union",
              "schema": null
            }
          }
        },
      }
    },
    "validationRunType": "assert"
  }

</code>
  </pre>
</details>

### Parameters
```ts
schema: string
```

