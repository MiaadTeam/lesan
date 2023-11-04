export const createNestedObjectsFromKeys = (
  obj: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = { get: {}, set: {} };

  // For each object path (property key) in the object
  for (const objectPath in obj) {
    if (obj[objectPath] || obj[objectPath] === 0 || obj[objectPath] === false) {
      // Split path into component parts
      const parts = objectPath.split(".");

      // Create sub-objects along path as needed
      let target: Record<string, any> = result;
      while (parts.length > 1) {
        const part = parts.shift()!;
        target[part] = target[part] || {};
        target = target[part];
      }

      // Set value at end of path
      target[parts[0]] = obj[objectPath];
    }
  }

  return result;
};
