import { useContext, useState } from "react";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers";
import { Box, Typography } from "@mui/joy";

import { i18n } from "./i18n";
import { DatePickerMonthSelectorProps, months } from "./types";

const indexes = [1,4,7,10];
export const DatePickerMonthSelector: React.FC<DatePickerMonthSelectorProps> =
  function DatePickerMonthSelector({ onChange }) {
    const localeText = i18n;
    const localization = useContext(MuiPickersAdapterContext);
    const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <Box>
        {months.map(({ key, i18n }, index) => key < 13 &&(
          <Box
            key={key}
            className="flex flex-row float-left h-10 rounded-xl justify-center mb-2 cursor-pointer"
            sx={{
              bgcolor: selected.includes(`${key}`) ? "neutral.870" : "neutral.80",
              marginLeft: indexes.includes(index) ? "0.5rem" : "0px",
              marginRight: indexes.includes(index) ? "0.5rem" : "0px",
              width: "calc(33% - 5px)",
            }}
            onClick={() => {
              setSelected((previous) => {
                const newValues = [...previous];
                const index = newValues.indexOf(`${key}`);
                if (index >= 0) {
                  newValues.splice(index, 1);
                } else {
                  newValues.push(`${key}`);
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
                selected.includes(`${key}`) ? "common.white" : "neutral.870"
              }
            >
              {(localeText as any)[locale][i18n]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
