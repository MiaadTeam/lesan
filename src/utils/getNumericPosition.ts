export const getNumericPosition = (
  arr: Record<string, any>[],
  num: number,
  fieldName: string,
  type: "asc" | "desc",
) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid][fieldName] === num) {
      return mid;
    } else if (arr[mid][fieldName] < num) {
      type === "asc" ? (left = mid + 1) : (right = mid - 1);
    } else {
      type === "asc" ? (right = mid - 1) : (left = mid + 1);
    }
  }
  return left;
};
