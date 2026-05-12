export const isValidNumber = (value: number) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;
