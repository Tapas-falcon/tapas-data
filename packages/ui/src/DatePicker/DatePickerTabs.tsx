import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useContext } from "react";
import { tabClasses } from "@mui/joy/Tab";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers/LocalizationProvider";

import { i18n } from "./i18n";
import { DatePickerTabsProps, Tabs as TabsType, Tab as TabType } from "./types";
import { DatePickerTimeSelector } from "./DatePickerTimeSelector";
import { DatePickerWeekSelector } from "./DatePickerWeekSelector";
import { DatePickerMonthSelector } from "./DatePickerMonthSelector";
import { DatePickerDaySelector } from "./DatePickerDaySelector";

export const DatePickerTabs: React.FC<DatePickerTabsProps> =
  function DatePickerTabs({
    tabs = ["time", "day", "week", "month"],
    onChange,
    startTime,
    endTime,
    interval,
  }) {
    const localeText = i18n;
    const localization = useContext(MuiPickersAdapterContext);
    const locale = localization?.utils?.getCurrentLocaleCode() ?? "es";

    const initDefaultTab = (tabs: TabsType): TabType | "" => {
      if (tabs.includes("time")) {
        return "time";
      }
      if (tabs.includes("day")) {
        return "day";
      }
      if (tabs.includes("week")) {
        return "week";
      }
      if (tabs.includes("month")) {
        return "month";
      }
      return "";
    };

    return tabs && tabs.length === 0 ? (
      <></>
    ) : (
      <Tabs
        orientation="horizontal"
        size="md"
        className="bg-transparent"
        defaultValue={initDefaultTab(tabs)}
        sx={{ minHeight: "22.375rem" }}
      >
        <TabList
          tabFlex="auto"
          sx={{
            pt: 1,
            justifyContent: "flex-start",
            [`&& .${tabClasses.root}`]: {
              flex: "1",
              fontSize: "14px",
              fontWeight: 600,
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              [`&.${tabClasses.selected}`]: {
                color: "neutral.870",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "accent.500",
                },
              },
            },
          }}
        >
          {tabs.includes("time") && (
            <Tab value="time" className="h-12" variant="plain">
              {(localeText as any)[locale].LabelTime}
            </Tab>
          )}
          {tabs.includes("day") && (
            <Tab value="day" className="h-12" variant="plain">
              {(localeText as any)[locale].LabelDay}
            </Tab>
          )}
          {tabs.includes("week") && (
            <Tab value="week" className="h-12" variant="plain">
              {(localeText as any)[locale].LabelWeek}
            </Tab>
          )}
          {tabs.includes("month") && (
            <Tab value="month" className="h-12" variant="plain">
              {(localeText as any)[locale].LabelMonth}
            </Tab>
          )}
        </TabList>
        {tabs.includes("time") && (
          <TabPanel value="time">
            <DatePickerTimeSelector
              startTime={startTime}
              endTime={endTime}
              interval={interval}
              onChange={(changes) => {
                onChange?.(changes, "time");
              }}
            ></DatePickerTimeSelector>
          </TabPanel>
        )}
        {tabs.includes("day") && (
          <TabPanel value="day">
            <DatePickerDaySelector
              onChange={(changes) => onChange?.(changes, "day")}
            ></DatePickerDaySelector>
          </TabPanel>
        )}
        {tabs.includes("week") && (
          <TabPanel value="week">
            <DatePickerWeekSelector
              onChange={(changes) => onChange?.(changes, "week")}
            ></DatePickerWeekSelector>
          </TabPanel>
        )}
        {tabs.includes("month") && (
          <TabPanel value="month">
            <DatePickerMonthSelector
              onChange={(changes) => onChange?.(changes, "month")}
            ></DatePickerMonthSelector>
          </TabPanel>
        )}
      </Tabs>
    );
  };
