import { Filter, Sort, pageInfo } from "../common";

export interface RetailRevenueState {
    stories: Store[]
    list: Revenue[],
    selectedOptions: { [x: string]: any; };
    filters: Filter[],
    sorts: Sort<string>[],
    pageInfo: pageInfo
};

export interface Revenue {
    date: Date;
    stores: number[];
}

export interface Store {
    id: string;
    name: string;
    address: string;
    manager: string;
}