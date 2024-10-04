export function minutesToHours(minutes) {
  if (!minutes) return;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours == 0) return `${mins} minute`;
  if (mins == 0) return `${hours} hour`;
  return `${hours} hour and ${mins} minute`;
}

export const timeZoneOffset = {
  EST: -5,
  CST: -6,
  MST: -7,
  PST: -8,
};
