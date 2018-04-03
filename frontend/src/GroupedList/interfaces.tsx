export interface GroupedItems<T extends {}> {
  group: string;
  elements: T[];
}

export interface Spec {
  humanReadableName: string;
  color: string;
}

export type TypeToSpecMapping = { [key: string]: Spec };

export interface GroupSpec {
  humanReadableName: string;
  groupBy: string;
  sortBy: string;
  reverse: boolean;
}

export type TitleToGroupSpecMapping = { [key: string]: GroupSpec };