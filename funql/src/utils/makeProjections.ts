
export const makeProjections = (
  getObj: any,
  inRelation: string[],
  outRelation: string[]
) => {
  const getClone = { ...getObj };
  inRelation.map((relation) =>
    getClone[relation] ? (getClone[relation] = 1) : (getClone[relation] = 0)
  );
  outRelation.map((relation) => delete getClone[relation]);
  return getClone;
};
