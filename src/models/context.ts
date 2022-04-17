/// context type ----
//
/**
 * Context Holds values and carries them in functions.
 * @example
 * {
 *    Request: "values of Req",
 *      user: {
 *           "_id":1,
 *           "name":"ali",
 *           "lastName":"Alavi"
 *           "role":"Admin"
 *      }  *
 */
export interface Context {
    [key: string]: any;
}

/**
 * this function is create for define all things in local scope
 *  and also  all functions of context define in this function
 * @returns - return objects of all functions that define in this function
 */
export const contextFns = () => {
    /**
     *  variable of context
     *  @defaultValue
     *   the value of context is '{}'
     */
    let context: Context = {};

    /**
     * @returns The contextObj
     */
    const getContextModel = () => context;
    /**
     * asigne all of value that we want to carry
     *  @param con - objects of key , value
     * @returns nothing
     */
    const addContexts = (con: Context) => context = con;

    /**
     * add values to previous values that we want to carry
     *  @param con - objects of key , value
     * @returns nothing
     */
    const addContext = (con: Context) => context = { ...context, con };
    /**
     * add Request to Context because the requeste may be required in later functions
     *  @param con - request of user
     * @returns nothing
     */
    const addReqToContext = (con: Request) => context["Request"] = con;

    return {
        getContextModel,
        addContexts,
        addContext,
        addReqToContext,
    };
};
