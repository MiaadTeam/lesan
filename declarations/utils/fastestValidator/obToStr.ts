export function obToStr(obj: any) {
  const text = JSON.stringify(obj, null, 2);
  return text.replaceAll('"', " ").replaceAll("{}", "any");
}
