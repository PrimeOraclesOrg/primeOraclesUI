export const normalizeDecimalInput = (raw: string) => raw.replace(",", ".");

export const isValidDecimalDraft = (raw: string) => {
  return /^\d*([.,]\d*)?$/.test(raw);
};

export const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};
