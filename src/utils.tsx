export const merge = (...sources: Object[]): Object =>
  Object.assign({}, ...sources);

export const hashCode = (str: string): number => {
  let hash = 0;
  if (str.length === 0) { return hash; }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    /* tslint:disable:no-bitwise */
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

export const toString = (date?: Date | null) =>
  date == null ? null :
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();