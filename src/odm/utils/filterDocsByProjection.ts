export const filterDocsByProjection = (
  array: Record<string, any>[],
  filter: object,
) => {
  const filtered: Record<string, any>[] = [];
  for (const obj of array) {
    const newObj: Record<string, any> = {};
    for (const key in filter) {
      newObj[key] = obj[key];
    }
    filtered.push(newObj);
  }
  return filtered;
};
