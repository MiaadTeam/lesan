# setService

```ts
 setService: (serviceName: keyof typeof acts, service: Acts | string)
```

_set acts to service or ser addreess to service_

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

  <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line">const setMainService = coreApp.acts.setService("main", "main");</P>

</code>
  </pre>
</details>

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
      "main" 
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
    serviceName: keyof typeof acts,
    service: <a href="../../types/Services/Acts.md" target="_blank" style="text-decoration: none; cursor:pointer">Acts</a> | string,
    acts: <a href="../../types/Services/Services.md" target="_blank" style="text-decoration: none; cursor:pointer">Services</a>
  </code>
</pre>
