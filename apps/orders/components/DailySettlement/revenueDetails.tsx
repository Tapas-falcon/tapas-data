import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";
import { AddIcon } from "@tapas/ui/icons";

import TapasInput from "../Input";
import { DialKeyboard } from "@tapas/ui/NumberKeyboard";

export default function RevenueDetails() {
  const t = useTranslations("dailySettlement");
  return (
    <Box className="flex flex-col grow mx-4 overflow-hidden">
      <Typography
        level="title-md"
        fontWeight={700}
        lineHeight="normal"
        sx={{ color: "neutral.870", marginBottom: "0.938rem" }}
        className="mt-3.5"
      >
        {t("RevenueDetailsTitle")}
      </Typography>
      <Box className="flex flex-row w-full overflow-hidden" height="4.5rem">
        <TapasInput label={t("TotalCashIncomeLabel")} />
        <TapasInput label={t("TotalPOSRevenue")} className="ml-2" />
      </Box>
      <Box
        className="flex flex-row w-full overflow-hidden mt-2"
        height="4.5rem"
      >
        <TapasInput label={t("TotalCashWithDrawalEuro")} />
        <TapasInput label={t("DailyOPerationCash")} className="ml-2" />
      </Box>
      <Box className="flex flex-col grow mt-4">
        <DialKeyboard
          className="self-center"
          onChange={() => {}}
          backAsButton
          keyboard="7,8,9,4,5,6,1,2,3,0,."
          value={""}
        />
      </Box>
    </Box>
  );
}
