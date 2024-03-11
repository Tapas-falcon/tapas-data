import {
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Chip,
  Skeleton,
  Sheet,
  Table,
} from "@mui/joy";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useRouter } from "next/router";

import { TextButton } from "@tapas/ui/Button";
import {
  queryDishes,
  queryMenuCategories,
  selDishesState,
} from "@/state/selectors";
import { ListReqParams } from "@/api/types";
import { Categorie, DishesItem } from "@/state/dishes/types";
import ImageLoad from "../ImageLoad";
import NumberInput from "@tapas/ui/NumberInput";

export interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function AddProductModal({ open, setOpen }: Props) {
  const t = useTranslations("dailySettlement");
  const common = useTranslations("common");
  const router = useRouter();
  const reqBody: ListReqParams = {
    lang: router.locale ?? "es",
  };

  const [categories, setCategories] = useRecoilState(
    selDishesState("categories")
  );

  // if ((categories as Categorie[]).length <= 0) {
  const dataLoadable = useRecoilValueLoadable(queryMenuCategories(reqBody));

  useEffect(() => {
    if (dataLoadable?.state === "hasValue") {
      setCategories(dataLoadable.contents);
    }
  }, [dataLoadable]);

  // 订阅 菜品列表
  const [dishes, setDishes] = useRecoilState(selDishesState("dishes"));

  // 菜品列表请求触发
  const dataLoadableDish = useRecoilValueLoadable(queryDishes(reqBody));

  useEffect(() => {
    if (dataLoadableDish?.state === "hasValue") {
      setDishes(dataLoadableDish.contents);
    }
  }, [dataLoadableDish]);

  const selected = false;

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        minWidth="45vw"
        maxWidth="45vw"
        variant="outlined"
        role="alertdialog"
        sx={{ height: "75vh" }}
      >
        <DialogTitle>
          <Box className="flex flex-row grow justify-between">
            <Typography
              fontSize={16}
              fontWeight={700}
              lineHeight="normal"
              className="self-center"
              sx={{ color: "neutral.870" }}
            >
              {t("AddExceededProductTitle")}
            </Typography>
            <TextButton text={t("BtnClearAll")} />
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent
          className="flex flex-col grow overflow-hidden"
          sx={{
            marginTop: "-0.75rem",
            marginLeft: "-1.25rem",
            marginRight: "-1.25rem",
          }}
        >
          <Box
            className="flex flex-row grow h-full overflow-hidden"
            sx={{
              borderBottomColor: "neutral.120",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
            }}
          >
            <Box className="flex flex-col w-1/4 min-w-24 overflow-x-hidden overflow-y-auto">
              <List
                sx={{
                  "--ListItem-minHeight": "3rem",
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingX": "1rem",
                  "--ListItemButton-selected-backgroundColor": "neutral.120",
                }}
              >
                {(categories as Categorie[]).map(({ name, objId }) => (
                  <ListItem key={objId}>
                    <ListItemButton
                      className="flex flex-row justify-between"
                      selected={selected}
                      style={{
                        backgroundColor: selected
                          ? "var(--joy-palette-neutral-120)"
                          : "",
                        color: "var(--joy-palette-neutral-870)",
                      }}
                    >
                      <ListItemContent className="flex flex-col relative h-10 justify-center">
                        <Skeleton
                          height={16}
                          width={"65%"}
                          loading={false}
                          animation="wave"
                        >
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            lineHeight="normal"
                          >
                            {name}
                          </Typography>
                        </Skeleton>
                      </ListItemContent>
                      <Skeleton
                        animation="wave"
                        className="absolute right-4 rounded-full"
                        width={24}
                        height={24}
                        loading={false}
                      >
                        <Chip
                          sx={{
                            color: "common.white",
                            backgroundColor: "accent.500",
                          }}
                          className="relaive"
                        >
                          2
                        </Chip>
                      </Skeleton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider orientation="vertical" sx={{ marginBottom: "-0.25rem" }} />
            <Box className="flex flex-col w-3/4 overflow-hidden">
              <Box className="flex h-10 flex-row w-full mt-3 mx-4">
                <Button
                  variant="soft"
                  color="neutral"
                  className="rounded-3xl self-center"
                >
                  fwefw
                </Button>
              </Box>
              <Box className="flex flex-col grow mx-4 mb-3 mt-2 overflow-hidden">
                <Sheet
                  className="h-full"
                  sx={{
                    "--TableCell-height": "3.5rem",
                    // the number is the amount of the header rows.
                    "--TableHeader-height": "0",
                    overflow: "auto",
                    background: (
                      theme
                    ) => `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 50% 0,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                    backgroundSize:
                      "100% 40px, 100% 40px, 100% 14px, 100% 14px",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "local, local, scroll, scroll",
                    backgroundPosition:
                      "0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%",
                    backgroundColor: "background.surface",
                  }}
                >
                  <Table
                    stickyHeader
                    borderAxis="none"
                    sx={{
                      "--TableCell-paddingX": "0px",
                      "--TableCell-paddingY": "0px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ height: 0 }}></th>
                        <th style={{ width: "10.75rem", height: 0 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dishes as DishesItem[]).map(({ name, id, image }) => (
                        <tr key={id} style={{ paddingTop: "0.5rem" }}>
                          <td>
                            <Box className="flex flex-row h-10 grow">
                              <ImageLoad url={image} size="2.5rem" />
                              <Typography
                                fontSize={14}
                                fontWeight={500}
                                lineHeight="normal"
                                sx={{ color: "neutral.870", minWidth: "90%" }}
                                className="self-center ml-1 relative"
                                noWrap
                              >
                                <Skeleton animation="wave" loading={!name}>
                                  {name}
                                </Skeleton>
                                <Typography
                                  fontSize={10}
                                  fontWeight={400}
                                  lineHeight="normal"
                                  sx={{ color: "neutral.260" }}
                                  className="ml-0.5"
                                >
                                  ({id})
                                </Typography>
                              </Typography>
                            </Box>
                          </td>
                          <td>
                            <Box className="flex flex-row h-10 grow justify-end">
                              <NumberInput value={1} onChange={(num) => {}} />
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Sheet>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="pt-2">
          <Button
            variant="solid"
            color="neutral"
            className="h-10"
            sx={{ borderRadius: "1.25rem" }}
            onClick={() => setOpen(false)}
          >
            {t("BtnAddItems", { num: 1 })}
          </Button>
          <Button
            variant="plain"
            color="neutral"
            className="h-10"
            sx={{ borderRadius: "1.25rem" }}
            onClick={() => setOpen(false)}
          >
            {common("Cancel")}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
