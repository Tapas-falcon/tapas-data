import { Box, Typography } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";

import "./styles.css";

export interface Field {
  key: string;
  values: string[];
}
export interface TriplePickerProps {
  items: string[][];
  selected?: string[];
  defualtValue: string[];
  onChange?: (arg0: string[]) => void;
}

export const TriplePicker: React.FC<TriplePickerProps> = function ({
  items,
  defualtValue,
  selected = items.map(
    (column, index) =>
      defualtValue[index] ?? column[Math.floor(column.length / 2)] ?? ""
  ),
  onChange,
}: TriplePickerProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(selected);
  let init = false;

  items.forEach((column) => {
    if (column[0]) {
      init = true;
      column.push("");
      column.push("");
      column.unshift("");
      column.unshift("");
    }
  });

  const scrollTimeout = useRef<any>();

  useEffect(() => {
    // 初始化滚动位置
    if (selectedValues.find((str, index) => selected[index] !== str)) {
      setSelectedValues(selected);
    }
    if (init) {
      selected.forEach((value, index) => {
        const container = scrollRefs.current[index];
        if (container) {
          const itemHeight = 48; // 假设每个选项的高度为 40
          const selectedIndex = (items[index]?.indexOf(value) ?? 0) - 2;
          if (selectedIndex >= 0) {
            const scrollTop = selectedIndex * itemHeight;
            container.scrollTop = scrollTop;
          }
        }
      });

      init = false;
    }
  }, [selected, items, init]);

  const scrollRefs = useRef<Array<HTMLDivElement | null>>(
    Array(items.length).fill(null)
  );

  const handleScroll = (index: number) => {
    const container = scrollRefs.current[index];
    if (container) {
      clearTimeout(scrollTimeout.current);
      delete scrollTimeout.current;
      const itemHeight = 48; // 假设每个选项的高度为 40
      const scrollTop = container.scrollTop;
      let selectedItemIndex = Math.round(scrollTop / itemHeight) + 2;
      if (selectedItemIndex < 2) {
        selectedItemIndex = 2;
      }
      if (
        (items[index]?.length ?? 0) > 0 &&
        selectedItemIndex >= (items[index]?.length ?? 0) - 2
      ) {
        selectedItemIndex = (items[index]?.length ?? 0) - 3;
      }
      const correctedScrollTop = (selectedItemIndex - 2) * itemHeight;
      setSelectedValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = items[index]?.[selectedItemIndex] ?? "";
        return newValues;
      });

      scrollTimeout.current = setTimeout(() => {
        smoothScroll(container, correctedScrollTop);
        onChange?.(selectedValues);
      }, 300);
    }
  };

  // 优化滚动效果，增加延迟控制
  const smoothScroll = (container: HTMLDivElement, targetScrollTop: number) => {
    const startScrollTop = container.scrollTop;
    const duration = 115;
    let startTime: number | null = null;

    const animationFrameCallback = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = easeInOutQuad(progress);
      const newScrollTop =
        startScrollTop + (targetScrollTop - startScrollTop) * easeProgress;
      container.scrollTop = newScrollTop;

      if (progress < 1) {
        requestAnimationFrame(animationFrameCallback);
      }
    };

    requestAnimationFrame(animationFrameCallback);
  };

  // 动效延迟时间计算
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  return (
    <Box
      className="flex flex-row grow rounded-lg py-3"
      sx={{ height: "232px", backgroundColor: "neutral.4" }}
    >
      {items.map((column, index) => (
        <Box
          key={`col-${index}`}
          ref={(ref: HTMLDivElement) => (scrollRefs.current[index] = ref)}
          onScroll={() => handleScroll(index)}
          className="flex flex-col flex-1 scroll-con overflow-y-auto"
          sx={{
            borderLeft:
              index > 0 && index < items.length - 1
                ? "1px solid var(--joy-palette-common-white)"
                : "none",
            borderRight:
              (index > 0 && index < items.length - 1) ||
              (items.length === 2 && index === 0)
                ? "1px solid var(--joy-palette-common-white)"
                : "nonde",
          }}
        >
          {column.map((item, itemIndex) => (
            <Box
              key={`item-${index}-${item ?? "zero"}-${itemIndex}`}
              className="flex flex-col h-10 mb-2 justify-center"
              sx={{ minHeight: "2.5rem" }}
            >
              <Typography
                width={"100%"}
                textAlign={"center"}
                fontSize={item === selectedValues[index] ? 16 : 14}
                fontWeight={item === selectedValues[index] ? 700 : 400}
                textColor={
                  item === selectedValues[index] ? "neutral.870" : "neutral.540"
                }
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
