export const merge = (...sources: Object[]): Object =>
  Object.assign({}, ...sources);

export const hashCode = (str: string): number => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    /* tslint:disable:no-bitwise */
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

const pad = (num: number) => (num < 10 ? "0" + num : num);

const sameDays = (one: Date, two: Date) =>
  one.getUTCFullYear() === two.getUTCFullYear() &&
  one.getUTCMonth() === two.getUTCMonth() &&
  one.getUTCDate() === two.getUTCDate();

const isToday = (date: Date) => sameDays(new Date(), date);

export const yearToString = (date: Date) => {
  if (isToday(date)) {
    return "NOW";
  } else {
    return pad(date.getUTCFullYear());
  }
};

export const toString = (date: Date) => {
  //  console.log(date);
  if (isToday(date)) {
    return "NOW";
  } else {
    return (
      pad(date.getUTCFullYear()) +
      "-" +
      pad(date.getUTCMonth() + 1) +
      "-" +
      pad(date.getUTCDate())
    );
  }
};
