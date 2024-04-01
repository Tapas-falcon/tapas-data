import { memo, useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  Typography,
} from "@mui/joy";

import ActionBar from "@/components/ActionBar";
import OrderingBar from "@/components/OrderingBar";
import { useHeaderState } from "@/hooks/useHeaderState";
import {
  AppleIcon,
  CashIcon,
  CreditCardIcon,
  OrderApproveIcon,
} from "@tapas/ui/icons";
import { NumberKeyboard } from "@tapas/ui/NumberKeyboard";
import MessageService from "@tapas/ui/Message";
import PageTransition from "@/components/PageTransition";
import getMemberLogin from "@/components/MemberLogin";
import { useConfirm } from "@tapas/ui/Confirm";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  curMemberState,
  currentTableState,
  order4Payment,
  order
} from "@/state/atoms";
import { Item, Order, OrderStatus, OrderSubStatus, SessionKeys } from "@/state/order/types";
import { OrderTotalItem, calcOrdersTotalTable, formatPrice } from "@/components/Dishes/util";
import {
  curOrderTotal,
  selCurOperateIndex,
  selCurOrderOperate,
} from "@/state/order/order.selectors";
import {
  createPaymentAPI,
  getPaymentTypesAPI,
  updatePaymentAPI,
} from "@/api/paymentsAPI";
import { selCurOperator } from "@/state/selectors";
import { updateOrderAPI } from "@/api/ordersAPI";
import { SRC_URL } from "@/api/apiProxy";

const paymentMethodKeys = ["CASH", "CREDIT_CARD", "APPLE_PAY"];

