export type ApiCustomProperties = {
  response: ApiCustomProperty[];
};

export type ApiCustomProperty = {
  property_name: string;
  value: string | null;
};

export enum CustomProperty {
  TRUE,
  FALSE,
  NOT_APPLICABLE,
}

export type RepoData = {
  name: string;
  isArchived: boolean | undefined;
  html_url: string;
};

export type FullRepoData = RepoData & {
  whiskers: CustomProperty;
};
