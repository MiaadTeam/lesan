// import { ActFn, ObjectId } from "../../../deps.ts";
// import { ecommerceApp, wareType } from "../../../mod.ts";
//
// export const addWareTypeFn: ActFn = async (body) => {
//     const {
//         set: { name, description },
//         get,
//     } = body.details;
//
//     const acts = ecommerceApp.acts.getAtcsWithServices();
//     /*
//   *  @LOG @DEBUG @INFO
//   *  This log written by ::==> {{ syd }}
//   *
//   *  Please remove your log after debugging
//   */
//     console.group("acts ------ ");
//     console.log(" ============= ");
//     console.log();
//     console.info({ acts }, " ------ ");
//     console.log();
//     console.log(" ============= ");
//     console.groupEnd();
//
//     const createdWareType = await wareType.insertOne({
//         name,
//         description,
//     });
//
//     return Object.keys(get).length != 0
//         ? await wareType.findOne({ _id: new ObjectId(createdWareType) }, get)
//         : { _id: createdWareType };
/
