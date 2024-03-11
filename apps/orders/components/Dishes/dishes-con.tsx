import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Button, ButtonGroup, Grid } from "@mui/joy";
import clsx from "clsx";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import { queryTags, selDishesState, selRolesState } from "@/state/selectors";
import { Categorie, Promotion, Tag } from "@/state/dishes/types";
import { Filter, ListReqParams } from "@/api/types";
import { DishesPERMS } from "@/state/roles/types";
import DishesList from "@/components/Dishes/dishes-list";
import Promotions from "@/components/Dishes/promotions";

export default function DishesContainer() {
  const t = useTranslations("dishes");
  const router = useRouter();
  const reqBody: ListReqParams = {
    lang: router.locale ?? "es",
  };

  // 列表TAG 列表
  const [tags, setTags] = useRecoilState(selDishesState("tags"));

  // 订阅当前菜品类型
  const category = useRecoilValue(
    selDishesState("selectedCategorie")
  ) as Categorie;

  reqBody.filters = [{ field: "category", values: [category?.objId] }];

  // 订阅用户二级权限以作校验
  const permisssions = useRecoilValue(selRolesState("SecondaryPERMS"));

  // 订阅推送列表数据
  const promotions = useRecoilValue(
    selDishesState("promotions")
  ) as Promotion[];

  // Tag筛选条件
  const [filters, setFilters] = useRecoilState(selDishesState("filters"));

  // TAG 列表请求触发
  const dataLoadable = useRecoilValueLoadable(queryTags(reqBody));

  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setTags(dataLoadable.contents);
    }
  }, [dataLoadable]);

  const filterTag = (objId?: string) => {
    const orginal = filters as Filter[];
    const others = orginal.filter(({ field }) => field !== "tags");
    setFilters(
      objId ? [...others, { field: "tags", values: [objId] }] : [...others]
    );
  };

  // const dishes = ;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      flexWrap={"nowrap"}
      sx={{ flexGrow: 1 }}
      className="mx-5 mt-6"
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="w-full"
        height={"2.75rem"}
      >
        <Box
          className="flex flex-row grow overflow-x-auto overflow-y-hidden"
          width={0}
          maxWidth={"calc(100% - 7rem)"}
        >
          {(tags as Tag[])?.map((tag) => {
            const { name } = tag;
            const selected = ((filters as Filter[]) ?? []).find(
              ({ field, values }: Filter) =>
                field === "tags" && values.includes(tag.objId)
            );
            return (
              <Button
                key={tag.key}
                color="neutral"
                variant="soft"
                size="lg"
                sx={(theme) => ({
                  ...(selected &&
                    ({
                      ...theme.variants["softActive"]["neutral"],
                      "&:hover, &:active":
                        theme.variants["softActive"]["neutral"],
                    } as any)),
                })}
                onClick={() => filterTag(tag.objId)}
                className="hover:border-transparent rounded-3xl mr-2"
              >
                {name}
              </Button>
            );
          })}
        </Box>
        <Button
          variant="plain"
          color="neutral"
          size="lg"
          className="rounded-3xl"
          onClick={() => filterTag()}
        >
          {t("resetBtn")}
        </Button>
      </Grid>
      <Grid
        className={clsx(
          "mt-4",
          "mx-0",
          "overflow-hidden",
          "mb-0",
          "flex",
          "grow",
          {
            "place-content-start":
              !(permisssions as unknown as DishesPERMS)?.includes(
                "Promotion"
              ) || promotions.length <= 0,
          }
        )}
        container
        spacing={2}
      >
        {(permisssions as unknown as DishesPERMS)?.includes("Promotion") && (
          <Promotions></Promotions>
        )}
        <DishesList></DishesList>
      </Grid>
    </Grid>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
    },
  };
}
