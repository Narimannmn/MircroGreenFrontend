export type BearerResult = `Bearer ${string}`;
export const Bearer = (str: string | null): BearerResult => {
  return `Bearer ${str}`;
};
