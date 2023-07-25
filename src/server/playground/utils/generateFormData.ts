export const generateFormData = (
  formData: Record<string, any>,
  returnFormData: Record<string, any>,
  keyname: string,
) => {
  for (const key in formData) {
    typeof formData[key] === "object"
      ? generateFormData(
        formData[key],
        returnFormData,
        keyname ? `${keyname}.${key}` : key,
      )
      : (returnFormData[`${keyname}.${key}`] = formData[key]);
  }
  return returnFormData;
};
