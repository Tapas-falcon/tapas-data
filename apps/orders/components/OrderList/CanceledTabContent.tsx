import { useCanceledTabContent, useOrderListStateFromContext, useTableScroll } from "../../hooks/orderListHooks";
import { OrderListTable } from "@/components/OrderListTable";
import { MoreVertIcon, ArrowDropDownIcon } from "@tapas/ui/icons";
import { ISelectItem, Select } from "@tapas/ui/Select";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Paging from "@/components/Paging";
import { IOrderListTabContentProps, orderListContext } from "../../state/orderList/state";
import { Order } from "@/state/order/types";
import { getOrdersAPI, getOrdersCancelByAPI, getOrdersCreateByAPI } from "@/api/ordersAPI";
import { OrderDatePicker } from "./OrderDatePicker";
import { useTranslations } from "next-intl";
import { SubStatusBlock } from "./SubStatusBlock";



export const CanceledTabContent: React.FC<IOrderListTabContentProps> = ({
    tableHeader,
    tableHeaderPlaceholder,
    filterList
}) => {
    const t = useTranslations("common");
    const orderListTranslate = useTranslations("orderList");
    const mockColumns = [
        {title: orderListTranslate("OrderID"), column: "id"},
        {title: t("OrderType"), column: "orderType"},
        {title: orderListTranslate("OrderStatus"), column: "subStatus"},
        {title: t("Table"), column: "tableInfo.name"},
        {title: t("NoOfGuests"), column: "guestsNum"},
        {title: orderListTranslate("TotalAmountDue"), column: "totalPrice"},
        {title: orderListTranslate("CreatedBy"), column: "operatorName"},
        {title: orderListTranslate("CreatedOn"), column: "createdAt"},
        {title: orderListTranslate("Reason"), column: "reason"},
        {title: orderListTranslate("PaymentOperator"), column: "paymentOperatorName"}
    ];
	const {context, setContext, key} = useContext(orderListContext);
    const [list, setList] = useState([]);

	const allSubStatus: ISelectItem[] = [
		{
			key: "default",
			text: orderListTranslate("AllOrderStatus")
		},
		{
			key: "Submitted",
			text: orderListTranslate("Submitted")
		},
        {
			key: "Not Submitted",
			text: orderListTranslate("NotSubmitted")
		}
	]

    const orderTypes: ISelectItem[] = [
		{
			key: "default",
			text: orderListTranslate("AllOrderTypes")
		},
		{
			key: "Eat-in",
			text: orderListTranslate("Eat-in")
		},
        {
			key: "Take-out",
			text: orderListTranslate("Take-out")
		}
	]

    const {
        orderType, setOrderType,
        querySubStatus, setQuerySubStatus,
        createDate, setCreateDate,
        cancelBy, setCancelBy,
        cancelByList, setCancelByList
    } = useCanceledTabContent(context);

    useEffect(() => {
        getOrdersCancelByAPI(orderListTranslate).then(cancelByList => {
            setCancelByList(cancelByList);
        })
    }, [])

    const {
		currentPage, setCurrentPage,
		totalPage, setTotalPage,
	} = useOrderListStateFromContext(context);
    
    const onPagingChange = (page: number) => {
		setCurrentPage(page);
		context.currentPage = page;
		setContext(context);
		// console.log("context", context);
	}

    useEffect(() => {
		getOrdersAPI({
			status: "Cancel",
            orderType,
			subStatus: querySubStatus,
            createdAt: createDate,
            cancelBy,
            page: currentPage,
		}).then((res) => {
            if (res && res.data) {
                setList(res.data);
                // console.log("res", res);
                if (currentPage === 1) {
                    setTotalPage(res.paging?.total || 1);
                }
            }
		})
	}, [orderType, querySubStatus, createDate, cancelBy, currentPage])

    return (<>
        {/* 筛选列表 */}
        <div ref={filterList} className="sticky top-0 mt-3 px-6 z-[999] box-border" style={{
            background: "var(--Sheet-background)"
        }}>
            <div className="inline-flex gap-2">

                <Select
                    value={orderType}
                    items={orderTypes}
                    onChange={(e, val) => {
                        setOrderType(val);
                        context.orderType = val;
                        setContext(context);
                    }}
                />

                <Select
                    value={querySubStatus}
                    items={allSubStatus}
                    onChange={(e, val) => {
                        setQuerySubStatus(val);
                        context.querySubStatus = val;
                        setContext(context);
                    }}
                />

                <OrderDatePicker value={createDate} prefix={orderListTranslate("DateOfCreation")} onDateChange={(date) => {
					// console.log("select date", date);
					const dateStr: string|string[] = date === null ? "default" : date;
					setCreateDate(dateStr);
					context.createDate = dateStr;
					setContext(context);
				}}></OrderDatePicker>

                <Select
                    value={cancelBy}
                    items={cancelByList}
                    onChange={(e, val) => {
                        setCancelBy(val);
                        context.cancelBy = val;
                        setContext(context);
                    }}
                />
            </div>

        </div>
        <OrderListTable
            columns={mockColumns as {title: string, column: Exclude<keyof Order, "orders" | "tableInfo">}[]}
            orders={list}
            tableHeader={tableHeader}
            tableHeaderPlaceholder={tableHeaderPlaceholder}
            paging={<Paging current={currentPage} total={totalPage} onChange={(page) => onPagingChange(page)} />}
            renderItem={(colKey, value) => {
                if (colKey === "subStatus") {
                    return <SubStatusBlock value={value} />;
                }
                return value;
            }}
		/>
    </>)
};