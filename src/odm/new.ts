
    const insertOneData = async (
        collection: string,
        doc: InsertDocument<Bson.Document>,
        relation: Record<string, ObjectId | ObjectId[]>,
        options?: InsertOptions,
    ) => {
        const db = getDbClient();
        const pureInrelSchema = schemaFns(schemasObj).getPureInRel(collection);
        const foundedSchema = schemaFns(schemasObj).getSchema(collection);
        const inrelationObj = schemaFns(schemasObj).getSchema(collection).inrelation;

        // console.log("doc================>", doc);
        for (const key in inrelationObj) {
            if (inrelationObj[key].optional === false) {
                if (!Array.isArray(relation[inrelationObj[key].schemaName])) {
                    const res = await findOneData(inrelationObj[key].schemaName, {
                        _id: relation[inrelationObj[key].schemaName],
                    }, {});
                    doc[key] = res;
                    // doc = Object.assign(res, doc);
                } else {
                    const res = await findData(inrelationObj[key].schemaName, {
                        _id: { $in: relation[inrelationObj[key].schemaName] },
                    });
                    doc[key] = res;
                }
            }
        }
        assert(doc, object(pureInrelSchema));

        doc = addOutrelation(collection, doc, foundedSchema);

        doc._id = db
            ? await db.collection(collection).insertOne(doc, options)
            : throwError("No database connection");

        // console.log(result);

        checkRelation(collection, inrelationObj, schemasObj, doc, db);

        return doc._id;
    };