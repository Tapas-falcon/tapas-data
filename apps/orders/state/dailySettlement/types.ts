import { Filter } from "@/api/types";

export interface TH {
    i18nKey: string;
    width?: string;
    align: Align;
    unit: boolean;
    sortable: boolean;
    minWidth?: string;
    bind: (keyof DailyStettlement) | (keyof DailyStettlement)[];
};

export enum Align {
    Left,
    Right,
    Center,
}

export type Order = 'asc' | 'desc';

export const Columns: TH[] = [{
    width: "10.5rem",
    i18nKey: "ReportID",
    sortable: false,
    unit: false,
    align: Align.Left,
    bind: "id",
}, {
    width: "10.5rem",
    i18nKey: "TodayIncome",
    sortable: true,
    unit: true,
    align: Align.Right,
    bind: ["totalPos", "totalCash"],
}, {
    i18nKey: "TotalPOSIncome",
    minWidth: "10.5rem",
    sortable: true,
    unit: true,
    align: Align.Right,
    bind: "totalPos",
}, {
    i18nKey: "TotalCashIncome",
    minWidth: "10.5rem",
    sortable: true,
    unit: true,
    align: Align.Right,
    bind: "totalCash",
}, {
    i18nKey: "TotalCashWithDrawal",
    minWidth: "10.5rem",
    sortable: true,
    unit: true,
    align: Align.Right,
    bind: "totalCashWithdrawal",
}, {
    i18nKey: "OrdersCount",
    minWidth: "10.5rem",
    sortable: true,
    unit: true,
    align: Align.Right,
    bind: "orders",
}, {
    width: "10.5rem",
    i18nKey: "ReportBy",
    sortable: false,
    unit: false,
    align: Align.Left,
    bind: "reportBy",
}, {
    width: "8.5rem",
    i18nKey: "ReportDate",
    sortable: true,
    unit: false,
    align: Align.Left,
    bind: "date",
}];

const createData = (
    id: string,
    DTIncome: number,
    DTPOSIncome: number,
    TOTCashIncome: number,
    TOTCashWithDrawal: number,
    ordersCount: number,
    reportBy: string,
    reportDate: Date
) => ({ id, DTIncome, DTPOSIncome, TOTCashIncome, TOTCashWithDrawal, ordersCount, reportBy, reportDate });

export interface DailyStettlementState {
    list: DailyStettlement[];
    currentItem?: DailyStettlement;
    filters: Filter[];
    pageInfo: PageInfo;
}

export interface PageInfo {
    total: number;
    pageSize: number;
    pageCount: number;
    currenPage: number;
}

export interface DailyStettlement {
    bind: any;
    id: string;
    totalCash: number;
    totalPos: number;
    totalCashWithdrawal: number;
    orders: number;
    reportBy: { name: string; code: string };
    date: Date;
    status: DailyStettlementStatus;
}

export enum DailyStettlementStatus {
    RPT_PENDING = 'RPT_PENDING',
    RPT_IN_PROGRESS = 'RPT_IN_PROGRESS',
    RPT_COMPLETED = 'RPT_COMPLETED',
    RPT_CANCELED = 'RPT_CANCELED',
    RPT_ERROR = 'RPT_ERROR',
}