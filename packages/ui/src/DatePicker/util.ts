// 格式化显示年月日格式
export const formatYearMonthDay = (
  dateStrs: string[],
  anyLabel: string
): string => {
  const year = dateStrs[0] !== anyLabel ? dateStrs[0] : "";
  const month = dateStrs[1] !== anyLabel ? dateStrs[1] : "";
  const day = dateStrs[2] !== anyLabel ? dateStrs[2] : "";
  let str = "";
  if (day) {
    str += day;
  }
  if (month) {
    str += `${str ? " " : ""}${month}`;
  }
  if (year) {
    str += `${str ? "," : ""}${year}`;
  }
  return str;
};

// 格式化返回显示时间日期文本
export const formatRes = (dateStrs: string[]): string => {
  if (!dateStrs[0]) {
    return "";
  }
  if (!dateStrs[1]) {
    return dateStrs[0] ?? "";
  }
  if (!dateStrs[2]) {
    if (!dateStrs[0]) {
      return "";
    }
    return `${dateStrs[0]}${dateStrs[1] ? "-" : ""}${dateStrs[1] ?? ""}`;
  }
  return dateStrs.join("-");
};

// 初始化 时间范畴
export const initTimes = (
  startTime: string = "8:00",
  endTime: string = "21:00",
  interval: number = 30
): string[] => {
  const res: string[] = [];
  const [hours, minutes]: number[] = startTime
    .split(":")
    .map((str) => parseInt(str));
  const [eHours, eMinutes]: number[] = endTime
    .split(":")
    .map((str) => parseInt(str));
  const end = (eHours ?? 0) * 60 + (eMinutes ?? 0);
  let time = (hours ?? 0) * 60 + (minutes ?? 0);
  do {
    res.push(
      `${`${parseInt(`${time / 60}`)}`.padStart(2, "0")}:${`${time % 60
        }`.padStart(2, "0")}`
    );
    time += interval;
  } while (time <= end);
  return res;
};

// 初始化间隔时间范畴列表
export const initDuration = (
  start: number = 30,
  interval: number = 30,
  startTime: string = "8:00",
  endTime = "21:00"
): string[] => {
  const [hours, minutes]: number[] = startTime
    .split(":")
    .map((str) => parseInt(str || '0'));
  const [eHours, eMinutes]: number[] = endTime
    .split(":")
    .map((str) => parseInt(str || '0'));
  const end =
    (eHours ?? 0) * 60 + (eMinutes ?? 0) - (hours ?? 0) * 60 + (minutes ?? 0);
  let time = start;
  const res: string[] = [];
  do {
    const h = parseInt(`${time / 60}`);
    res.push(
      `${h ? h + " hr " : ""}${time % 60 > 0 ? `${time % 60} min` : ""}`
    );
    time += interval;
  } while (time <= end);
  return res;
};

// 根据时间跨度计算从起始时间到结束时间 并返回显示文本
export const formatSelectedTime = (
  begin: string,
  duration: string,
  anyLabel: string
): string => {
  if (begin === anyLabel) {
    return "";
  }
  if (duration === anyLabel) {
    return `${begin}`;
  }
  const str = duration.replace(/\s*/g, "").replace("min", "");
  let dH = 0;
  let dMin = 0;
  if (str.includes("hr")) {
    const n = str.split("hr").map((str): number => parseInt(str || '0'));
    dH = n[0] ?? 0;
    dMin = n[1] ?? 0;
  } else {
    dMin = parseInt(str.replace("hr", ""));
  }
  const [h = 0, min = 0] = begin.split(":").map((str) => parseInt(str || "0"));
  const sum = h * 60 + min + dH * 60 + dMin;
  return `${begin} - ${`${parseInt(`${sum / 60}`)}`.padStart(2, "0")}:${`${sum % 60
    }`.padStart(2, "0")}`;
};

export const initDays = () => {
  const res = [];
  let i = 1;
  do {
      res.push(i);
      i++;
  } while (res.length < 31)
  return res;
}