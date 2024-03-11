import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { createElement, lazy, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";

import {
  queryMenuCategories,
  selDishesState,
  selShellState,
} from "@/state/selectors";
import { Categorie, DishesState } from "@/state/dishes/types";
import { headerState } from "@/state/atoms";
import { ListReqParams } from "@/api/types";

export default function Categories() {
  const t = useTranslations("dishes");
  const router = useRouter();
  const reqBody: ListReqParams = {
    lang: router.locale ?? "es",
  };

  const [header, setHeader] = useRecoilState(headerState);

  const [categories, setCategories] = useRecoilState(
    selDishesState("categories")
  );

  const [selectedCategorie, setSelectedCategorie] = useRecoilState(
    selDishesState("selectedCategorie")
  );

  const dataLoadable = useRecoilValueLoadable(queryMenuCategories(reqBody));
  const secondExpand = useRecoilValue(selShellState("secondExpand"));

  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setCategories(dataLoadable.contents);
      setSelectedCategorie(dataLoadable.contents[0]); // default selected;
      setHeader({ ...header, title: dataLoadable.contents[0].name ?? "N/A" });
    }
  }, [dataLoadable]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Typography
        level="h2"
        sx={{
          color: "var(--joy-palette-common-white)",
        }}
        className={clsx(
          "flex",
          "flex-col",
          "overflow-hidde",
          "mt-8",
          "mb-3.5",
          "cursor-pointer",
          {
            "mx-4": !secondExpand,
            "mx-8": secondExpand,
          }
        )}
      >
        {secondExpand ? t("menu") : t("menu").substring(0, 1)}
      </Typography>

      <List
        className={clsx("flex", "overflow-hidde", {
          "mx-0": !secondExpand,
          "mx-4": secondExpand,
        })}
        sx={{
          "--List-gap": "1.015rem",
        }}
      >
        {(categories as Categorie[])?.map((category) => {
          const { name, icon, id } = category;
          return (
            <ListItem
              key={category.id}
              className={clsx({
                "px-0": secondExpand,
                "px-2": !secondExpand,
              })}
            >
              <ListItemButton
                color="primary"
                variant="soft"
                selected={
                  (selectedCategorie as DishesState["selectedCategorie"])
                    ?.id === id
                }
                onClick={() => {
                  setSelectedCategorie(category);
                  setHeader({ ...header, title: category.name ?? "N/A" });
                }}
                className={clsx("h-10", "rounded-3xl", {
                  "mx-0": !secondExpand,
                  "px-2": !secondExpand,
                })}
              >
                <ListItemDecorator>
                  <Suspense fallback={<></>}>
                    {createElement(
                      lazy(() =>
                        import("@tapas/ui/icons").then((module) => ({
                          default: (module as unknown as any)[icon] ?? "",
                        }))
                      ),
                      {}
                    )}
                  </Suspense>
                </ListItemDecorator>
                <ListItemContent>{name}</ListItemContent>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
    },
  };
};
