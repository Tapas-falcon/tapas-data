import { Box, IconButton, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { Button } from "@mui/joy";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers/LocalizationProvider";
import { TriplePicker } from "../TriplePicker";
import { BackIcon } from "../icons";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";

import { formatRes, formatYearMonthDay } from "./util";
import { i18n } from "./i18n";
import { DatePickerCustomRangeProps, months } from "./types";

let years: any[] = [];

export const DatePickerCustomRange: React.FC<DatePickerCustomRangeProps> =
  function DatePickerCustomRange({
    date,
    showSecondaryPart,
    backFn,
    onChange,
    onDoneFn,
  }) {
    const localeText = i18n;
    const localization = useContext(MuiPickersAdapterContext);
    const [curDateIndex, setCurDateIndex] = useState<number>(0);
    const [dateVal, setDateVal] = useState<Dayjs | null>(
      date[curDateIndex] ?? null
    );
    const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";
    const [selected, setSelected] = useState<string[] | undefined>();
    // const defaultDisplayDates = [ // ];
    const [displayDates, setDisplayDates] = useState<(string[] | null)[]>([]);

    //这里有bug 如果不做延时改变状态 元素会被直接移出 响应到上级事件的时候会捕获不到这个元素 让element.contains 检测失效
    const iSetCurDateIndex=(value:number)=>{
      requestAnimationFrame(e=>{
        setCurDateIndex(value);
      })
    }

    if (years.length === 0) {
      const currentYear = (
        date[curDateIndex]?.toDate() ?? new Date()
      ).getFullYear();
      years = Array.from(
        { length: currentYear - 1899 },
        (_, index) => `${1900 + index}`
      );
      years.push((localeText as any)[locale].LabelAny);
    }
    const days = Array.from(
      {
        length: new Date(
          (dateVal?.toDate?.() ?? new Date()).getFullYear(),
          (dateVal?.toDate?.() ?? new Date())?.getMonth(),
          0
        ).getDate(),
      },
      (_, index) => `${index + 1}`
    );
    days.push((localeText as any)[locale].LabelAny);

    const selectDateChange = (strs: string[]) => {
      const anylabel = (localeText as any)[locale].LabelAny;
      const anyCell = strs.filter((str) => str === anylabel);
      if (anyCell.length === strs.length) {
        date[curDateIndex] = anylabel;
        setDisplayDates((previous) => {
          const newValues = [...previous];
          newValues[curDateIndex] = null;
          return newValues;
        });
      } else {
        if (anyCell.length === 0) {
          setDateVal(dayjs(strs.join("-")));
        }
        setDisplayDates((previous) => {
          const newValues = [...previous];
          newValues[curDateIndex] = strs;
          return newValues;
        });
      }
      setSelected(strs);
    };

    const resetSelected = (index: number) => {
      const anylabel = (localeText as any)[locale].LabelAny;
      const target = displayDates[index];
      setSelected([
        target?.[0] ?? anylabel,
        target?.[1] ?? anylabel,
        target?.[2] ?? anylabel,
      ]);
    };

    const clear = () => {
      iSetCurDateIndex(0);
      setDateVal(date[0] ?? null);
      const target = date[0]?.toDate?.();
      const anylabel = (localeText as any)[locale].LabelAny;
      setSelected([
        target?.getFullYear() ?? anylabel,
        target?.getMonth() ?? anylabel,
        target?.getDate() ?? anylabel,
      ]);
      setDisplayDates([]);
    };

    return (
      <Box
        className={clsx(
          "flex",
          "flex-col",
          "w-full",
          "h-full",
          "min-w-full",
          "min-h-full",
          "absolute",
          "transition-all",
          "z-20",
          {
            "left-full": !showSecondaryPart,
            "left-0": showSecondaryPart,
          }
        )}
        style={{ background: "white" }}
      >
        <Box className="flex flex-row grow my-4 mx-2 h-10 max-h-10">
          <IconButton
            onClick={() => {
              clear();
              backFn?.();
            }}
          >
            <Typography
              className="tapas-icon-con"
              fontSize={24}
              textColor="neutral.870"
              startDecorator={<BackIcon />}
            />
          </IconButton>
          <Typography
            className="cursor-pointer"
            fontSize={16}
            lineHeight={"40px"}
            minWidth={93}
            fontWeight={700}
            fontStyle={"normal"}
            onClick={() => {
              if (curDateIndex !== 0) {
                resetSelected(0);
                iSetCurDateIndex(0);
              }
            }}
            textColor={curDateIndex === 0 ? "neutral.870" : "neutral.260"}
          >
            {displayDates[0]
              ? formatYearMonthDay(
                  displayDates[0],
                  (localeText as any)[locale].LabelAny
                )
              : (localeText as any)[locale].PHStartDate}
          </Typography>
          <Typography
            className="mx-3"
            fontSize={16}
            lineHeight={"40px"}
            fontWeight={700}
            fontStyle={"normal"}
            textColor={"neutral.260"}
          >
            -
          </Typography>
          <Typography
            className="cursor-pointer"
            fontSize={16}
            fontWeight={700}
            minWidth={93}
            lineHeight={"40px"}
            fontStyle={"normal"}
            onClick={() => {
              if (curDateIndex !== 1) {
                resetSelected(1);
                iSetCurDateIndex(1);
              }
            }}
            textColor={curDateIndex === 1 ? "neutral.870" : "neutral.260"}
          >
            {displayDates[1]
              ? formatYearMonthDay(
                  displayDates[1],
                  (localeText as any)[locale].LabelAny
                )
              : (localeText as any)[locale].PHEndDate}
          </Typography>
        </Box>

        <Box className="flex flex-col grow overflow-hidden">
          <Box className="flex flex-col grow overflow-hidden">
            <Box className="flex flex-row grow  mb-2 justify-between mx-3">
              <Typography
                className="flex flex-col grow text-center"
                fontSize={12}
                fontWeight={700}
                textColor={"neutral.870"}
              >
                {(localeText as any)[locale].LabelYear}
              </Typography>
              <Typography
                className="flex flex-col grow text-center"
                fontSize={12}
                fontWeight={700}
                textColor={"neutral.870"}
              >
                {(localeText as any)[locale].LabelMonth}
              </Typography>
              <Typography
                className="flex flex-col grow text-center"
                fontSize={12}
                fontWeight={700}
                textColor={"neutral.870"}
              >
                {(localeText as any)[locale].LabelDay}
              </Typography>
            </Box>
            <Box className="flex flex-row justify-between mx-3 grow overflow-hidden rounded-lg">
              <TriplePicker
                items={[
                  years,
                  months.map(({ i18n }) => (localeText as any)[locale][i18n]),
                  days,
                ]}
                selected={selected}
                defualtValue={[
                  (localeText as any)[locale].LabelAny,
                  (localeText as any)[locale].LabelAny,
                  (localeText as any)[locale].LabelAny,
                ]}
                onChange={selectDateChange}
              ></TriplePicker>
            </Box>
          </Box>
          <Box className="flex flex-row h-10 justify-end mt-4">
            <Button
              color="neutral"
              variant="plain"
              sx={{ borderRadius: "20px" }}
              onClick={clear}
            >
              {(localeText as any)[locale].BtnClear}
            </Button>
            {curDateIndex === 0 && (
              <Button
                color="neutral"
                variant="plain"
                sx={{
                  backgroundColor: "neutral.870",
                  color: "common.white",
                  borderRadius: "20px",
                }}
                className="ml-2"
                onClick={() => {
                  iSetCurDateIndex(1);
                  resetSelected(1);
                }}
              >
                {(localeText as any)[locale].BtnNext}
              </Button>
            )}
            {curDateIndex === 1 && (
              <Button
                color="neutral"
                variant="plain"
                sx={{
                  backgroundColor: "neutral.870",
                  color: "common.white",
                  borderRadius: "20px",
                }}
                className="ml-2"
                onClick={() => {
                  onDoneFn?.([
                    !displayDates[0] ||
                    displayDates[0] === (localeText as any)[locale].PHStartDate
                      ? ""
                      : formatRes(
                          displayDates[0].map((str) =>
                            str === (localeText as any)[locale].LabelAny
                              ? ""
                              : str
                          )
                        ),
                    !displayDates[1] ||
                    displayDates[1] === (localeText as any)[locale].PHStartDate
                      ? ""
                      : formatRes(
                          displayDates[1].map((str) =>
                            str === (localeText as any)[locale].LabelAny
                              ? ""
                              : str
                          )
                        ),
                  ]);
                }}
              >
                {(localeText as any)[locale].BtnDone}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
