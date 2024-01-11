# getActsKeys
```ts
getActsKeys: (
  service: keyof typeof acts,
  schema: string,
)
```

*get actions of schema of specific service*

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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000">const getCityActsKeys = coreApp.acts.getActsKeys("main", "city");</P>
    </code>
  </pre>
</details>

<details>
  <summary>
    Return Of Example
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
      [
        "addCity",
        "updateCity",
        "addCities",
        "getCities",
        "addCityCountry"
      ]
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
      schema: string;
      service: keyof typeof acts;
      acts: <a href="../../types/Services/main.md" style="text-decoration: none; cursor:pointer">Services</a>; 
  </code>
</pre>


