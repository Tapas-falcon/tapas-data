import {
  Box,
  Card,
  CardContent,
  CardCover,
  Chip,
  Grid,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import { Filter, ListReqParams } from "@/api/types";
import { queryPromotions, selDishesState } from "@/state/selectors";
import { Categorie, DiscountType, Promotion } from "@/state/dishes/types";
import { discountValFormat, padEnd } from "./util";
import { SRC_URL } from "@/api/apiProxy";

export default function Promotions() {
  const t = useTranslations("dishes");
  const router = useRouter();

  // 列表筛选条件
  const [filters] = useRecoilState(selDishesState("filters"));

  const reqBody: ListReqParams = {
    lang: router.locale ?? "es",
    filters: [...((filters as Filter[]) ?? [])],
  };

  const [promotions, setPromotions] = useRecoilState(
    selDishesState("promotions")
  );

  // 订阅当前菜品类型
  const category = useRecoilValue(
    selDishesState("selectedCategorie")
  ) as Categorie;

  if (reqBody.filters) {
    reqBody.filters.push({ field: "category", values: [category?.objId] });
  }

  // 推荐，促销列表请求触发
  const dataLoadable = useRecoilValueLoadable(queryPromotions(reqBody));

  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setPromotions(dataLoadable.contents);
    }
  }, [dataLoadable]);

  const CardCoverItem = ({ src }: { src: string }) => {
    const [imgLoad, setImgLoad] = useState(true);
    return (
      <CardCover>
        <Skeleton animation="wave" loading={imgLoad}>
          <img
            srcSet={`${SRC_URL}/picture/${src}`}
            loading="lazy"
            alt=""
            onLoad={() => setImgLoad(false)}
          />
        </Skeleton>
      </CardCover>
    );
  };

  return (
    (promotions as Promotion[]).length > 0 && (
      <Grid xs={4} className="pe-12 flex flex-col h-full">
        <Typography
          level="title-sm"
          className="text-xs font-bold flex h-4 flex-row w-full"
        >
          {t("promotionListTitle")}
        </Typography>
        <Box className="pb-20 flex flex-col grow overflow-y-auto overflow-x-hidden">
          <List>
            {(promotions as Promotion[])?.map(
              ({
                id,
                name,
                img: src,
                discount: {
                  type: { key: discountType },
                  value: discountValue,
                },
                // discountLimitType,
                // discountType,
                // discountLimitValue,
                targetDishes,
                // discountValue,
                startAt,
                endAt,
              }) => {
                const outOfStock = new Date() > endAt;
                return (
                  <ListItem key={id} className="px-0">
                    <Card
                      sx={{
                        minHeight: "10.5rem",
                        maxHeight: "10.5rem",
                        overflow: "hidde",
                        width: "100%",
                        minWidth: "10.5rem",
                      }}
                      className="py-2 px-3"
                    >
                      <CardCoverItem src={src}></CardCoverItem>
                      {outOfStock && (
                        <CardCover
                          sx={{
                            background: "var(--joy-palette-neutral-50)",
                          }}
                        />
                      )}
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        {discountType === DiscountType.percentage && (
                          <Stack spacing={2}>
                            <Skeleton
                              animation="wave"
                              loading={discountValue < 0}
                            >
                              <Chip
                                color="accent"
                                variant="solid"
                                className="rounded text-xs"
                              >
                                {t("discountPercentage", {
                                  value: discountValue * 100,
                                })}
                              </Chip>
                            </Skeleton>
                          </Stack>
                        )}
                        <Box className="flex flex-row justify-between">
                          <Skeleton animation="wave" loading={!name}>
                            <Typography
                              level="title-md"
                              textColor="common.white"
                              noWrap
                            >
                              {name}
                            </Typography>
                          </Skeleton>
                          {discountType === DiscountType.percentage &&
                            targetDishes.price && (
                              <Stack spacing={1} direction="row">
                                <Skeleton
                                  animation="wave"
                                  loading={targetDishes?.price < 0}
                                >
                                  <Typography
                                    startDecorator="€"
                                    textColor="neutral.79"
                                    className="line-through text-xs"
                                  >
                                    {padEnd(targetDishes.price)}
                                  </Typography>
                                </Skeleton>
                                <Typography textColor="common.white">
                                  /
                                </Typography>
                                <Skeleton
                                  animation="wave"
                                  loading={
                                    targetDishes?.price < 0 && discountValue < 0
                                  }
                                >
                                  <Typography
                                    startDecorator="€"
                                    className="text-xs"
                                    textColor="common.white"
                                  >
                                    <span className="first-letter-1">
                                      {padEnd(
                                        targetDishes.price -
                                          discountValFormat(
                                            targetDishes.price,
                                            discountValue
                                          )
                                      )}
                                    </span>
                                  </Typography>
                                </Skeleton>
                              </Stack>
                            )}
                          {discountType === DiscountType.money && (
                            <Skeleton
                              animation="wave"
                              loading={
                                targetDishes?.price < 0 && discountValue < 0
                              }
                            >
                              <Typography
                                startDecorator="€"
                                className="text-xs"
                                textColor="common.white"
                              >
                                <span className="first-letter-1">
                                  {padEnd(targetDishes.price - discountValue)}
                                </span>
                              </Typography>
                            </Skeleton>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </ListItem>
                );
              }
            )}
          </List>
        </Box>
      </Grid>
    )
  );
}
