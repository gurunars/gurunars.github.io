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

export const durationToString = (duration: Duration) =>
  duration.start + " - " + (duration.end || "NOW");