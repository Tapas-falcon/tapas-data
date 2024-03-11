import { Button, Checkbox, Grid, List, ListItem, Typography } from "@mui/joy";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import NumberInput from "@tapas/ui/NumberInput";
import OrderDrawer from "@/components/OrderDrawer";
import {
  selCurOrderOperate,
  selDishesState,
  selShellState,
  selectedDishesOptionsState,
} from "@/state/selectors";
import { Shell } from "@/state/type";
import {
  DishesItem,
  Option,
  OptionState,
  SelectType,
  setOptionParam,
} from "@/state/dishes/types";
import { SessionKeys, SubOrder } from "@/state/order/types";
import { useState } from "react";
import { calcFinalPriceForOrderItem, padEnd } from "./util";
import { selUserState } from "@/state/user/user.selectors";
import { currentTableState } from "@/state/atoms";
import {
  reqGenerateNewOrder,
  updateDishesForUnSubmitOrder,
  updateDishesForSubmitedOrder,
} from "@/api/ordersAPI";

export default function DishesOptions() {
  const t = useTranslations("common");
  const [drawerOpen, setDrawerOpen] = useRecoilState(
    selShellState("drawerOpen")
  );

  // 营销信息 TODO
  const [promo, setPromo] = useRecoilState(selShellState("promo"));

  // 订阅当前订单 判定已选菜品及状态
  const [curOrder, setCurOrder] = useRecoilState(selCurOrderOperate("curOrder"));

  // 订阅显示详情的当前菜品
  const dishes = useRecoilValue(selDishesState("curDishes")) as DishesItem;

  const [quantity, setQuantity] = useState(
    (curOrder as SubOrder)?.items?.find(({ id }) => id === dishes.id)
      ?.quantity ?? 1
  );

  // 订阅右侧抽屉修改状态
  const [drawerContentModified, setDrawerContentModified] = useRecoilState(
    selShellState("drawerContentModified")
  );

  const [selectedOptions, setSelectedOptions] = useRecoilState(
    selectedDishesOptionsState("options")
  );

  const storeId = useRecoilValue(selUserState("storeId")) as string;

  const currentTable = useRecoilValue(currentTableState);

  return (
    <OrderDrawer
      open={drawerOpen as Shell["drawerOpen"]}
      onClose={() => {
        setDrawerOpen(false);
        setQuantity(
          (curOrder as SubOrder)?.items?.find(({ id }) => id === dishes.id)
            ?.quantity ?? 1
        );
      }}
      title={dishes?.name ?? "N/A"}
      secondaryTopRight={
        <Button
          variant="plain"
          color="neutral"
          disabled={!drawerContentModified}
          onClick={() => {
            setQuantity(
              (curOrder as SubOrder)?.items?.find(({ id }) => id === dishes.id)
                ?.quantity ?? 1
            );
            setDrawerContentModified(false);
          }}
        >
          {t("Reset")}
        </Button>
      }
      summary={
        <>
          <Typography level="title-sm" className="leading-9">
            {t("Quantity")}
          </Typography>
          <NumberInput
            value={
              (curOrder as SubOrder)?.items?.find(({ id }) => id === dishes.id)
                ?.quantity ?? 1
            }
            onChange={(v) => {
              setQuantity(v);
              setDrawerContentModified(true);
            }}
          />
        </>
      }
      promoMessage={promo as Shell["promo"]}
      bottom={
        <Button
          variant="solid"
          color="neutral"
          className="w-full rounded-[360px]"
          onClick={() => {
            if (quantity > 0) {
              setCurOrder({ item: { ...dishes, quantity: quantity } });
              let options: any[] = [];
              dishes.options.forEach(
                ({ children }) =>
                  (options = options.concat(
                    children.filter(({ checked }) => checked)
                  ))
              );
              if (
                !curOrder._id &&
                !sessionStorage.getItem(SessionKeys.OrderId)
              ) {
                reqGenerateNewOrder({
                  storeId, // 注此处为店面显示ID非主键ID
                  tableId: currentTable?._id,
                  gustNum: currentTable?.guestNumber,
                  // taxRate: dishes.taxRate,
                  createdBy: currentTable?.operator_id,
                  dishesId: dishes._id, // 菜品主键
                  options, // 购买选项修改
                  quantity, // 购买数量修改
                  price: dishes.price, // 单价
                }).then(({ _id, id, modifyHistory }: any) => {
                  setCurOrder({ order: { _id, id, modifyHistory } });
                });
              } else if (
                curOrder.modifyHistory ||
                sessionStorage.getItem(SessionKeys.OperateId)
              ) {
                updateDishesForUnSubmitOrder({
                  operateId: curOrder?.modifyHistory?.slice(-1).pop(),
                  dishesId: dishes._id, // 菜品主键
                  options, // 购买选项修改
                  quantity,
                  createdBy: currentTable?.operator_id,
                });
              } else {
                updateDishesForSubmitedOrder({
                  orderId: curOrder._id,
                  storeId, // 注此处为店面显示ID非主键ID
                  createdBy: currentTable?.operator_id,
                  dishesId: dishes._id, // 菜品主键
                  options, // 购买选项修改
                  quantity, // 购买数量修改
                  price: dishes.price, // 单价
                });
              }
            } else {
              setDrawerContentModified(false);
              (selectedOptions as Option[]).forEach(({ groupKey, key }) => {
                setSelectedOptions({ groupKey, key, checked: false });
              });
            }
            setDrawerOpen(false);
          }}
        >
          {`${t("AddToCart")} €${
            dishes ? calcFinalPriceForOrderItem(dishes, quantity) : 0
          }`}
        </Button>
      }
    >
      <List>
        {dishes?.options.map(
          ({ name, children, key: groupKey, selectType }) => {
            if (children.length > 0) {
              return (
                <ListItem key={groupKey} className="mb-6">
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    sx={{ flexGrow: 1 }}
                  >
                    <Typography
                      level="title-sm"
                      className="text-xs font-bold"
                      sx={{ color: "neutral.870" }}
                    >
                      {name}
                    </Typography>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      className="mt-2 mx-0"
                    >
                      {children.map(
                        ({ name, key, checked, extra, state }, index) => (
                          <Grid
                            xs={2}
                            sm={4}
                            md={4}
                            key={key}
                            className={clsx("p-0", "mb-2", "flex", "max-h-16", {
                              "pr-2": index === 0 || (index + 1) % 3 !== 0,
                            })}
                          >
                            {selectType.key === SelectType.Single && (
                              <Button
                                variant="soft"
                                color="neutral"
                                className="flex rounded-xl px-3 py-2.5 text-left min-h-10"
                                sx={(theme) => ({
                                  width: "-webkit-fill-available",
                                  ...(checked &&
                                    ({
                                      ...theme.variants["softActive"][
                                        "neutral"
                                      ],
                                      "&:hover, &:active":
                                        theme.variants["softActive"]["neutral"],
                                    } as any)),
                                })}
                                onClick={() =>
                                  setSelectedOptions({
                                    groupKey,
                                    key,
                                    checked: !checked,
                                  } as unknown as setOptionParam)
                                }
                              >
                                {name}
                                {extra && extra > 0 && ` (+€${padEnd(extra)})`}
                              </Button>
                            )}
                            {selectType.key === SelectType.Multi && (
                              <Checkbox
                                variant="soft"
                                color="neutral"
                                className="rounded-xl px-3 py-2.5 items-center min-h-10 checkbox-neutral-soft"
                                label={`${name}${
                                  extra && extra > 0 && ` (+€${padEnd(extra)})`
                                }`}
                                disabled={state === OptionState.Disabled}
                                checked={checked}
                                onChange={(event) => {
                                  setSelectedOptions({
                                    groupKey,
                                    key,
                                    checked: event.target.checked,
                                  } as unknown as setOptionParam);
                                }}
                              />
                            )}
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              );
            }
          }
        )}
      </List>
    </OrderDrawer>
  );
}
