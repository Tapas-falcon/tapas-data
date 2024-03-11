import { useCompletedTabContent, useOrderListStateFromContext, useTableScroll } from "../../hooks/orderListHooks";
import { OrderListTable } from "@/components/OrderListTable";
import { MoreVertIcon, ArrowDropDownIcon } from "@tapas/ui/icons";
import { ISelectItem, Select } from "@tapas/ui/Select";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Paging from "@/components/Paging";
import { IOrderListTabContentProps, orderListContext } from "../../state/orderList/state";
import { Order } from "@/state/order/types";
import { getOrdersAPI, getOrdersCheckoutByAPI, getOrdersCreateByAPI } from "@/api/ordersAPI";
import { OrderDatePicker } from "./OrderDatePicker";
import { useTranslations } from "next-intl";


export const CompletedTabContent: React.FC<IOrderListTabContentProps> = ({
    tableHeader,
    tableHeaderPlaceholder,
    filterList
}) => {
    const t = useTranslations("common");
    const orderListTranslate = useTranslations("orderList");
    const mockColumns = [
        { title: orderListTranslate("OrderID"), column: "id" },
        { title: t("OrderType"), column: "orderType" },
        { title: t("Table"), column: "tableInfo.name" },
        { title: t("NoOfGuests"), column: "guestsNum" },
        { title: orderListTranslate("TotalAmountDue"), column: "totalPrice" },
        { title: orderListTranslate("TotalAmountPaid"), column: "totalPricePaid" },
        { title: t("PaymentMethod"), column: "paymentMethod" },
        { title: t("MembershipCheckout"), column: "membershipCheckout" },
        { title: orderListTranslate("CreatedBy"), column: "operatorName" },
        { title: orderListTranslate("CreatedOn"), column: "createdAt" },
        { title: orderListTranslate("CheckoutBy"), column: "checkoutOperatorName" },
        { title: orderListTranslate("CheckoutOn"), column: "checkoutAt" },
        { title: orderListTranslate("PaymentOperator"), column: "paymentOperatorName" }
    ];

    const { context, setContext, key } = useContext(orderListContext);
    const [list, setList] = useState([]);

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
        queryOrderType, setQueryOrderType,
        createDate, setCreateDate,
        createdBy, setCreatedBy,
        checkoutBy, setCheckoutBy,
        createdByList, setCreatedByList,
        checkoutByList, setCheckoutByList
    } = useCompletedTabContent(context);

    useEffect(() => {
        getOrdersCreateByAPI(orderListTranslate).then(createdByList => {
            setCreatedByList(createdByList);
        })

        getOrdersCheckoutByAPI(orderListTranslate).then(checkoutByList => {
            setCheckoutByList(checkoutByList);
        })
    }, [])

    useEffect(() => {
        getOrdersAPI({
            status: "Completed",
            orderType: queryOrderType,
            createdAt: createDate,
            createdBy,
            checkoutBy,
            page: currentPage
        }).then((res) => {
            if (res?.data) {
                setList(res.data);
                if (currentPage === 1) {
                    setTotalPage(res?.paging?.total || 1);
                }
            }
        })
    }, [queryOrderType, createDate, createdBy, checkoutBy, currentPage])

    return (<>
        {/* 筛选列表 */}
        <div ref={filterList} className="sticky top-0 mt-3 px-6 z-[999] box-border" style={{
            background: "var(--Sheet-background)"
        }}>
            <div className="inline-flex gap-2">
                <Select
                    value={queryOrderType}
                    items={orderTypes}
                    onChange={(e, val) => {
                        setQueryOrderType(val)
                    }}
                />

                <OrderDatePicker value={createDate} prefix={orderListTranslate("DateOfCreation")} onDateChange={(date) => {
                    // console.log("select date", date);
                    const dateStr: string | string[] = date === null ? "default" : date;
                    setCreateDate(dateStr);
                    context.createDate = dateStr;
                    setContext(context);
                }}></OrderDatePicker>

                <Select
                    value={createdBy}
                    items={createdByList}
                    onChange={(e, val) => {
                        setCreatedBy(val);
                        context.createdBy = val;
                        setContext(context);
                    }}
                />

                <Select
                    value={checkoutBy}
                    items={checkoutByList}
                    onChange={(e, val) => {
                        setCheckoutBy(val);
                        context.checkoutBy = val;
                        setContext(context);
                    }}
                />

            </div>

        </div>
        <OrderListTable
            columns={mockColumns as { title: string, column: Exclude<keyof Order, "orders" | "tableInfo"> }[]} // 这里未了避免类型校验报错我强行同化了类型 再解决了上面的类型冲突后这里要去掉恢复到正常校验
            orders={list}
            tableHeader={tableHeader}
            tableHeaderPlaceholder={tableHeaderPlaceholder}
            paging={<Paging current={currentPage} total={totalPage} onChange={(page) => onPagingChange(page)} />}
        />
    </>)
};