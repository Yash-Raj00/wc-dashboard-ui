export function minutesToHours(minutes) {
  if (!minutes || minutes === 0) return 0;
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  if (hours <= 0) return `${mins} minute(s)`;
  if (mins <= 0) return `${hours} hour(s)`;
  return `${hours} hour(s) and ${mins} minute(s)`;
}

export const timeZoneOffset = {
  EST: -5,
  CST: -6,
  MST: -7,
  PST: -8,
};
