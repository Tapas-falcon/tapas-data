// 局部state，用于保存订单列表页的一些状态
// 非全局state，禁止用于保存全局状态！

import React, { Dispatch, createContext } from 'react';

export interface IOrderListTabContentProps {
    tableHeader: React.RefObject<HTMLTableSectionElement>;
    tableHeaderPlaceholder: React.RefObject<HTMLDivElement>;
    filterList: React.RefObject<HTMLDivElement>;
    columns:{title:string;id:string}[];
}
export interface IOrderDataTabContentProps{
    tabName:string;
    tableHeader: React.RefObject<HTMLTableSectionElement>;
    tableHeaderPlaceholder: React.RefObject<HTMLDivElement>;
    FilterListContent:React.FC<any>;
    filterList: React.RefObject<HTMLDivElement>;
}
export interface OrderListContext {
    context: any;
    setContext: Dispatch<any>;
    key: string;
}

export const orderListContext = createContext<OrderListContext>({
    key: '',
    context: {},
    setContext: () => {}
});
