import { Option } from "@/state/dishes/types";
import { OrderStatus, OrderSubStatus } from "@/state/order/types";
export interface RequestParams {
    path?: string;
    body?: Record<string, any>;
}

export type Sort<T> = { field: T; type: keyof typeof SortType };

export type Filter = { field: string; values: string[]; search?: string };

export type ListReqParams = {
    pageInfo?: {
        pageSize?: number;
        pageIndex?: number;
    };
    filters?: Filter[];
    sorts?: Sort<string>[];
    search?: { value: string; searchBy: string[]; and?: boolean };
    lang: string;
}

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
    pageSize?: number;
    pageIndex?: number;
}

export interface queryReq {
    pageInfo: pageInfo;
    filters?: Filter[];
    sorts?: Sort<string>[];
    search?: { value: string; searchBy: string[]; and?: boolean };
    lang: LanguageCode;
}

export interface createOrderParams {
    storeId?: string; // 注此处为店面显示ID非主键ID
    tableId?: string;
    gustNum?: number;
    createdBy?: string;
    dishesId: string; // 菜品主键
    options?: (Option | { optionId: string; extra?: number })[]; // 购买选项修改
    quantity?: number; // 购买数量修改
    price?: number; // 单价
}

export interface updateDishesWithNewOperateParams extends createOrderParams{
    orderId: string;
}

export interface updateDishesParams {
    operateId: string; // 操作记录ID
    createdBy: string;
    dishesId: string; // 菜品主键
    options?: (Option | { optionId: string; extra?: number })[]; // 购买选项修改
    quantity?: number; // 购买数量修改
    price?: number; // 单价
}

export interface updateOrderStatusParams{
    orderId: string;
    status?: OrderStatus;
    subStatus?: OrderSubStatus;
}