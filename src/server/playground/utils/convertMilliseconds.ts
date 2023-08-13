/** @jsx h */

export function ConvertMilliseconds(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor(((milliseconds % 360000) % 60000) / 1000);

  return hours > 0
    ? `${hours}h ${minutes}m ${seconds}s`
    : minutes > 0
    ? `${minutes}m ${seconds}s`
    : seconds > 0
    ? `${seconds}s`
    : `${milliseconds}ms`;
}
