# addPureModel

```ts
addPureModel: (name: string, pureModel: IPureFields)
```

_Add pure feature of model to schema_

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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const getPostPureModel = coreApp.schemas.addPureModel("post", {name: string(), title: string(),});</p>
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
  "pure": {
    "title": {
      "type": "string",
      "schema": null
    }
  },
  "relations": {},
  "mainRelations": {},
  "relatedRelations": {}
}
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
  name: string,
  pureModel: <a href="../../types/schema/IPureFields.md" target="_blank" style="text-decoration: none; cursor:pointer">IPureFields</a>
  </code>
</pre>
