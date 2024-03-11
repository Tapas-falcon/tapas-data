import { DatePicker } from "@tapas/ui/DatePicker";
import React, { useEffect, useState } from "react";
import { ArrowDropDownIcon, ArrowDropUpIcon } from '@tapas/ui/icons';
import { useTranslations } from "next-intl";

export type DatePickerProps = {
    prefix?: string;
    onDateChange?: (date: string | string[] | null) => void;
    value: string | string[];
};

export const OrderDatePicker: React.FC<DatePickerProps> = ({
    prefix='Date of creation',
    onDateChange=() => {},
    value,
}) => {
    const orderListranslate = useTranslations("orderList");
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [createDate, setCreateDate] = useState<string | string[] | null>(value==='default' ? null : value);
    const [createDateText, setCreateDateText] = useState(`${prefix}: ${orderListranslate("Any")}`);

    useEffect(() => {
        if (!createDate) {
            setCreateDateText(`${prefix}: ${orderListranslate("Any")}`);
            onDateChange(null);
            return;
        }
        if (Array.isArray(createDate)) {
            setCreateDateText(createDate.join(' - '));
        } else {
            setCreateDateText(createDate);
        }
        onDateChange(createDate);
    }, [createDate]);

    // useEffect(() => {}, [datePickerOpen]);

    return (
        <div className="relative">
            <div className={`h-10 pl-4 pr-3 bg-black rounded-[360px] justify-center items-center gap-1 inline-flex ${datePickerOpen || createDate !== null ? '': 'bg-opacity-10'}`}
                onClick={() => {
                    setDatePickerOpen(!datePickerOpen);
                }}>
                <div className={`${datePickerOpen || createDate !== null ? 'text-white' : 'text-black text-opacity-90'} text-sm font-normal font-['Bricolage Grotesque']`}>
                    {createDateText}
                </div>
                { datePickerOpen ? <ArrowDropUpIcon size={20} color={datePickerOpen || createDate !== null ? "white" : "" } /> : <ArrowDropDownIcon size={20} color={createDate !== null ? "white" : ""} /> }
            </div>
            <div className="absolute rounded-xl shadow mt-2 bg-white" style={{
                display: datePickerOpen ? "block" : "none",
            }}>
                <DatePicker views={["year", "month", "day"]} footer={true} customRange={true} doneFn={(res) => {
                    if (typeof res === 'string' || Array.isArray(res)) {
                        setCreateDate(res);
                        setDatePickerOpen(false);
                    }
                }} clearFn={() => {
                    setCreateDate(null);
                    setDatePickerOpen(false);
                }}/>
            </div>
        </div>
    )
};