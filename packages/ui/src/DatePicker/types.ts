import { DateCalendarProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

// Tapas DatePicker Root
type Mode = "range" | "normal" | "tabs";

type Field = {
    key: string;
    label: string;
    value?: string;
    rangeValue?: string[];
};
export interface DatePickerProps extends DateCalendarProps<any> {
    rangeValue?: string[]; // 范围值域  注：由于继承了所有 x/date-picker的属性 因而单个日期时候也可以使用原属性 value
    footer?: boolean; // 是否显示底部操作条
    mode?: Mode; // 默认是分为 normal 单选一天的日历模式， range: 选择一个时间范围模式， tabs 将时间范畴固化为 time, day， week， month四个维度做选择模式
    fields?: Field[] | Field; // 左侧主力表中 字段集合 注： 目前的时间选择在字段上是互斥的即 只能对其中一个字段完成赋值
    tabs?: Tabs; //  tab 模式下 显示的TAB 配置 默认为 “time”, "day", "week", "month" 只能在4个范围内做任意配置 排序固定
    startTime?: string; // timeSelector 时间范畴起始时间 默认起始时间： "8:00"
    endTime?: string; // timeSelector 时间范畴结束时间 默认结束时间： "21:00"
    interval?: number; // timeSelector 时间间隔 为申城时间范围列表用 默认间隔30min
    customRange?: boolean; // 是否显示自定义范围按钮及其功能
    // mutuallyExclusive?: boolean;
    doneFn?: (org: string | string[] | Record<string, string | string[] | TabsValues> | TabsValues) => void; // 日期选定后的回调
    clearFn?: () => void; // 清除日期选择的回调
}

export interface TabsValues {
    times?: string[];
    days?: string[];
    weeks?: string[];
    months?: string[];
}

// Tapas DatePicker Range

export const months = [
    { key: 1, i18n: "LabelJanuary" },
    { key: 2, i18n: "LabelFebruary" },
    { key: 3, i18n: "LabelMarch" },
    { key: 4, i18n: "LabelApril" },
    { key: 5, i18n: "LabelMay" },
    { key: 6, i18n: "LabelJune" },
    { key: 7, i18n: "LabelJuly" },
    { key: 8, i18n: "LabelAugust" },
    { key: 9, i18n: "LabelSeptember" },
    { key: 10, i18n: "LabelOctober" },
    { key: 11, i18n: "LabelNovember" },
    { key: 12, i18n: "LabelDecember" },
    { key: 13, i18n: "LabelAny" },
];

export interface DatePickerCustomRangeProps {
    date: (Dayjs | null)[]; // 日期范围值， 数组 【起始时间文本， 结束时间文本】；
    showSecondaryPart: boolean; // 是否显示 自定义范围的模块
    backFn?: () => void; // 从自定义范围模块返回日历模块的 回调
    onDoneFn?: (arg: string[]) => void; // 在自定义范围模块中完成选择后的回调, 回调会接收数组 【起始时间文本， 结束时间文本】；
    onChange?: (arg: string[]) => void; // 自定义模块中选择值发生变化 回调会接受实时的选择值 【起始时间文本， 结束时间文本】；
}


// Tapas DatePicker Tabs

export interface DatePickerTabsProps extends DatePickerTimeSelectorProps {
    tabs?: Tabs; // 显示的tab集合 注意 范围为 time, day,week,month
    onChange?: (arg0: string[], tab?: Tab) => void // tabs 赋值回调
}

export type Tab = "time" | "week" | "month" | "day";

export type Tabs = Tab[];

// Tapas DatePicker TimeSelecotr
export interface DatePickerTimeSelectorProps {
    startTime?: string; // 起始时间文本， 为基数time的值域列表范围依据
    endTime?: string;  // 结束时间文本， 为基数time的值域列表范围依据
    interval?: number; // 时间间隔， 为基数time的值域列表范围依据
    onChange?: (arg0: string[]) => void // 时间选择其中值变化回调
}

// Tapas DatePicker WeekSelector
export interface DatePickerWeekSelectorProps {
    onChange?: (arg0: string[]) => void // 周选择其中值变化回调
}


// Tapas DatePicker WeekSelector
export interface DatePickerMonthSelectorProps {
    onChange?: (arg0: string[]) => void // 月选择其中值变化回调
}

// Tapas DatePicker WeekSelector
export interface DatePickerDaySelectorProps {
    onChange?: (arg0: string[]) => void // 天选择其中值变化回调
}
