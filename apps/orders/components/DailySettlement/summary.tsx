import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

export default function DailySettlementSummary() {
  const t = useTranslations("dailySettlement");
  const CapitalizeBeforePoint = (num: number) => {
    const orginal = `${num}`;
    const strs = orginal.split(".");
    if (strs.length !== 2) {
      return orginal;
    }
    return strs.map((str, index) =>
      index === 0 ? (
        <Typography key={`${index}_${str}`} fontSize="1.5rem">
          {str}
        </Typography>
      ) : (
        `.${str}`
      )
    );
  };

  return (
    <Box
      className="flex flex-row w-full py-4 rounded-xl"
      sx={{ backgroundColor: "neutral.4" }}
    >
      <Box className="h-14 flex flex-row grow">
        <Box className="flex flex-col w-1/5 self-center mx-4">
          <Typography
            className="self-end"
            level="body-md"
            fontWeight={700}
            lineHeight="normal"
            startDecorator="€"
          >
            {CapitalizeBeforePoint(123123.123)}
          </Typography>
          <Typography
            className="self-end"
            level="body-xs"
            lineHeight="normal"
            fontWeight={400}
            sx={{ color: "neutral.540" }}
          >
            ${t("TodayIncome")}
          </Typography>
        </Box>
        <Box className="flex flex-col w-1/5 self-center mx-4">
          <Typography
            className="self-end"
            level="body-md"
            fontWeight={700}
            lineHeight="normal"
            startDecorator="€"
          >
            {CapitalizeBeforePoint(123131.12312)}
          </Typography>
          <Typography
            className="self-end"
            level="body-xs"
            lineHeight="normal"
            fontWeight={400}
            sx={{ color: "neutral.540" }}
          >
            {t("TotalCashWithDrawal")}
          </Typography>
        </Box>
        <Box className="flex flex-col w-1/5 self-center mx-4">
          <Typography
            className="self-end"
            level="h3"
            fontWeight={700}
            lineHeight="normal"
          >
            {123123}
          </Typography>
          <Typography
            className="self-end"
            level="body-xs"
            lineHeight="normal"
            fontWeight={400}
            sx={{ color: "neutral.540" }}
          >
            {t("OrdersTotal")}
          </Typography>
        </Box>
        <Box className="flex flex-col w-1/5 self-center mx-4">
          <Typography
            className="self-end"
            level="h3"
            fontWeight={700}
            lineHeight="normal"
          >
            {3131}
          </Typography>
          <Typography
            className="self-end"
            level="body-xs"
            lineHeight="normal"
            fontWeight={400}
            sx={{ color: "neutral.540" }}
          >
            {t("CancelledOrder")}
          </Typography>
        </Box>
        <Box className="flex flex-col w-1/5 self-center mx-4">
          <Typography
            className="self-end"
            level="h3"
            fontWeight={700}
            lineHeight="normal"
          >
            {3131}
          </Typography>
          <Typography
            className="self-end"
            level="body-xs"
            lineHeight="normal"
            fontWeight={400}
            sx={{ color: "neutral.540" }}
          >
            {t("ReservedOrders")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
