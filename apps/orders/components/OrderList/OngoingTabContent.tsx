import {
  useOngoingTabContent,
  useOrderListStateFromContext,
  //   useTableScroll,
} from "../../hooks/orderListHooks";
import { OrderListTable } from "@/components/OrderListTable";
// import { MoreVertIcon, ArrowDropDownIcon } from "@tapas/ui/icons";
import { ISelectItem, Select } from "@tapas/ui/Select";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Paging from "@/components/Paging";
import {
  IOrderListTabContentProps,
  orderListContext,
} from "../../state/orderList/state";
import { Order, OrderState } from "@/state/order/types";
import {
  //   getOrderAPI,
  getOrdersAPI,
  getOrdersCreateByAPI,
} from "@/api/ordersAPI";
import { OrderDatePicker } from "./OrderDatePicker";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { order, order4Payment } from "@/state/atoms";
import { queryOperates } from "@/api/operatesAPI";
import { queryUsersWithIds } from "@/api/usersAPI";
import { queryDishes } from "@/api/dishesAPI";
import { useTranslations } from "next-intl";
import { SubStatusBlock } from "./SubStatusBlock";



export const OngoingTabContent: React.FC<IOrderListTabContentProps> = ({
  tableHeader,
  tableHeaderPlaceholder,
  filterList,
}) => {
  const t = useTranslations("common");
  const orderListTranslate = useTranslations("orderList");
  const mockColumns = [
    { title: orderListTranslate("OrderID"), column: "id" },
    { title: orderListTranslate("OrderStatus"), column: "subStatus" },
    { title: t("Table"), column: "tableInfo.name" },
    { title: t("NoOfGuests"), column: "gustNum" },
    { title: orderListTranslate("TotalAmountDue"), column: "totalPrice" },
    { title: orderListTranslate("CreatedBy"), column: "operatorName" },
    { title: orderListTranslate("CreatedOn"), column: "createdAt" },
  ];

  const { context, setContext, key } = useContext(orderListContext);
  const [list, setList] = useState([]);
  const [orderState, setOrderState] = useRecoilState(order);
  const router = useRouter();
  const { currentPage, setCurrentPage, totalPage, setTotalPage } =
    useOrderListStateFromContext(context);
  const [order4Pay, setOrder4Payment] = useRecoilState(order4Payment);
  const onPagingChange = (page: number) => {
    setCurrentPage(page);
    context.currentPage = page;
    setContext(context);
    // console.log('context', context);
  };

  const {
    querySubStatus,
    setQuerySubStatus,
    createdBy,
    setCreatedBy,
    createDate,
    setCreateDate,
    createdByList,
    setCreatedByList,
  } = useOngoingTabContent(context);

  const allSubStatus: ISelectItem[] = [
    {
      key: "default",
      text: orderListTranslate("AllOrderStatus"),
    },
    {
      key: "Submitted",
      text: orderListTranslate("Submitted"),
    },
    {
      key: "Awaiting payment",
      text: orderListTranslate("AwaitingPayment"),
    },
    {
      key: "Not Submitted",
      text: orderListTranslate("NotSubmitted"),
    },
  ];

  useEffect(() => {
    // console.log('hahahahahah', createDate)
    getOrdersAPI({
      status: "Ongoing",
      subStatus: querySubStatus,
      createdAt: createDate,
      page: currentPage,
    }).then((res) => {
      if (res?.data) {
        setList(res.data);
        if (currentPage === 1) {
          setTotalPage(res.paging?.total || 1);
        }
      }
    });
  }, [querySubStatus, createdBy, createDate, currentPage]);

  

  useEffect(() => {
    getOrdersCreateByAPI(orderListTranslate).then((createdByList) => {
      setCreatedByList(createdByList);
    });
  }, []);

  const onAction = async (action: string, order: any) => {
    // const [orderDetail] = await getOrderAPI(order._id!);
    const operateIds = order.modifyHistory?.join(",");
    const operates = operateIds ? await queryOperates(operateIds) : [];
    const orders: any[] = [];
    for (var i = 0; i < operates.length; i++) {
      const [operator] = operates[i].modifiedBy
        ? await queryUsersWithIds(operates[i].modifiedBy)
        : [];
      const items = [];
      for (var n = 0; n < operates[i].modifyContent.length; n++) {
        const [dishesInfo] = await queryDishes(
          operates[i].modifyContent[n].dishesId
        );
        dishesInfo.name = dishesInfo.name[router.locale];
        dishesInfo.description = dishesInfo.description[router.locale];
        if (operates[i].modifyContent[n].options.length > 0) {
          dishesInfo.options?.forEach((item: any) => {
            if (
              operates[i].modifyContent[n]?.options.find(
                ({ optionId }: any) => optionId === item._id
              )
            ) {
              item.checked = true;
            }
          });
        }
        items.push({
          ...operates[i].modifyContent[n],
          ...dishesInfo,
        });
      }
      orders.push({
        id: order.id,
        _id: order._id,
        tableInfo: order.tableInfo,
        guestsNum: order.guestsNum,
        modifyHistory: order.modifyHistory,
        operator,
        items,
      });
    }
    setOrder4Payment((prevState) => ({ orderList: [] }));
    // operates.forEach(async ({ modifiedBy, modifyContent }: any) => {

    // });
    orders.push({
      id: order.id,
      _id: order._id,
      tableInfo: order.tableInfo,
      guestsNum: order.guestsNum,
      operator: orders[0]?.operator,
      items: [],
    });
    console.log(orders);
    // if(operates.length > 0){

    // }
    // 跳转到点菜页面
    setOrderState((prevState: OrderState) => ({
      ...prevState,
      curOrder: {
        ...prevState.curOrder,
        tableInfo: order.tableInfo,
        guestsNum: order.guestsNum,
        orders,
        operateIndex: orders.length - 1,
        recommends: [],
      },
    }));
    router.push("/ordering/dishes");
  };

  return (
    <>
      {/* 筛选列表 */}
      <div
        ref={filterList}
        className="sticky top-0 mt-3 px-6 z-[999] box-border"
        style={{
          background: "var(--Sheet-background)",
        }}
      >
        <div className="inline-flex gap-2">
          <Select
            value={querySubStatus}
            items={allSubStatus}
            onChange={(e, val) => {
              setQuerySubStatus(val);
              context.querySubStatus = val;
              // console.log('context', context);
              setContext(context);
            }}
          />

          <OrderDatePicker
            value={createDate}
            prefix={orderListTranslate("DateOfCreation")}
            onDateChange={(date) => {
              // console.log('select date', date);
              const dateStr: string | string[] =
                date === null ? "default" : date;
              setCreateDate(dateStr);
              context.createDate = dateStr;
              setContext(context);
            }}
          ></OrderDatePicker>

          <Select
            value={createdBy}
            items={createdByList}
            onChange={(e, val) => {
              setCreatedBy(val);
              context.createdBy = val;
              setContext(context);
            }}
          />
        </div>
      </div>
      <OrderListTable
        columns={
          mockColumns as {
            title: string;
            column: Exclude<keyof Order, "orders" | "tableInfo">;
          }[]
        } // 这里未了避免类型校验报错我强行同化了类型 再解决了上面的类型冲突后这里要去掉恢复到正常校验
        orders={list}
        tableHeader={tableHeader}
        tableHeaderPlaceholder={tableHeaderPlaceholder}
        paging={
          <Paging
            current={currentPage}
            total={totalPage}
            onChange={(page) => onPagingChange(page)}
          />
        }
        actions={[orderListTranslate("AddMoreDishes")]}
        onActionClick={onAction}
        renderItem={(colKey, value) => {
          if (colKey === "subStatus") {
            return <SubStatusBlock value={value} />;
          }
          return value;
        }}
      ></OrderListTable>
    </>
  );
};
