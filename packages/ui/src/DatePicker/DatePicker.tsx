import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import {
  LocalizationProvider,
  MuiPickersAdapterContext,
} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState, useContext } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
  useTheme,
} from "@mui/joy";

import { TextButton } from "../Button";
import { CheckIcon } from "../icons";
import { DateRangeCalendar, DateRangeCalendarProps } from "./DateRangeCalendar";
import { DatePickerCustomRange } from "./DatePickerCustomRange";
import { DatePickerTabs } from "./DatePickerTabs";
import { DatePickerProps, TabsValues } from "./types";
import { i18n } from "./i18n";
import "./styles.css";

export const DatePickerCon: React.FC<DatePickerProps> = function DatePickerCon({
  footer,
  fields,
  mode = "normal",
  customRange,
  value,
  startTime,
  tabs,
  endTime,
  interval,
  // mutuallyExclusive = true,
  defaultValue,
  rangeValue = [],
  clearFn,
  doneFn,
  ...props
}) {
  const localeText = i18n;
  const [showSecondaryPart, setShowSecondaryPart] = useState<boolean>(false);
  const localization = useContext(MuiPickersAdapterContext);
  const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";
  const [curFieldIndex, setCurFieldIndex] = useState<number>(0);
  const [doneBtnDisabled, setDoneBtnDisabled] = useState<boolean>(true);
  const [tabsValues, setTabsValues] = useState<TabsValues>({});
  const today = new Date();
  const [dateRangeVal, setDateRangeVal] = useState<(Dayjs | null)[] | null>(
    (Array.isArray(fields)
      ? fields[curFieldIndex]?.rangeValue
      : rangeValue
    )?.map((val) => dayjs(val)) ?? null
  );

  const [dateVal, setDateVal] = useState<Dayjs | null>(
    (Array.isArray(fields)
      ? fields[curFieldIndex]?.value && dayjs(fields[curFieldIndex]?.value)
      : value && dayjs(value)) ?? null
  );

  const completeHandler = (val: (Dayjs | null)[] | Dayjs | null) => {
    const res = Array.isArray(val)
      ? val.map((date) => date?.toDate().toLocaleDateString() ?? "")
      : val?.toDate().toLocaleDateString() ?? "";
    if (fields && Array.isArray(fields)) {
      const key = fields[curFieldIndex]?.key;
      if (key) {
        doneFn?.({
          [key]: res,
        });
      }
    } else {
      doneFn?.(res);
    }
  };

  return (
    <Box
      className="flex flex-row justify-between grow overflow-hidden h-full"
      sx={{
        width:
          Array.isArray(fields) && fields.length > 1 ? "30.375rem" : "20rem",
      }}
    >
      {Array.isArray(fields) && fields.length > 1 && (
        <List
          className="py-4"
          sx={{
            borderColor: "neutral.120",
            borderRight: "1px solid",
            minWidth: "9.75rem",
            maxWidth: "9.75rem",
            minHeight: "3rem",
          }}
        >
          {fields.map(({ label, key }, index) => (
            <ListItem
              className="mb-2 h-12"
              key={key}
              sx={{
                bgcolor:
                  curFieldIndex === index ? "neutral.120" : "transparent",
              }}
            >
              <ListItemButton>
                <ListItemContent>
                  <Typography
                    noWrap
                    fontSize={14}
                    fontWeight={400}
                    textColor="neutral.870"
                    className="cursor-pointer"
                    onClick={() => setCurFieldIndex(index)}
                  >
                    {label}
                  </Typography>
                </ListItemContent>
                {curFieldIndex === index && (
                  <Typography
                    className="tapas-icon-con"
                    fontSize={20}
                    textColor="accent.500"
                    startDecorator={<CheckIcon />}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Box className="flex w-80 flex-row justify-between grow overflow-hidden h-full relative">
        <Box
          className="flex flex-col w-full h-full min-h-full"
          sx={{ maxWidth: "20rem" }}
        >
          {mode !== "tabs" && (
            <Typography
              className="absolute cursor-pointer block z-10"
              fontSize={14}
              fontWeight={600}
              textColor={"neutral.870"}
              width={"3rem"}
              right={mode === "range" ? "3.95rem" : "2.9rem"}
              top={"1rem"}
              height={"1.875rem"}
              lineHeight={"1.875rem"}
              textAlign={"center"}
              onClick={() => {
                if (mode === "range") {
                  setDateRangeVal([dayjs(today.toLocaleDateString()), null]);
                } else {
                  setDateVal(dayjs(today.toLocaleDateString()));
                  completeHandler(dayjs(today.toLocaleDateString()));
                }
              }}
            >
              {(localeText as any)[locale].BtnToday}
            </Typography>
          )}
          {mode === "range" && (
            <DateRangeCalendar
              className="tapas-datePicker"
              {...(props as DateRangeCalendarProps<any>)}
              calendars={1}
              disableFuture
              value={dateRangeVal as any}
              onChange={(dates: (Dayjs | null)[]) => {
                setDateRangeVal(dates);
                completeHandler(dates);
              }}
            />
          )}

          {mode === "normal" && (
            <DateCalendar
              className="tapas-datePicker"
              {...props}
              value={dateVal}
              onChange={(date: Dayjs | null) => {
                setDateVal(date);
                completeHandler(date);
              }}
              disableFuture
            />
          )}
          {mode === "tabs" && (
            <DatePickerTabs
              tabs={tabs}
              startTime={startTime}
              endTime={endTime}
              interval={interval}
              onChange={(changes, tab) => {
                if (tab) {
                  setDoneBtnDisabled(!changes.find((str) => str));
                  setTabsValues({ [tab]: changes });
                }
              }}
            ></DatePickerTabs>
          )}
          {(footer === undefined || footer === true) && (
            <Box className="flex flex-row justify-end">
              <TextButton
                className="h-10"
                slotProps={{
                  root: {
                    style: {
                      borderRadius: "20px",
                    },
                  },
                }}
                variant="plain"
                color="neutral"
                onClick={() => {
                  mode === "range" ? setDateRangeVal(null) : setDateVal(null);
                  clearFn?.();
                }}
                text={(localeText as any)[locale].BtnClear}
              />
              {customRange && mode !== "tabs" && (
                <TextButton
                  className="ml-2"
                  variant="plain"
                  color="neutral"
                  style={{ marginLeft: "8px" }}
                  text={(localeText as any)[locale].BtnCustomRange}
                  onClick={() => setShowSecondaryPart(true)}
                />
              )}
              {mode === "tabs" && (
                <Button
                  color="neutral"
                  variant="plain"
                  disabled={doneBtnDisabled}
                  sx={{
                    backgroundColor: doneBtnDisabled
                      ? "neutral.80"
                      : "neutral.870",
                    color: doneBtnDisabled ? "neutral.260" : "common.white",
                    borderRadius: "20px",
                  }}
                  className="ml-2"
                  onClick={() => {
                    if (Array.isArray(fields) && fields.length > 1) {
                      doneFn?.({
                        [`${fields[curFieldIndex]?.key}`]: tabsValues,
                      });
                    } else {
                      doneFn?.(tabsValues);
                    }
                  }}
                >
                  {(localeText as any)[locale].BtnDone}
                </Button>
              )}
            </Box>
          )}
        </Box>
        {customRange && mode !== "tabs" && (
          <DatePickerCustomRange
            backFn={() => setShowSecondaryPart(false)}
            showSecondaryPart={showSecondaryPart}
            date={[
              dateRangeVal?.[0] || dateVal || null,
              dateRangeVal?.[1] ?? null,
            ]}
            onDoneFn={(dates) => {
              let res: any = dates;
              if (Array.isArray(fields)) {
                const key = fields[curFieldIndex]?.key;
                if (key) {
                  res = { [key]: dates };
                }
              }
              doneFn?.(res);
              if (mode === "normal") {
                setDateVal(dates[0] ? dayjs(dates[0]) : null);
              }
              if (mode === "range") {
                setDateRangeVal(dates.map((str) => (str ? dayjs(str) : null)));
              }
              setShowSecondaryPart(false);
            }}
          ></DatePickerCustomRange>
        )}
      </Box>
    </Box>
  );
};

export const DatePicker: React.FC<DatePickerProps> = function DatePicker(
  props
) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerCon {...props} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
