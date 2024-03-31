import { Order } from "@/state/order/types";
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table } from "@mui/joy"
import { MoreVertIcon } from "@tapas/ui/icons"
import Paging from "./Paging";
import React, {useEffect, useRef, useState} from "react";

export interface IOrderListTablePropsColumns{
    title: string|React.ReactElement;
    column:string;
    thProps?:Record<string, any>;
    tdProps?:Record<string, any>;
    renderItem?:(colKey:string,value:any,item:any)=>string | React.ReactElement
}
export interface IOrderListTableProps {
    tableHeader: React.RefObject<HTMLTableSectionElement>;
    tableHeaderPlaceholder: React.RefObject<HTMLDivElement>;
    columns: IOrderListTablePropsColumns[]; // 这里 我把column的类型 修改了下因为 Order里面有几个属性类型定义的是对象是复发再render的是后作为内容渲染的所以我类型里面提出了后续你需要处理下比如tableInfo 和orders
    orders: any[];
    paging: ReturnType<typeof Paging>;
    actions?: string[];
    onActionClick?: (action: string, order: Order) => void;
    renderItem?:IOrderListTablePropsColumns['renderItem'],
    footer?:React.ReactElement[]
}


export const OrderListTable: React.FC<IOrderListTableProps> = ({
    tableHeader,
    tableHeaderPlaceholder,
    columns,
    orders,
    paging,
    actions=[],
    onActionClick=() => {},
    renderItem,
    footer=[]

}) => {
    // get the ref of pagging
    const pagingRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // calculate the bottom of pagingRef
        if (!pagingRef.current) {
            return;
        }
        const pagingBottom = pagingRef.current.getBoundingClientRect().bottom;
        pagingRef.current.style.top = '100%';
        if (pagingBottom >= window.innerHeight) {
            pagingRef.current.style.top = 'auto';
        } else {
            pagingRef.current.style.top = '100%';
        }
    }, [tableHeaderPlaceholder]);
    return (<>
        {/* table header background placeholder */}
        {/* 特殊交互逻辑：用于遮住table header圆角背后的一小块，z-index仅次于table-header */}
        <div ref={tableHeaderPlaceholder} className='sticky hidden z-[49]' style={{
            background: 'var(--Sheet-background)'
        }}></div>
        {/* 表格数据 */}
        <Sheet variant="outlined"
            className=" w-[calc(100% - 3rem)] max-w-full overflow-auto rounded-xl mx-6 mt-3">
            <Table
                variant="plain"
                className="table-auto i-table"
                hoverRow={true}
                stickyHeader
                stickyFooter
                sx={{
                    '--TableCell-headBackground': 'var(--surface-sf-crm, #F9F2E8)',
                    '--TableCell-dataBackground': 'var(--Sheet-background)',
                    '--hover': 'var(--surface-sf-overlay4b, rgba(0, 0, 0, 0.04))',
                    '--TableCell-borderRadius': '0.75rem',
                }}>
                <thead>
                    <tr className="z-50 rounded-t-xl">
                        {
                            columns.map((item, index) => (
                                <th style={{
                                    background: 'var(--TableCell-headBackground)',
                                    borderTopLeftRadius: index === 0 ? 'var(--TableCell-borderRadius)' : 0,
                                }} key={index} {...item.thProps} >{item.title}</th>
                            ))
                        }
                        {
                            actions.length > 0 
                            && <th  className="sticky right-0"
                                    aria-label="last"
                                    // 必须写在style中，否则效果会很奇怪
                                    style={{
                                        borderTopRightRadius: 'var(--TableCell-borderRadius)',
                                        backgroundColor: 'var(--TableCell-headBackground)',
                                        boxShadow: '15px -15px 5px 0px var(--TableCell-headBackground)'
                                    }}
                                />
                        }
                        
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((item, index) => (
                            <tr key={index} className='z-40 relative'>
                                {
                                    columns.map((column, index) => {
                                        const colKey = column.column;
                                        let value: any = item[colKey];

                                        if (colKey.includes('.')) {
                                            value = item
                                            const keys = colKey.split('.')
                                            let i = 0;
                                            let keyPath = keys[i] as string
                                            do {
                                                value = value[keyPath]
                                            } while (keyPath = keys[++i] as string)
                                        }

                                        if(column.renderItem){
                                            value = column.renderItem(colKey,value,item)
                                        }else if(renderItem){
                                            value = renderItem(colKey,value,item)
                                        }
                                        return <td key={index} {...column.tdProps} onClick={e=>column?.tdProps?.onClick&&column?.tdProps?.onClick(colKey,value,item,columns)}>{value}</td>
                                    })
                                }
                                {
                                    actions.length > 0 
                                    && <td className="sticky right-0 z-0"  style={{
                                        backgroundColor: 'var(--TableCell-dataBackground)'
                                    }}>
                                        <Dropdown>
                                            <MenuButton sx={{
                                                paddingInline: 0,
                                                border: 'none'
                                            }}>
                                                <MoreVertIcon size={20} />
                                            </MenuButton>
                                            <Menu>
                                                {
                                                    actions.map((action, index) => (
                                                        <MenuItem key={index} onClick={() => onActionClick(action, item)}>{action}</MenuItem>
                                                    ))
                                                }
                                            </Menu>
                                        </Dropdown>
                                    </td>
                                }
                                
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                {footer.map(f=>f)}
                </tfoot>
            </Table>
        </Sheet>

        {/* 分页器 */}
        <div className="sticky bottom-0 px-6 h-12 border-t border-black border-opacity-10 border-solid mt-3 z-[999] flex justify-end items-center"
             style={{
                 backgroundColor: 'var(--Sheet-background)'
             }}
             ref={pagingRef}
        >
            {paging}
        </div>
    </>)
}
