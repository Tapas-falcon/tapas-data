import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import { useSafeState } from "ahooks";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/joy";

import OrderDrawer from "../OrderDrawer";
import { Shell } from "@/state/type";
import NumberInput from "@tapas/ui/NumberInput";
import { selShellState } from "@/state/selectors";
import {
  Item,
  OrderSubStatus,
  SubOrder,
  VAXItem,
} from "@/state/order/types";
import {
  selCurOrderInfo,
  selCurOrderOperate,
} from "@/state/order/order.selectors";
import {
  currentTableState,
  order4Payment,
  order as orderState,
} from "@/state/order/order.atoms";
import {
  SumType,
  calcFinalPriceForOrderItem,
  formatTableInfo,
  padEnd,
} from "./util";
import { useRouter } from "next/router";
import { updateOrderStatus } from "@/api/ordersAPI";
import MessageService from "@tapas/ui/Message";

export default function Cart() {
  const t = useTranslations("common");
  const t_order = useTranslations("order");

  // 订阅购物车列表开启状态
  const [cartOpen, setCartOpen] = useRecoilState(selShellState("cartOpen"));

  // 营销信息 TODO
  const [promo, setPromo] = useRecoilState(selShellState("promo"));

  const orderInfo = useRecoilValue(selCurOrderInfo("curOrderInfo"));

  const [order, setOrder] = useRecoilState(selCurOrderOperate("curOrder"));

  const [rawOrder, setRawOrder] = useRecoilState(orderState);
  const [currentTable, setCurrentTable] = useRecoilState(currentTableState);
  const [order4Pay, setOrder4Payment] = useRecoilState(order4Payment);

  const [expandTaxInfo, setExpandTaxInfo] = useSafeState(false);
  const router = useRouter();
  const submitOrder = async (clear?: boolean) => {
    const { id, _id } = await updateOrderStatus({
      orderId: order._id,
      subStatus: OrderSubStatus.Submitted,
    });
    // clear cart:
    //1,记录当前订单与桌子的关系；
    
    setCurrentTable({
      ...currentTable,
      orderId: rawOrder.curOrder!._id!,
    });
    // 2，把当前购物车中的订单信息复制给payment用；
    // setOrder4Payment(JSON.parse(JSON.stringify(rawOrder)));
    setOrder4Payment({
      ...rawOrder,
      curOrder: {
        ...rawOrder.curOrder!,
        id,
        _id,
      },
    });

    if (clear) { // 3，清空当前购物车使用的订单
      setRawOrder({
        ...rawOrder,
        curOrder: {
          ...rawOrder.curOrder!,
          id,
          _id,
          orders: [], // clear here
        },
      });
    }
    sessionStorage.clear();
  };
  // const addDishes4Order = async() => {

  //   const req = {
  //     orderId: rawOrder.curOrder?._id,
  //     totalPrice: total((order as SubOrder)?.items ?? [], SumType.WithTax),
  //     orderContent: order.items,
  //     createdBy: order.createdBy.id,
  //   }

  //   await addDishesAPI(req);
  // }

  const doOrder = async (clear?: boolean) => {
    try {
      submitOrder(clear);
      setCartOpen(false);
      MessageService.success({
        title: "Order Succeed!",
        duration: 3000,
      });
    } catch (e) {
      MessageService.fail({
        title: "Order failed, please try again later",
        duration: 3000,
      });
    }
  };

  // 跳转去预支付界面
  const goToPay = async () => {
    await doOrder();
    router.push("/ordering/payment-detail");
  };

  // 提交保存订单 单不支付;
  const goWithoutPay = () => {
    doOrder(true);
  };

  const tax = (items: Item[]): VAXItem[] => {
    const arr: Record<number, VAXItem> = { 0: { tax: 0, originalTotal: 0 } };
    items.forEach((item) => {
      const { price, taxRate } = item;
      if (!arr[taxRate]) {
        arr[taxRate] = {
          tax: taxRate,
          originalTotal: 0,
        };
      }
      arr[taxRate]!.originalTotal += parseFloat(
        calcFinalPriceForOrderItem(item, item.quantity)
      );
    });
    return Object.entries(arr)
      .sort(([key1], [key2]) => parseFloat(key2) - parseFloat(key1)) // 排序 按税率倒叙
      .map(([, item]) => item);
  };

  const total = (items: Item[], sumType?: SumType): number =>
    items
      .map((item): number =>
        parseFloat(calcFinalPriceForOrderItem(item, item.quantity, sumType))
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const HeaderItemTmp = ({ title, desc }: { title: string; desc?: string }) => (
    <Grid xs={5} className="flex pr-3">
      <Box className="flex flex-col justify-center">
        <Typography
          level="body-xs"
          fontWeight={700}
          noWrap
          lineHeight="normal"
          textColor={"neutral.870"}
        >
          {title}
        </Typography>
        <Typography
          level="body-xs"
          fontWeight={400}
          lineHeight="normal"
          textColor={"neutral.870"}
        >
          {desc ?? "N/A"}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <OrderDrawer
      open={cartOpen as Shell["drawerOpen"]}
      onClose={() => {
        setCartOpen(false);
      }}
      title={t_order("orderInfo")}
      summary={
        <Grid container columns={15} sx={{ flexGrow: 1 }}>
          <HeaderItemTmp
            title={`${t("Table")} ${orderInfo.tableInfo?.name ?? "N/A"}`}
            desc={formatTableInfo(t, orderInfo.tableInfo)}
          ></HeaderItemTmp>
          <HeaderItemTmp
            title={t("NoOfGuests")}
            desc={orderInfo.guestsNum ? `${orderInfo.guestsNum}` : undefined}
          ></HeaderItemTmp>
          <HeaderItemTmp
            title={t_order("createdBy")}
            desc={order?.createdBy?.name ?? ""}
          ></HeaderItemTmp>
        </Grid>
      }
      promoMessage={promo as Shell["promo"]}
      bottom={
        <AccordionGroup variant="plain" color="neutral">
          <Accordion
            className="flex-col-reverse"
            expanded={expandTaxInfo}
            onChange={() => setExpandTaxInfo(!expandTaxInfo)}
          >
            <Box className="flex flex-row grow justify-between grow">
              <AccordionSummary className="flex" variant="plain" color="accent">
                <Typography className="text-base" fontWeight={700}>
                  {padEnd(
                    total((order as SubOrder)?.items ?? [], SumType.WithTax)
                  )
                    .split(".")
                    .map((str, index) => {
                      if (index === 0) {
                        return (
                          <Typography
                            key={`${index}_${str}`}
                            fontSize="1.313rem"
                          >
                            €{str}
                          </Typography>
                        );
                      }
                      return `.${str}`;
                    })}
                </Typography>
              </AccordionSummary>
              <Box className="flex flex-row justify-end">
                <Button onClick={goToPay} variant="plain" color="accent">
                  {t_order("checkoutAndPay")}
                </Button>
                <Button
                  onClick={goWithoutPay}
                  className="ml-2"
                  variant="solid"
                  color="neutral"
                  sx={{ borderRadius: 360 }}
                >
                  {t("submit")}
                </Button>
              </Box>
            </Box>
            <AccordionDetails
              sx={{
                borderBottomColor: expandTaxInfo ? "neutral.120" : undefined,
                borderBottomWidth: expandTaxInfo ? "1px" : 0,
                borderBottomStyle: expandTaxInfo ? "solid" : undefined,
                margin: expandTaxInfo ? "-1.25rem -1.75rem 1.5rem" : 0,
              }}
            >
              <Grid
                container
                className="flex grow flex-col mt-2"
                sx={{ color: "neutral.870" }}
              >
                <Grid
                  container
                  className="flex grow flex-row h-3.5"
                  columns={{ xs: 4, md: 12 }}
                >
                  <Grid xs={3} className="flex justify-end">
                    <Typography
                      fontSize="0.75rem"
                      lineHeight="normal"
                      fontWeight={700}
                    >
                      {t_order("IVA")}
                    </Typography>
                  </Grid>
                  <Grid xs={3} className="flex justify-end">
                    <Typography
                      fontSize="0.75rem"
                      lineHeight="normal"
                      fontWeight={700}
                    >
                      {t_order("BASEIMP")}
                    </Typography>
                  </Grid>
                  <Grid xs={3} className="flex justify-end">
                    <Typography
                      fontSize="0.75rem"
                      lineHeight="normal"
                      fontWeight={700}
                    >
                      {t_order("IMPIVA")}
                    </Typography>
                  </Grid>
                  <Grid xs={3} className="flex justify-end">
                    <Typography
                      fontSize="0.75rem"
                      lineHeight="normal"
                      fontWeight={700}
                    >
                      {t("TOTAL")}
                    </Typography>
                  </Grid>
                </Grid>
                {tax(order?.items).map((vaxItem: VAXItem, index: number) => (
                  <Grid
                    container
                    key={`${vaxItem.tax}_${index}`}
                    className="flex grow flex-col mt-2"
                  >
                    <Grid
                      container
                      className="flex grow flex-row h-3.5"
                      columns={{ xs: 4, md: 12 }}
                    >
                      <Grid xs={3} className="flex justify-end">
                        <Typography
                          fontSize="0.75rem"
                          lineHeight="normal"
                          fontWeight={400}
                        >
                          {vaxItem.tax === 0 ? "" : vaxItem.tax * 100}
                        </Typography>
                      </Grid>
                      <Grid xs={3} className="flex justify-end">
                        <Typography
                          fontSize="0.75rem"
                          lineHeight="normal"
                          startDecorator="€"
                          fontWeight={400}
                        >
                          {padEnd(vaxItem.originalTotal)}
                        </Typography>
                      </Grid>
                      <Grid xs={3} className="flex justify-end">
                        <Typography
                          fontSize="0.75rem"
                          lineHeight="normal"
                          startDecorator="€"
                          fontWeight={400}
                        >
                          {padEnd(vaxItem.originalTotal * vaxItem.tax)}
                        </Typography>
                      </Grid>
                      <Grid xs={3} className="flex justify-end">
                        <Typography
                          fontSize="0.75rem"
                          lineHeight="normal"
                          startDecorator="€"
                          fontWeight={400}
                        >
                          {padEnd(
                            vaxItem.originalTotal +
                              vaxItem.originalTotal * vaxItem.tax
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                className="flex grow flex-row h-8 mt-3"
                columns={{ xs: 4, md: 12 }}
                sx={{
                  marginLeft: "-0.75rem",
                  marginRight: "-0.75rem",
                  borderTopWidth: "1px",
                  borderTopStyle: "solid",
                  borderTopColor: "neutral.120",
                  marginBottom: "-0.5rem",
                  padding: "0 0.75rem",
                }}
              >
                <Grid xs={3} className="flex justify-end">
                  <Typography
                    fontSize="0.75rem"
                    lineHeight="normal"
                    fontWeight={400}
                  ></Typography>
                </Grid>
                <Grid xs={3} className="flex justify-end">
                  <Typography
                    fontSize="0.75rem"
                    lineHeight="normal"
                    startDecorator="€"
                    fontWeight={400}
                  >
                    {padEnd(
                      total(
                        (order as SubOrder)?.items ?? [],
                        SumType.WithOptions
                      )
                    )}
                  </Typography>
                </Grid>
                <Grid xs={3} className="flex justify-end">
                  <Typography
                    fontSize="0.75rem"
                    lineHeight="normal"
                    startDecorator="€"
                    fontWeight={400}
                  >
                    {padEnd(
                      total((order as SubOrder)?.items ?? [], SumType.OnlyTax)
                    )}
                  </Typography>
                </Grid>
                <Grid xs={3} className="flex justify-end">
                  <Typography
                    fontSize="0.75rem"
                    lineHeight="normal"
                    startDecorator="€"
                    fontWeight={400}
                  >
                    {padEnd(
                      total((order as SubOrder)?.items ?? [], SumType.WithTax)
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      }
    >
      <Box className="flex flex-grow overflow-hidden flex-col">
        <Grid className="flex h-10 flex-row mx-4 mt-6">
          <Typography className="flex grow text-xs leading-10 font-bold">
            {t("Description")}
          </Typography>
          <Typography
            className="flex mr-4 flex-row justify-end text-xs leading-10 font-bold"
            width="5.5rem"
          >
            {t("Total")}
          </Typography>
          <Typography className="flex flex-row justify-end text-xs leading-10 font-bold w-32">
            {t("Quantity")}
          </Typography>
        </Grid>
        <Box className="px-4 w-full mb-6 grow overflow-y-auto overflow-x-hidden">
          <Grid container className="flex flex-col" sx={{ flexGrow: 1 }}>
            {order?.items.map((item: Item) => (
              <Grid
                key={item.id}
                flexDirection="row"
                className="flex h-10 flex-row mb-4 grow w-full"
              >
                <Box className="flex grow flex-row overflow-hidden">
                  <Avatar className="mr-1" alt={item.name} src={item.image} />
                  <Box className="flex grow flex-col justify-between overflow-hidden">
                    <Typography
                      className="text-sm"
                      lineHeight="normal"
                      fontWeight={500}
                      sx={{ color: "neutral.870" }}
                      noWrap
                    >
                      {item.name}
                      <Typography
                        lineHeight="normal"
                        fontWeight={400}
                        sx={{ color: "neutral.260", fontSize: "0.625rem" }}
                        className="ml-0.5"
                      >
                        ({item.id})
                      </Typography>
                    </Typography>
                    <Typography
                      className="text-sm"
                      lineHeight="normal"
                      fontWeight={400}
                      startDecorator="€"
                      sx={{ color: "neutral.870" }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  className="flex mr-4 flex-row justify-end leading-10 text-xs"
                  fontWeight={700}
                  width="5.5rem"
                >
                  {calcFinalPriceForOrderItem(item, item.quantity)
                    .split(".")
                    .map((str, index) => {
                      if (index === 0) {
                        return (
                          <Typography
                            key={`${index}_${str}`}
                            className="text-base"
                            lineHeight="normal"
                            startDecorator="€"
                          >
                            {str}
                          </Typography>
                        );
                      }
                      return `.${str}`;
                    })}
                </Typography>
                <Box className="w-32 min-w-32 max-w-32">
                  <NumberInput
                    value={item.quantity}
                    onChange={(num) =>
                      setOrder({ item: { ...item, quantity: num } })
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </OrderDrawer>
  );
}
