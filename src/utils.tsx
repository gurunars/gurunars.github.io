import moment from 'moment'

export const merge = (...sources: Object[]): Object =>
  Object.assign({}, ...sources)

export const hashCode = (str: string): number => {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    /* tslint:disable:no-bitwise */
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}

const YEAR_FMT = 'YYYY-MM-DD'

const sameDays = (one: Date, two: Date) =>
  moment(one).format(YEAR_FMT) === moment(two).format(YEAR_FMT)

const isToday = (date: Date) => sameDays(new Date(), date)

const formatDate = (date: Date, fmt: string) =>
  isToday(date) ? 'TBD' : moment(date).format(fmt)

export const yearToString = (date: Date) => formatDate(date, 'YYYY')

export const dayToString = (date: Date) => formatDate(date, YEAR_FMT)
