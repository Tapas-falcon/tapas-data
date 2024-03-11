import { useContext, useState } from "react";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers";

import { i18n } from "./i18n";
import { DatePickerTimeSelectorProps } from "./types";
import { Box, Typography } from "@mui/joy";
import { TriplePicker } from "../TriplePicker";
import { formatSelectedTime, initDuration, initTimes } from "./util";

export const DatePickerTimeSelector: React.FC<DatePickerTimeSelectorProps> =
  function DatePickerTimeSelector({
    startTime = "8:00",
    endTime = "21:00",
    interval = 30,
    onChange,
  }) {
    const localeText = i18n;
    const localization = useContext(MuiPickersAdapterContext);
    const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";

    const [timeRange, setTimeRange] = useState<string[]>([
      (localeText as any)[locale].LabelAny,
      ...initTimes(startTime, endTime, interval),
    ]);
    const [duration, setDuration] = useState<string[]>([
      (localeText as any)[locale].LabelAny,
      ...initDuration(30, interval, startTime, endTime),
    ]);
    const [selected, setSelected] = useState<string[]>([
      (localeText as any)[locale].LabelAny,
      (localeText as any)[locale].LabelAny,
    ]);

    return (
      <Box>
        <Box className="flex flex-row h-10 w-full justify-center">
          <Typography
            fontSize={16}
            fontWeight={700}
            textColor={
              formatSelectedTime(
                selected[0] ?? "",
                selected[1] ?? "",
                (localeText as any)[locale].LabelAny
              )
                ? "neutral.870"
                : "neutral.260"
            }
          >
            {formatSelectedTime(
              selected[0] ?? "",
              selected[1] ?? "",
              (localeText as any)[locale].LabelAny
            ) || (localeText as any)[locale].PHSelectTime}
          </Typography>
        </Box>
        <TriplePicker
          items={[timeRange, duration]}
          selected={selected}
          defualtValue={[
            (localeText as any)[locale].LabelAny,
            (localeText as any)[locale].LabelAny,
          ]}
          onChange={(changes) => {
            setSelected(changes);
            onChange?.(
              changes.map((str) =>
                str === (localeText as any)[locale].LabelAny ||
                changes[0] === (localeText as any)[locale].LabelAny
                  ? ""
                  : str
              )
            );
          }}
        ></TriplePicker>
      </Box>
    );
  };
