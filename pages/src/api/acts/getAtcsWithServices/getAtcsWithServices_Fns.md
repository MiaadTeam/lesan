# getAtcsWithServices

```ts
getAtcsWithServices: ()
```

_Get all acts of all service_

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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000" >const getAtcsWithServices = coreApp.acts.getAtcsWithServices();</p>
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
  "main": {
    "country": {
      "addCountry": {
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
                    .
                    .
                    .
    </code>
  </pre>
</details>
