# getActs
```ts
getActs: ( schema: string ) 
```

get actions of schema of main service
 <h3 style="margin-top: 0">Example</h3>
<!-- >> return `getCityActs` -->

<details>
  <summary>
    example
  </summary>
  <pre>
    <code class="language-ts">
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

  <p style="background: #434343; border-radius: 5px; padding: 5px 1rem;">const getCityActs = coreApp.acts.getActs("city");</p>

</code>
  </pre>
</details>

<details>
  <summary>
    return of example:
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
param schema - name of schema
param type - type of sctions of service dynamic or static
```
<style>
  summary {
    cursor: pointer;
    margin-bottom: 1rem;
    font-weight: bold;
    color: gainsboro;

  }
 
</style>