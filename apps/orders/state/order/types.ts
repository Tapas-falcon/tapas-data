import { CommonState, DiscountLimitType, DiscountType, DishesItem, Promotion, Option } from "../dishes/types";
import { User } from "../type";

export interface OrderState {
    curOrder?: Order;
    orderList?: Order[];
}
export interface OrderTabResultState{
    pageSize:number;
    pageIndex:number;
    totalCount:number;
    totalPages:number;
    next:boolean;
    data:any[]
}
export interface OrderWithTable {
    orderId: string;
    tableId: string;
}

export interface Order {
    _id?: string;
    id?: string;
    orders: SubOrder[];
    operateIndex: number;
    guestsNum: number;
    tableInfo?: TableBase;
    // operatorId: string; // 操作员id
    // operatorName: string; // 操作员姓名
    // totalPrice: number; // 总价
    // createdAt: string; // 创建时间
    // status: string; // 订单状态
}

export interface SubOrder {
    items: Item[];
    recommends: Recommend[];
    createdBy: User;
    status?: string;
    createdTime?: string;
}

export type TableType = {
    _id: string,
    name: string,
}

export interface VAXItem {
    tax: number; // 税率
    originalTotal: number;  // 所有同税率的已选商品 税前价格综合
}

export interface TableBase {
    _id: string,
    status: string,
    name: string,
    shopId: string,
    size: number,
    type: TableType[],
    operator_id: string,
    tags?: string[],
}

export type CurrentTable = TableBase & {
    guestNumber: number;
    orderId?: string;
};

export interface Item extends DishesItem {
    quantity: number;
    discount?: Discount;
}

export interface Discount {
    type: { key: DiscountType };
    value: number;
    limitType: { key: DiscountLimitType };
    limitValue: number;
    name: string;
    description: string;
    state: CommonState;
    id: string;
}

export interface Recommend {

}

export const SessionKeys = {
    Table: btoa("TableInfo"),
    Operator: btoa("CurrentOperator"),
    GuestNumber: btoa("CurrentGuestNumber"),
    OperateId: btoa("CurrentOperatorID"),
    OrderId: btoa("CurrentOrderID"),
    OrderObjId: btoa("CurrentOrderObjectID"),
    Language: btoa("CurrentLanguage"),
}

export enum OrderStatus {
    Ongoing = 'Ongoing',
    Completed = 'Completed',
    Cancel = 'Cancel',
  }
  
  export enum OrderSubStatus {
    Submitted = 'Submitted',
    AwaitingPayment = 'Awaiting payment',
    NotSubmitted = 'Not Submitted',
  }
  
  export enum DeskStatus {
    CLEAN = 'cleaning', // 清理中
    IN_USE = 'in use', // 使用中
    AVAILABLE = 'available', // 空桌
  }
