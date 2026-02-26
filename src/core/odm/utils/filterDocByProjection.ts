export const filterDocByProjection = (
  doc: Record<string, any>,
  projection: object,
) => {
  const projectionedDoc: Record<string, any> = {};

  for (const key in projection) {
    projectionedDoc[key] = doc[key];
  }
  return projectionedDoc;
};
