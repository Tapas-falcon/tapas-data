import { useState } from "react";
import { Box, Typography } from "@mui/joy";

import { initDays } from "./util";
import { DatePickerDaySelectorProps } from "./types";

const indexes = [0, 6, 12, 18, 24, 30];
export const DatePickerDaySelector: React.FC<DatePickerDaySelectorProps> =
  function DatePickerDaySelector({ onChange }) {
    const days = initDays();
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <Box>
        {days.map((key, index) => (
          <Box
            key={key}
            className="flex flex-row float-left h-10 w-10 justify-center mb-2 cursor-pointer"
            sx={{
              bgcolor: selected.includes(`${key}`)
                ? "neutral.870"
                : "neutral.80",
              borderRadius: "50%",
              marginLeft: indexes.includes(index) ? "0px" : "0.5rem",
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
              {key}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
