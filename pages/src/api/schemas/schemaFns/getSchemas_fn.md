# getSchemas functions

```ts
getSchemas: ()
```

_Get object of schema_

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
  <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line"" >const getSchemas = coreApp.schemas.getSchemas();</p>
    </code>
  </pre>

<details>
  <summary>
    Return Of Example
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
    {
      "country": {
        "pure": {
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
        },
        "relations": {},
        "mainRelations": {},
        "relatedRelations": {
          "users": {
            "mainRelationName": "country",
            "mainRelationType": "single",
            "schemaName": "user",
            "type": "multiple",
            "limit": 5,
              "sort": {
                "field": "\_id",
                "order": "desc"
              }
            },
          }
        },
        "city": {
          "pure": {
            "\_id": {
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
          },
        "relations": {
          "country": {
            "schemaName": "country",
            "type": "single",
            "optional": false,
            "relatedRelations": {
              "citiesAsc": {
                "type": "multiple",
                "limit": 5,
                "sort": {
                  "field": "\_id",
                  "order": "asc"
                }
              },
            "citiesDesc": {
            "type": "multiple",
            "limit": 5,
            "sort": {
              "field": "\_id",
              "order": "desc"
            }
        },
        }
        }
        },
        "mainRelations": {
        "country": {
        "schemaName": "country",
        "type": "single",
        "optional": false
        }
        },
        "relatedRelations": {
        "users": {
        "mainRelationName": "livedCities",
        "mainRelationType": "multiple",
        "schemaName": "user",
        "type": "multiple",
        "limit": 5,
        "sort": {
        "field": "\_id",
        "order": "desc"
        }
        },
        }
        },
        "user": {
        "pure": {
        "\_id": {
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
        },
        "relations": {
        "livedCities": {
        "optional": false,
        "schemaName": "city",
        "type": "multiple",
        "sort": {
        "field": "\_id",
        "order": "desc"
        },
        "relatedRelations": {
        "users": {
        "type": "multiple",
        "limit": 5,
        "sort": {
        "field": "\_id",
        "order": "desc"
        }
        }
        }
        },
        },
        "country": {
        "optional": false,
        "schemaName": "country",
        "type": "single",
        "relatedRelations": {
        "users": {
        "type": "multiple",
        "limit": 5,
        "sort": {
        "field": "\_id",
        "order": "desc"
        }
        },
        }
        }
        },
        "mainRelations": {
        "livedCities": {
        "schemaName": "city",
        "type": "multiple",
        "optional": false,
        "sort": {
        "field": "\_id",
        "order": "desc"
        }
        },
        "country": {
        "schemaName": "country",
        "type": "single",
        "optional": false
        }
        },
        "relatedRelations": {}
  }

</code>
  </pre>
</details>
