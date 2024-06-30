import { Filter, Sort, pageInfo } from "../common";

export interface RetailRevenueState {
    list: Revenue[],
    selectedOptions: { [x: string]: any; };
    filters: Filter[],
    sorts: Sort<string>[],
    pageInfo: pageInfo
};

export interface Revenue {
    id: string;
    date: Date;
    stores: number[];
}