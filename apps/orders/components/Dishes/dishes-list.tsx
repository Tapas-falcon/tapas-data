import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import clsx from "clsx";

import {
  queryDishes,
  selDishesState,
  selRolesState,
} from "@/state/selectors";
import { Filter, ListReqParams } from "@/api/types";
import { DishesPERMS } from "@/state/roles/types";
import {
  Categorie,
  DishesItem,
  Promotion,
} from "@/state/dishes/types";
import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import DishesItemTmp from "./dishes-item";

export default function DishesList() {
  const t = useTranslations("dishes");
  const router = useRouter();

  // 列表筛选条件
  const [filters] = useRecoilState(selDishesState("filters"));

  // 订阅用户二级权限以作校验
  const permisssions = useRecoilValue(
    selRolesState("SecondaryPERMS")
  ) as unknown as DishesPERMS;

  // 订阅二级权限集合
  const promotions = useRecoilValue(
    selDishesState("promotions")
  ) as Promotion[];

  // 订阅当前二级导航选中菜品类型 -->  显示总列表标题
  const selectedCategorie = useRecoilValue(
    selDishesState("selectedCategorie")
  ) as Categorie | undefined;

  // 订阅 菜品列表
  const [dishes, setDishes] = useRecoilState(selDishesState("dishes"));

  // 全屏显示菜品列表与否？
  const fullScreen = !(
    permisssions?.includes("Promotion") && promotions?.length > 0
  );

  const defaultFilter: Filter[] = selectedCategorie?.objId
    ? [{ field: "category", values: [selectedCategorie?.objId] }]
    : [];

  const reqBody: ListReqParams = {
    lang: router.locale ?? "es",
    filters: (filters as Filter[])?.concat(defaultFilter) ?? defaultFilter,
  };

  // 菜品列表请求触发
  const dataLoadable = useRecoilValueLoadable(queryDishes(reqBody));

  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setDishes(dataLoadable.contents);
    }
  }, [dataLoadable]);

  // 菜品列表模板
  return fullScreen ? (
    (dishes as DishesItem[])?.map((dishesItem, index) => (
      <Grid
        xs={6}
        key={dishesItem.id}
        className={clsx(
          "h-10",
          "mb-3",
          "h-24",
          "overflow-hidden",
          "justify-center",
          "flex",
          "flex-col",
          {
            "pl-3": index % 2 !== 0,
            "pr-3": index % 2 === 0,
          }
        )}
      >
        <DishesItemTmp data={dishesItem}></DishesItemTmp>
      </Grid>
    ))
  ) : (
    <Grid xs={8} className="flex flex-col h-full">
      <Typography level="title-sm" className="text-xs font-bold flex w-full">
        {t("dishesItemList", { name: selectedCategorie?.name ?? "" })}
      </Typography>
      <Box className="pb-20 flex flex-col grow overflow-y-auto overflow-x-hidden">
        <List>
          {(dishes as DishesItem[])?.map((dishesItem) => {
            return (
              <ListItem
                key={dishesItem.id}
                className="px-0 mb-3 h-24 overflow-hidden justify-center flex flex-col"
              >
                <DishesItemTmp data={dishesItem}></DishesItemTmp>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Grid>
  );
}
