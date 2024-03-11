import { useContext, useState } from "react";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers";
import { Box, Typography } from "@mui/joy";

import { i18n } from "./i18n";
import { DatePickerWeekSelectorProps } from "./types";

const week: { i18n: string; key: string }[] = [
  { i18n: "LabelMonday", key: "monday" },
  { i18n: "LabelTuesday", key: "tuesday" },
  { i18n: "LabelWednesday", key: "wednesday" },
  { i18n: "LabelThursday", key: "thursday" },
  { i18n: "LabelFriday", key: "friday" },
  { i18n: "LabelSaturday", key: "saturday" },
  { i18n: "LabelSunday", key: "sunday" },
];

export const DatePickerWeekSelector: React.FC<DatePickerWeekSelectorProps> =
  function DatePickerWeekSelector({ onChange }) {
    const localeText = i18n;
    const localization = useContext(MuiPickersAdapterContext);
    const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <Box>
        {week.map(({ key, i18n }, index) => (
          <Box
            key={key}
            className="flex flex-row float-left h-10 rounded-xl justify-center mb-2 cursor-pointer"
            sx={{
              bgcolor: selected.includes(key) ? "neutral.870" : "neutral.80",
              marginLeft: index % 2 !== 0 ? "0.5rem" : "0px",
              width: "calc(50% - 8px)",
            }}
            onClick={() => {
              setSelected((previous) => {
                const newValues = [...previous];
                const index = newValues.indexOf(key);
                if (index >= 0) {
                  newValues.splice(index, 1);
                } else {
                  newValues.push(key);
                }
                onChange?.(newValues);
                return newValues;
              });
            }}
          >
            <Typography
              fontSize={14}
              lineHeight={"2.5rem"}
              fontWeight={400}
              textColor={
                selected.includes(key) ? "common.white" : "neutral.870"
              }
            >
              {(localeText as any)[locale][i18n]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
