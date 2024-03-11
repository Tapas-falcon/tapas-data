import React from "react";
import Card, { CardProps } from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { ITableCardProps, StatusTagColors, TableStatus } from "./types";
import { StatusTag } from "./StatusTag";
import { ImageButton } from "./ImageButton";
import { Tag } from "./Tag";

export type TableCardProps = ITableCardProps &
  CardProps & { statusColor: "green" | "red" | "yellow" | "slate" };

export const TableCard: React.FC<TableCardProps> = function ({
  tableText,
  status,
  tags = [],
  available = true,
  src,
  note = "",
  onChooseImage = () => {},
  sx,
  statusColor,
  ...props
}) {
  return (
    <Card
      variant="plain"
      sx={{
        "--Card-radius": "var(--radius-radius-rounded, 12px)",
        background: available
          ? "var(--surface-sf-wht, #FFF)"
          : "var(--surface-sf-overlay-8-b, rgba(0, 0, 0, 0.08))",
        ...sx,
      }}
      {...props}
    >
      <CardContent>
        <div className="flex gap-3 flex-col">
          <div className="justify-between items-center flex">
            <div className="text-black text-opacity-90 text-base font-bold font-['Bricolage Grotesque']">
              {tableText}
            </div>
            {/* 右侧status+图片 */}
            <div className="h-6 justify-end items-center gap-2 inline-flex">
              <StatusTag color={statusColor ?? "green"} text={status} />
              <ImageButton src={src} onChoose={onChooseImage} />
            </div>
          </div>
          {/* tags */}
          <div className="w-full">
            <div className="block min-w-full overflow-auto whitespace-nowrap">
              {tags.map((text, index) => (
                <div className="ml-1 inline-block">
                  <Tag text={text} />
                </div>
              ))}
            </div>
          </div>
          {/* note */}
          <div className="text-black text-opacity-60 text-sm font-normal font-['Bricolage Grotesque'] overflow-hidden whitespace-nowrap text-ellipsis">
            {note}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
