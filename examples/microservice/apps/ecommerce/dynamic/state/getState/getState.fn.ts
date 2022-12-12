import { ActFn, Bson } from "../../../deps.ts";
import { state } from "../../../mod.ts";

export const getStateFn: ActFn = async (body) => {
    const {
        set: { _id },
        get,
    } = body.details;

    const obId = new Bson.ObjectId(_id);

    // TODO : check should reture all depts that client wanted
    return await state.findOne({ _id: obId }, get);
};
