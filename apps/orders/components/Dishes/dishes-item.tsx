import { useRecoilState, useRecoilValue } from "recoil";
import { Suspense, createElement, lazy, useState } from "react";
import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useTranslations } from "next-intl";

import { DiscountType, DishesItem } from "@/state/dishes/types";
import { Discount, SubOrder } from "@/state/order/types";
import { selCurOrderOperate, selDishesState, selShellState } from "@/state/selectors";
import { AddIcon } from "@tapas/ui/icons";
import { discountValFormat, padEnd } from "./util";
import { SRC_URL } from "@/api/apiProxy";
import DishesItemImg from "./dishes-item-img";

export enum ItemState {
  Active,
  Hover,
  Normal,
  Disabled,
}

export default function DishesItemTmp({ data }: { data: DishesItem }) {
  const t = useTranslations("dishes");

  // 订阅当前订单 判定已选菜品及状态
  const curOrder = useRecoilValue(selCurOrderOperate("curOrder"));

  // 订阅显示详情的当前菜品
  const [, setCurDishes] = useRecoilState(selDishesState("curDishes"));

  const [, setDrawerOpen] = useRecoilState(selShellState("drawerOpen"));

  const { image, name, id, description, allergens, price, discount } = data;
  const selectItemIndex = ((curOrder as SubOrder)?.items ?? []).findIndex(
    ({ id }) => id === data.id
  );
  const defaultState =
    selectItemIndex >= 0 ? ItemState.Active : ItemState.Normal;

  const [state] = useState<ItemState>(defaultState);

  // 计算折扣前后显示数据方法
  const discountCalc = (price: number, { type, value }: Discount): string => {
    switch (type.key) {
      case DiscountType.percentage: // 折扣百分比
        return padEnd(price - discountValFormat(price, value));
      default: // 折扣现金减
        return padEnd(price - value);
    }
  };

  // 菜品图片区域的显示模板
  const DishesImg = ({
    image,
    discount,
  }: {
    image: string;
    discount?: Discount;
  }) => {
    const [imgLoad, setImgLoad] = useState(true);
    return (
      <AspectRatio
        flex
        ratio="1"
        className="relative"
        maxHeight={"5rem"}
        sx={{ minWidth: "5rem", borderRadius: "50%" }}
      >
        <Skeleton animation="wave" loading={imgLoad}>
          <img
            srcSet={`${SRC_URL}/picture/${image}`}
            loading="lazy"
            alt=""
            onLoad={() => setImgLoad(false)}
          />
        </Skeleton>
        {discount && (
          <Box
            sx={{ height: "1.625rem", backgroundColor: "accent.500" }}
            className="absolute inset-x-0 bottom-0 text-center justify-center flex flex-col "
          >
            <Skeleton animation="wave" loading={discount.value < 0}>
              <Typography
                sx={{ color: "common.white" }}
                className="text-xs font-bold "
              >
                {discount.type.key === DiscountType.percentage &&
                  t("discountPercentage", {
                    value: discount.value * 100,
                  })}
                {discount.type.key === DiscountType.money &&
                  t("discountMenony", { value: discount.value })}
              </Typography>
            </Skeleton>
          </Box>
        )}
      </AspectRatio>
    );
  };

  return (
    <Card
      orientation="horizontal"
      className="w-full border-none px-2 py-2 h-24 rounded-xl cart-p"
      sx={{
        "&:hover": {
          backgroundColor: "neutral.4",
        },
      }}
    >
      <DishesImg image={image} discount={discount}></DishesImg>
      <CardContent>
        <Box className="flex flex-row justify-between">
          <Box className="flex grow overflow-hidden">
            <Skeleton animation="wave" loading={!name}>
              <Typography level="title-md" fontWeight={700} noWrap>
                {name}
                <Typography
                  className="ml-1"
                  fontSize="0.625rem"
                  fontWeight={400}
                  textColor="neutral.260"
                >
                  ({id})
                </Typography>
              </Typography>
            </Skeleton>
          </Box>
          <Box className="flex ml-3">
            <Typography textColor="neutral.870">
              {discount && (
                <Skeleton animation="wave" loading={price < 0}>
                  <Typography
                    startDecorator=" "
                    className="text-xs"
                    fontWeight={700}
                    textColor="neutral.260"
                  >
                    <span className="line-through">€{padEnd(price)}</span>
                    <Typography className="mx-1">/</Typography>
                  </Typography>
                </Skeleton>
              )}
              <Skeleton animation="wave" loading={price < 0}>
                <Typography
                  startDecorator="€"
                  className="text-xs"
                  fontWeight={700}
                >
                  <span className="first-letter-1">
                    {discount ? discountCalc(price, discount) : price}
                  </span>
                </Typography>
              </Skeleton>
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-row grow justify-between">
          <Box className="flex flex-col justify-start">
            <Box className="flex flex-row justify-start" sx={{ gap: 1 }}>
              {allergens?.map(({ icon, name, key }) => (
                <DishesItemImg icon={icon} name={name} key={key} />
              ))}
            </Box>
            <Skeleton
              animation="wave"
              loading={description === null || description === undefined}
            >
              <Typography
                className="text-xs mt-1"
                textColor="neutral.540"
                fontWeight={400}
              >
                {description}
              </Typography>
            </Skeleton>
          </Box>
          <Box className="flex flex-col justify-center">
            <AvatarGroup
              sx={{ writingMode: "vertical-rl" }}
              className="relative"
            >
              <IconButton
                variant="soft"
                // disabled={state === ItemState.Disabled}
                className="h-10 w-10 rounded-full"
                sx={(theme) => ({
                  ...(((curOrder as SubOrder)?.items ?? []).findIndex(
                    ({ id }) => id === data.id
                  ) >= 0 &&
                    ({
                      ...theme.variants["softActive"]["neutral"],
                      "&:hover, &:active":
                        theme.variants["softActive"]["neutral"],
                    } as any)),
                  //   ...(state === ItemState.Disabled &&
                  //     theme.variants["softDisabled"]["neutral"]),
                })}
                onClick={() => {
                  setCurDishes(data);
                  setDrawerOpen(true);
                }}
              >
                <AddIcon />
              </IconButton>
              {((curOrder as SubOrder)?.items ?? []).findIndex(
                ({ id }) => id === data.id
              ) >= 0 && (
                <Avatar
                  sx={{
                    "box-shadow": "none",
                    right: "-0.25rem",
                    color: "common.white",
                    backgroundColor: "accent.500",
                    transform: "rotate(-90deg)",
                  }}
                  className="absolute top-0 h-6 w-6"
                >
                  {(curOrder as SubOrder)?.items[selectItemIndex]?.quantity}
                </Avatar>
              )}
            </AvatarGroup>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
