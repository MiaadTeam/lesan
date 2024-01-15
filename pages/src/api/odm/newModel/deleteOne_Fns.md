# deleteOne

delete country

lets add `deleteCountry` functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
  const deleteCountryValidator = () => {
        return object({
            set: object({
            _id: string(),
            }),
            get: coreApp.schemas.selectStruct("country", 1),
        });
    };
    const deleteCountry: ActFn = async (body) => {
        const {
            set: { _id },
            get,
        } = body.details;
        <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
        return await countries.deleteOne({
            filter: { _id: new ObjectId(_id) },
            hardCascade: true,
        });
        </p>
    };
    coreApp.acts.setAct({
        schema: "country",
        actName: "deleteCountry",
        validator: deleteCountryValidator(),
        fn: deleteCountry,
    });

  </code>
  </pre>
</details>

`deleteOne` functions accept three inputs:
- `filter` which is mongodb [deleteOne](https://mongodb.github.io/node-mongodb-native/6.3/types/Filter.html) query operation
- and optional `option` which is mongodb [findOption](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/DeleteOptions.html)
- ‍‍‍‍‍‍‍‍`hardCascade` :  If it is correct, all the documents related to ind will be deleted, and if it is not, it will lead to an error

You can also read mongodb [`deleteOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/) section for more information.  

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
        {
            body: true,
            success: true
        }
    </code>
  </pre>
</details>
