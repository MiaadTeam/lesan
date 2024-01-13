# getAct

```ts
getAct: (service: keyof typeof acts, schema: string, actName: string)
```

_Get specific action of schema of specific service_

</br>
<details open>
 <summary>
  Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      const cities = coreApp.odm.newModel("city", locationPure, {});
      const setAddCityAct = coreApp.acts.setAct({
        schema: "city",
        actName: "addCity",
        validator: addCityValidator(),
        fn: addCity,
      });
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000" >const getCountryActs = coreApp.acts.getAct("main", "country", "addCountry");</p>
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
      "get": {
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
          },
          "country": {
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
          },
          "users": {
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
              "age": {
                "type": "enums",
                "schema": {
                  "0": 0,
                  "1": 1
                }
              }
            }
          },
          "lovedByUser": {
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
              "age": {
                "type": "enums",
                "schema": {
                  "0": 0,
                  "1": 1
                }
              }
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
    service: keyof typeof acts,
    acts: <a href="../../types/Services/Services.md" target="_blank" style="text-decoration: none; cursor:pointer">Services</a>
    schema: string,
    actName: string
  </code>
</pre>
