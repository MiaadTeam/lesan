import { wareTypes } from "../../../../../libs/dbs/schemas/ecommerce/mod.ts";
import { throwError } from "../../../../utils/throwError.ts";
import { ActFn } from "../../../deps.ts";
import { ObjectId } from "../../../deps.ts";
import { wareType } from "../../../mod.ts";
export const updateWareTypeFn: ActFn = async (body) => {
    const {
        set: { _id, name, description },
        get,
    } = body.details;
    const foundedWareType = await wareType.findOne({ _id: new ObjectId(_id) }, {
        _id: 1,
    });
    !foundedWareType && throwError("wareType not exist");
    // TODO QueryQueue for update for example ware
    await wareType.updateOne({ _id: new ObjectId(_id) }, {
        name,
        description,
    });
    return Object.keys(get).length != 0
        ? await wareType.findOne({ _id: new ObjectId(_id) }, get)
        : { _id: _id };
};
