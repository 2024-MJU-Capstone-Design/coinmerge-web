export function numberWithCommas(x: number) {
  if (!x) {
    if (Number(x) === 0) return "0";
    return "...";
  }
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
