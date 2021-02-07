

const content=`
import { Bson } from "https://deno.land/x/mongo@v0.21.2/mod.ts";

/**
 *make pagination
 * @param collection - an instance of collection
 * @param query - query of db
 * @param projection - select what is wanted
 * @param limit - limitation of fetched documents
 * @param lastObjectId - last ObjectId that fetch with it
 * @param page - page number
 */
export const makePagination = async <T>(
    collection: any,
    query: Bson.Document,
    projection: Bson.Document,
    sort: any,
    limit?: number,
    lastObjectId?: Bson.ObjectId,
    page?: number
  ): Promise<any[]> => {
    //checks values and specifies default value
  
    //page for server should start from 0
    //page for client should start from 1
    //if page === -1 means we not have page number from client
    page = page ? page - 1 : -1;
    limit = limit ? limit : 25;
    return sort
      ? page > -1
        ? await collection
            .find({ ...query }, { projection })
            .sort(sort)
            .skip(page * limit)
            .limit(limit)
            .toArray()
        : sort._id === -1 //not page  //ascending
        ? await collection
            .find(
              { _id: { $lt: new Bson.ObjectID(lastObjectId) }, ...query },
              { projection }
            )
            .limit(limit)
            .toArray()
        : await collection
            .find(
              { _id: { $gt: new Bson.ObjectID(lastObjectId) }, ...query },
              { projection }
            )
            .limit(limit)
            .toArray()
      : //not sort
      page > -1
      ? await collection
          .find({ ...query }, { projection })
          .skip(page * limit)
          .limit(limit)
          .toArray()
      : await collection
          .find(
            { _id: { $gt: new Bson.ObjectID(lastObjectId) }, ...query },
            { projection }
          )
          .limit(limit)
          .toArray();
  };
  `;


export const createMakePagination = async (init: string) => {
    await Deno.writeTextFile(`${init}/makePagination.ts`, content);
  };
  
