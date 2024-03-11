import { Box, Button, Sheet, Skeleton, Table, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AddIcon, EmoticonDownIcon } from "@tapas/ui/icons";
import ImageLoad from "../ImageLoad";
import NumberInput from "@tapas/ui/NumberInput";
import AddProductModal from "./addPorductModal";

export default function ProductRecords() {
  const t = useTranslations("dailySettlement");
  const common = useTranslations("common");
  const [open, setOpen] = useState(false);

  const list = [{ name: "text", id: "ID123132" }];

  return (
    <Box className="flex flex-col grow overflow-hidden">
      <Box className="flex flex-row mb-1 w-full pl-4 pr-2" height="2.969rem">
        <Box className="flex flex-col grow">
          <Typography
            level="title-md"
            fontWeight={700}
            lineHeight="normal"
            sx={{ color: "neutral.870" }}
            className="mt-3.5"
          >
            {t("ProductRecordsTitle")}
          </Typography>
          <Typography
            level="body-xs"
            fontWeight={400}
            lineHeight="normal"
            sx={{ color: "neutral.540" }}
          >
            {t("ProductRecordsDesc")}
          </Typography>
        </Box>
        <Box className="flex flex-col h-full justify-center">
          {list.length > 0 && (
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<AddIcon />}
              className="rounded-3xl h-10"
              onClick={() => setOpen(true)}
            >
              {t("BtnAddProductRecords")}
            </Button>
          )}
        </Box>
      </Box>
      <Box className="flex grow flex-col ml-4 mr-6">
        {list.length <= 0 ? (
          <Box className="flex flex-row justify-center grow h-full">
            <Box className="flex flex-col self-center">
              <Typography
                className="self-center h-14"
                lineHeight="normal"
                height="3.5rem"
                sx={{ color: "neutral.540" }}
              >
                <EmoticonDownIcon fontSize="3.5rem" />
              </Typography>
              <Typography
                className="self-center my-1.5"
                fontSize={16}
                fontWeight={700}
                lineHeight="normal"
                sx={{ color: "neutral.540" }}
              >
                {t("NoData")}
              </Typography>
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<AddIcon />}
                className="rounded-3xl h-10 self-center"
                onClick={() => setOpen(true)}
              >
                {t("BtnAddProductRecords")}
              </Button>
            </Box>
          </Box>
        ) : (
          <Sheet
            className="h-full"
            sx={{
              "--TableCell-height": "3.5rem",
              "--TableHeader-height": "2.5rem",
              overflow: "auto",
              background: (
                theme
              ) => `linear-gradient(to bottom, ${theme.vars.palette.common.white} 30%, rgba(255, 255, 255, 0)),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0),  ${theme.vars.palette.common.white} 70%) 0 100%,
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
              backgroundSize: "100% 40px, 100%  40px, 100% 14px, 100% 14px",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "local, local, scroll, scroll",
              backgroundPosition:
                "14px var(--TableHeader-height), 14px 100%, 14px var(--TableHeader-height), 14px 100%",

              mixBlendMode: "multiply",
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
                  <th style={{ height: "2.5rem" }}>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      lineHeight="2.5rem"
                      className="self-center"
                      sx={{ color: "neutral.870" }}
                    >
                      {common("Description")}
                    </Typography>
                  </th>
                  <th style={{ height: "2.5rem", width: "10.75rem" }}>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      lineHeight="2.5rem"
                      className="text-right self-center"
                      sx={{ color: "neutral.870" }}
                    >
                      {common("Quantity")}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map(({ name, id }) => (
                  <tr key={id}>
                    <td>
                      <Box className="flex flex-row h-10 grow">
                        <ImageLoad url="" size="2.5rem" />
                        <Typography
                          fontSize={14}
                          fontWeight={500}
                          lineHeight="normal"
                          sx={{ color: "neutral.870", minWidth: "80%" }}
                          className="self-center ml-1 relative"
                        >
                          <Skeleton animation="wave" loading={true}>
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
        )}
      </Box>
      <AddProductModal open={open} setOpen={setOpen} />
    </Box>
  );
}
