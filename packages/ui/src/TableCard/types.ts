import { SxProps } from "@mui/joy/styles/types";
import { MouseEventHandler } from "react";

export enum TableStatus {
    Available='Available',
    InUse='In use',
    Cleaning='Cleaning',
    Reserved='Reserved'
}

export enum StatusColor {
    green='bg-green-400',
    red='bg-red-700',
    yellow='bg-yellow-400',
    slate='bg-slate-500'
}

export type StatusTagColors = keyof typeof StatusColor;

export interface ITableCardProps {
    tableText: string;
    status: TableStatus;
    statusColor?: 'green' | 'red' | 'yellow' | 'slate';
    tags: string[];
    available?: boolean;
    note?: string;
    src?: string;
    onChooseImage?: MouseEventHandler
}

export interface IStatusTagProps {
    color: StatusTagColors,
    text: string
}
