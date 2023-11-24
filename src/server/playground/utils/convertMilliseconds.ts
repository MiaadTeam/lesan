export function ConvertMilliseconds(milliseconds: number) {
  const hours = Number((milliseconds / 3600000).toFixed(2));
  const minutes = Number(((milliseconds % 3600000) / 60000).toFixed(2));
  const seconds = Number((((milliseconds % 360000) % 60000) / 1000).toFixed(2));

  return hours > 1
    ? `${hours}h ${minutes} m ${seconds} s`
    : minutes > 1
    ? `${minutes} m ${seconds} s`
    : seconds > 1
    ? `${seconds} s`
    : `${milliseconds} ms`;
}