const DetailGroup = memo(function DetailGroup({
  order,
  idx,
}: {
  order: Order;
  idx: number;
}) {  
  const t = useTranslations("common");
  const { orders, tableInfo, guestsNum } = order;

  return (
    <>
      <Box className="h-16 px-6 border-solid border-0 border-y border-black border-opacity-10 flex justify-start items-center gap-4">
        <IconButton
          variant="solid"
          sx={{
            "--IconButton-radius": "50%",
            "--variant-solidBg": "var(--joy-palette-success-500)",
          }}
        >
          <OrderApproveIcon size={24} />
        </IconButton>
        <Box className="flex-1 flex flex-col">
          <Typography level="title-lg">
            {(idx ? "Additional order " : "Order ") +
              (orders[idx]?.status || "submitted")}
          </Typography>
          <Typography level="body-sm">{`ID: ${order.id} | ${
            orders[idx]?.createdTime || new Date().toLocaleString()
          }`}</Typography>
        </Box>
        <Box className="h-10 p-2 bg-black bg-opacity-5 rounded-[360px] flex justify-start items-center gap-1">
          <Avatar
            src={`http://121.46.249.133:8069/web/image?model=hr.employee&id=${orders[idx]?.createdBy}&field=image_128`}
            sx={{ "--Avatar-size": "1.5rem" }}
          ></Avatar>
          <Typography>{orders[idx]?.createdBy?.name}</Typography>
        </Box>
      </Box>
      <Box className="px-6 py-4 border-solid border-0 border-b border-black border-opacity-10 flex justify-start items-center gap-3">
        <Box className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
          <Typography level="title-md">
            {t("Table") + " " + tableInfo?.name || "N/A"}
          </Typography>
          <Typography level="body-md">
            {tableInfo
              ? `${tableInfo.tags?.slice(0).reverse().slice(0, 2).join(", ")} `
              : "N/A"}
          </Typography>
        </Box>
        <Box className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
          <Typography level="title-md">{t("NoOfGuests")}</Typography>
          <Typography level="body-md">{guestsNum}</Typography>
        </Box>
        <Box className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
          <Typography level="title-md">{t("OrderType")}</Typography>
          <Typography level="body-md">
            {tableInfo ? "Eat-in" : "take-out"}
          </Typography>
        </Box>
      </Box>
      <Box className="px-6 py-4 border-solid border-0 border-b-8 border-black border-opacity-10">
        <Table
          borderAxis="none"
          sx={{ "& tr > *:not(:first-child)": { textAlign: "right" } }}
        >
          <thead>
            <tr>
              <th style={{ width: "70%" }}>{t("Description")}</th>
              <th>{t("Quantity")}</th>
              <th>{t("Total")}</th>
            </tr>
          </thead>
          <tbody>
            {orders[idx]?.items.map((row: Item, i: number) => (
              <tr key={i}>
                <td>
                  <Box className="flex gap-2 items-center">
                    {/* <Image src={row.image} width={40} height={40} alt="item" className="rounded-full"></Image> */}
                    <img
                      src={`${SRC_URL}/picture/${row.image}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    ></img>
                    <Box className="inline-flex flex-col">
                      <Typography level="title-sm">{row.name}</Typography>
                      <Typography
                        level="body-sm"
                        textColor="var(--joy-palette-text-primary)"
                      >
                        €{formatPrice(row.price, row.taxRate)}
                      </Typography>
                      {row.description && (
                        <Typography
                          level="body-sm"
                          className="truncate max-w-md"
                        >
                          {row.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </td>
                <td>
                  X
                  <Typography level="title-md" className="inline">
                    {row.quantity}
                  </Typography>
                </td>
                <td>
                  €
                  <Typography level="title-md" className="inline">
                    {(formatPrice(row.price, row.taxRate) * row.quantity).toFixed(2)}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
});

export default function PaymentDetail({ locale }: any) {
  const t = useTranslations("common");
  const tOrder = useTranslations("order");
  const router = useRouter();
  const [showActionBar, setShowActionBar] = useState(false);
  const [rawOrder, setRawOrder] = useRecoilState(order);
  const orderState = useRecoilValue(order4Payment);
  useHeaderState({
    title: t("PaymentDetail"),
    showBack: true,
    showSearch: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const [paymentMethodEnums, setPaymentMethodEnums] = useState<any>([]);
  const [val, setVal] = useState("");
  const [totalTable, setTotalTable] = useState<OrderTotalItem[]>([]);
  // const [total, setTotal] = useState(0)
  const total = useRecoilValue(curOrderTotal);
  const [member, setMember] = useRecoilState(curMemberState);
  const [operator] = useRecoilState(selCurOperator("selCurOperator"));
  const currentTable = useRecoilValue(currentTableState);
  const [operateIndex, setOperateIndex] = useRecoilState(
    selCurOperateIndex("operateIndex")
  );
  const { modal, openModal, setModelOpen } = getMemberLogin();
  const confirm = useConfirm();

  useEffect(() => {
    getPaymentTypesAPI(locale).then((data: any) => {
      setPaymentMethodEnums(data);
      if (!data.some((p: { key: string }) => p.key === paymentMethod)) {
        setPaymentMethod(data[0].key);
      }
    });
  }, []);

  useEffect(() => {
    const orders = orderState?.curOrder?.orders;
    if (orders && orders.length > 0) {
      setTotalTable(calcOrdersTotalTable(orders));

      setVal(total.toFixed(2));
    } else {
      confirm({
        message: "No orders exist, please go to order.",
        onConfirm: () => router.push("/ordering/dishes"),
      });
    }
  }, [orderState]);

  const payOrder = async () => {
    // setShowActionBar((show) => !show)

    const curOrder = orderState.curOrder!;
    const req: any = {
      // id
      paymentMethod: paymentMethodEnums.find(
        (p: { key: string }) => p.key === paymentMethod
      ).objId,
      // status,
      tableId: currentTable._id || sessionStorage.getItem(SessionKeys.Table),
      totalPrice: total,
      discounts: [], // TODO
      operateUser: operator?.id,
      customer: member?.id,
      actualAmout: val,
      // createdAt,
      // updatedAt,
      tax: totalTable.map((t) => ({ rate: t.iva / 100, total: t.total })),
      order: curOrder._id || sessionStorage.getItem(SessionKeys.OrderId),
    };
    const payment = await createPaymentAPI(req);

    // 清理购物车
    setRawOrder({
      ...rawOrder,
      curOrder: {
        ...rawOrder.curOrder!,
        id: undefined,
        _id: undefined,
        orders: [], 
      },
    });

    // TODO 获取外设支付状态
    await updatePaymentAPI({ _id: payment._id, status: "P_SUCCESS" });
    // 更新订单支付状态+订单状态+子状态
    await updateOrderAPI({
      _id: curOrder._id,
      payment: payment._id,
      status: OrderStatus.Completed,
      subStatus: OrderSubStatus.Completed
    });

    MessageService.success({
      title: tOrder("OrderSubmited"),
      desc: `${payment.id} | ${payment.createdAt.toLocaleString()}`,
      hasView: true,
      actionText: "View",
    });

    router.push("/ordering/table-list");
  };

  return (
    <PageTransition className="relative">
      <Box
        className="flex flex-col md:flex-row w-full h-full max-md:overflow-y-auto"
        sx={{
          "& table": {
            "--TableCell-headBackground": "transparent",
            "--TableCell-footBackground": "transparent",
          },
        }}
      >
        {/*  order info (left part) */}
        <Box className="w-full md:w-1/2 md:overflow-y-auto pb-28">
          {orderState.curOrder?.orders.map((_, i) => (
            <DetailGroup key={i} order={orderState.curOrder!} idx={i} />
          ))}
          {/*  total info */}
          <Box className="h-12 px-6 py-4 flex justify-between">
            <Typography level="h3">{t("Total")}</Typography>
            <Typography level="h3">€ {total.toFixed(2)}</Typography>
          </Box>
          <Box className="px-6 py-4 border-solid border-0 border-y border-black border-opacity-10">
            <Table
              borderAxis="none"
              sx={{
                "& tr > *": { textAlign: "right" },
                "& tfoot td": { borderTop: "1px solid rgba(0,0,0,0.1)" },
              }}
            >
              <thead>
                <tr>
                  <th>{tOrder("IVA")}</th>
                  <th>{tOrder("BASEIMP")}</th>
                  <th>{tOrder("IMPIVA")}</th>
                  <th>{t("TOTAL")}</th>
                </tr>
              </thead>
              <tbody>
                {totalTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.iva}</td>
                    <td>
                      €
                      <Typography level="body-md" className="inline">
                        {row.baseImp}
                      </Typography>
                    </td>
                    <td>
                      €
                      <Typography level="body-md" className="inline">
                        {row.impIva}
                      </Typography>
                    </td>
                    <td>
                      €
                      <Typography level="body-md" className="inline">
                        {row.total}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <Typography level="body-md">
                      €
                      {totalTable.reduce((s, r) => s + r.baseImp, 0).toFixed(2)}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-md">
                      €{totalTable.reduce((s, r) => s + r.impIva, 0).toFixed(2)}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-md">
                      €{totalTable.reduce((s, r) => s + r.total, 0).toFixed(2)}
                    </Typography>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Box>
          {/*  total info end */}
        </Box>
        {/*  payment info (right part) */}
        <Box className="w-full md:w-1/2 border-solid border-0 md:border-l border-black border-opacity-10">
          <Box className="flex justify-between items-center gap-4 h-16 px-6 border-solid border-0 border-y border-black border-opacity-10">
            {member ? (
              <>
                <Box className="flex gap-3">
                  <Avatar size="md" src={member.photo}></Avatar>
                  <Box className="flex-1 flex flex-col">
                    <Typography level="title-lg">{member.name}</Typography>
                    <Typography level="body-sm">{`ID: ${member.id}`}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() =>
                    confirm({
                      message: "Are you sure to logout current member?",
                      onConfirm: () => setMember(undefined),
                    })
                  }
                >
                  Member log out
                </Button>
              </>
            ) : (
              <>
                <Typography level="h4">{t("MembershipCheckout")}</Typography>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => {
                    openModal({
                      initialVal: "",
                      onCancel: () => {
                        // do nothing
                        setModelOpen(false);
                      },
                      onSwitched: (member) => {
                        // setUsers(member ?? []);
                        setMember(member);
                        setModelOpen(false);
                      },
                    });
                  }}
                >
                  {t("MemberLogin")}
                </Button>
              </>
            )}
          </Box>
          <Box className="px-6 pt-4 pb-2">
            <Typography level="h4">{t("PaymentMethod")}</Typography>
            <Box
              className="w-full pt-3 inline-flex self-stretch justify-start items-start gap-2"
              sx={{
                "& .MuiCard-root": {
                  flexGrow: 1,
                  flexBasis: 0,
                  "--Card-padding": "2rem 1rem",
                  "--Card-radius": "0.75rem",
                },
                "& .MuiCardContent-root": {
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "0.5rem",
                },
              }}
            >
              <Card
                variant={
                  paymentMethod === paymentMethodKeys[0] ? "solid" : "soft"
                }
                onClick={() => setPaymentMethod(paymentMethodKeys[0])}
              >
                <CardContent>
                  <CashIcon size={20} />
                  <Typography level="body-md" textColor="inherit">
                    {paymentMethodEnums[0]?.name ?? t("Cash")}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant={
                  paymentMethod === paymentMethodKeys[1] ? "solid" : "soft"
                }
                onClick={() => setPaymentMethod(paymentMethodKeys[1])}
              >
                <CardContent>
                  <CreditCardIcon size={20} />
                  <Typography level="body-md" textColor="inherit">
                    {paymentMethodEnums[1]?.name ?? t("CreditCard")}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant={
                  paymentMethod === paymentMethodKeys[2] ? "solid" : "soft"
                }
                onClick={() => setPaymentMethod(paymentMethodKeys[2])}
              >
                <CardContent>
                  <AppleIcon size={20} />
                  <Typography level="body-md" textColor="inherit">
                    {paymentMethodEnums[2]?.name ?? t("ApplePay")}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box className="flex flex-col items-center gap-2 w-full px-6 pt-2 pb-28">
            <Typography level="title-sm" className="w-full">
              {t("TotalAmtPaidCash")}
            </Typography>
            <NumberKeyboard
              value={val}
              label={t("AmountOfCash")}
              onChange={(v) => setVal(v as string)}
            />
          </Box>
        </Box>

        {/* 底部bar */}
        <Box className="fixed md:absolute inset-x-6 bottom-4">
          {showActionBar && (
            <ActionBar
              text="Get €3.00 off, when you spend €1.50 more!"
              secondaryText="Available date: Dec 20 - 25, 2023"
            />
          )}
          <OrderingBar
            total={total}
            secondaryText={t("AddMoreDishes")}
            confirmText={t("Confirm-pay")}
            className="relative z-20"
            onSecondary={() => {
              sessionStorage.removeItem(SessionKeys.OperateId);
              setOperateIndex(operateIndex + 1);
              router.push("/ordering/dishes");
            }}
            onConfirm={payOrder}
          />
        </Box>

        {/* 会员登录弹窗 */}
        {modal}
      </Box>
    </PageTransition>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../../i18n/${locale}.json`)).default,
      locale,
    },
  };
}
