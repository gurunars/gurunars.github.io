export interface Duration {
  start: Date;
  end?: Date;
}

export interface Reference {
  name: string;
  url: string;
  type?: string;
}

export interface Item {
  title: string;
  achievements: string[];
  location: Reference;
  references: Reference[];
  type: string;
  tags: string[];
  description: string;
  links: Reference[];
  duration: Duration;
}

const format = (date?: Date | null) =>
  date == null ? null :
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

export const durationToString = (duration: Duration) =>
  format(duration.start) + " - " + (format(duration.end) || "NOW");