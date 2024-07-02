export type Sort<T> = { field: T; type: keyof typeof SortType };

export type Filter = { field: string; values: string[]; search?: string };

export enum SortType {
    ASC = 'asc',
    DESC = 'desc',
}
export enum SupportLanguage {
    'zh' = 'zh',
    'en' = 'en',
    'es' = 'es',
}

export type LanguageCode = keyof typeof SupportLanguage;

export interface pageInfo {
    totalItems: number;
    pageSize: number;
    page: number;
    totalPage: number;
}

export interface queryReq {
    pageInfo: {
      pageSize?: number;
      pageIndex?: number;
    };
    filters?: Filter[];
    sorts?: Sort<string>[];
    search?: { value: string; searchBy: string[]; and?: boolean };
    lang: LanguageCode;
  }
