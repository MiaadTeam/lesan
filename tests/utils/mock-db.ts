import { Db, ObjectId } from "../../src/npmDeps.ts";

export class MockCollection {
  public name: string;
  public documents: any[];

  constructor(name: string) {
    this.name = name;
    this.documents = [];
  }

  async insertOne(doc: any, options?: any) {
    const newDoc = { ...doc };
    if (!newDoc._id) {
      newDoc._id = new ObjectId();
    }
    this.documents.push(newDoc);
    return { insertedId: newDoc._id, acknowledged: true };
  }

  async insertMany(docs: any[], options?: any) {
    const newDocs = docs.map((doc) => {
      const newDoc = { ...doc };
      if (!newDoc._id) {
        newDoc._id = new ObjectId();
      }
      return newDoc;
    });
    this.documents.push(...newDocs);
    return {
      insertedIds: newDocs.reduce((acc, doc, index) => {
        acc[index] = doc._id;
        return acc;
      }, {} as Record<number, ObjectId>),
      acknowledged: true,
    };
  }

  async findOne(query: any, options?: any) {
    const doc = this.documents.find((d) => {
      for (const key in query) {
        if (query[key] instanceof ObjectId && d[key] instanceof ObjectId) {
          if (query[key].toString() !== d[key].toString()) return false;
        } else if (d[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (!doc) return null;

    if (options?.projection) {
      const projectedDoc: any = {};
      for (const key in options.projection) {
        if (options.projection[key] === 1 && doc[key] !== undefined) {
          projectedDoc[key] = doc[key];
        }
      }
      // _id is included by default unless explicitly excluded
      if (options.projection._id !== 0) {
        projectedDoc._id = doc._id;
      }
      return projectedDoc;
    }

    return doc;
  }

  async updateOne(query: any, update: any, options?: any) {
    const docIndex = this.documents.findIndex((d) => {
      for (const key in query) {
        if (query[key] instanceof ObjectId && d[key] instanceof ObjectId) {
          if (query[key].toString() !== d[key].toString()) return false;
        } else if (d[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (docIndex === -1) {
      if (options?.upsert) {
        const newDoc = { ...query };
        if (update.$set) {
          Object.assign(newDoc, update.$set);
        }
        if (!newDoc._id) {
          newDoc._id = new ObjectId();
        }
        this.documents.push(newDoc);
        return {
          matchedCount: 0,
          modifiedCount: 0,
          upsertedCount: 1,
          upsertedId: newDoc._id,
          acknowledged: true,
        };
      }
      return {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
        acknowledged: true,
      };
    }

    const doc = this.documents[docIndex];
    let modified = false;

    if (update.$set) {
      for (const key in update.$set) {
        if (doc[key] !== update.$set[key]) {
          doc[key] = update.$set[key];
          modified = true;
        }
      }
    }

    if (update.$push) {
      for (const key in update.$push) {
        if (!Array.isArray(doc[key])) {
          doc[key] = [];
        }
        doc[key].push(update.$push[key]);
        modified = true;
      }
    }

    return {
      matchedCount: 1,
      modifiedCount: modified ? 1 : 0,
      upsertedCount: 0,
      upsertedId: null,
      acknowledged: true,
    };
  }

  async deleteOne(query: any, options?: any) {
    const docIndex = this.documents.findIndex((d) => {
      for (const key in query) {
        if (query[key] instanceof ObjectId && d[key] instanceof ObjectId) {
          if (query[key].toString() !== d[key].toString()) return false;
        } else if (d[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (docIndex === -1) {
      return { deletedCount: 0, acknowledged: true };
    }

    this.documents.splice(docIndex, 1);
    return { deletedCount: 1, acknowledged: true };
  }

  find(query: any, options?: any) {
    const docs = this.documents.filter((d) => {
      for (const key in query) {
        if (query[key] instanceof ObjectId && d[key] instanceof ObjectId) {
          if (query[key].toString() !== d[key].toString()) return false;
        } else if (d[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    return {
      toArray: async () => {
        if (options?.projection) {
          return docs.map((doc) => {
            const projectedDoc: any = {};
            for (const key in options.projection) {
              if (options.projection[key] === 1 && doc[key] !== undefined) {
                projectedDoc[key] = doc[key];
              }
            }
            if (options.projection._id !== 0) {
              projectedDoc._id = doc._id;
            }
            return projectedDoc;
          });
        }
        return docs;
      },
    };
  }
}

export class MockDb {
  public collections: Map<string, MockCollection>;

  constructor() {
    this.collections = new Map();
  }

  collection(name: string): MockCollection {
    if (!this.collections.has(name)) {
      this.collections.set(name, new MockCollection(name));
    }
    return this.collections.get(name)!;
  }

  // Type assertion to allow using MockDb where Db is expected
  asDb(): Db {
    return this as unknown as Db;
  }
}
