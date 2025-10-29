"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Input } from "./ui/input";
import {
    CalendarDays,
    ChevronDown,
    ChevronsLeft,
    ChevronsRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function DatePicker({
    id,
    placeholder,
}: {
    id: string;
    placeholder?: string;
}) {
    const [date, setDate] = useState<Date | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [month, setMonth] = useState<Date>(date || new Date());

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
    };

    const handlePreviousYear = () => {
        setMonth(new Date(month.getFullYear() - 1, month.getMonth()));
    };

    const handleNextYear = () => {
        setMonth(new Date(month.getFullYear() + 1, month.getMonth()));
    };

    const handlePreviousMonth = () => {
        setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
    };

    return (
        <div className="relative w-full">
            <Input
                type="date"
                id={id}
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                    setDate(
                        e.target.value ? new Date(e.target.value) : undefined
                    )
                }
                placeholder={placeholder}
                className="hidden sr-only"
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    className={cn(
                        "inline-flex justify-between items-center w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-xs focus:border-primary-main focus:outline-hidden focus:ring-1 focus:ring-primary-main"
                    )}
                >
                    <span className="flex gap-2 items-center">
                        <CalendarDays className="size-4" />
                        {date ? (
                            date.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                        ) : (
                            <span className="text-neutral-60 font-normal flex-1">
                                {placeholder}
                            </span>
                        )}
                    </span>
                    <ChevronDown
                        className={cn(
                            "size-4 transition-transform ease-in-out duration-200",
                            open ? "rotate-180" : ""
                        )}
                    />
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 rounded-2xl"
                    align="start"
                >
                    <div className="p-3">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handlePreviousYear}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handlePreviousMonth}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex gap-4 items-center justify-center text-sm font-medium flex-1 text-center">
                                <span>
                                    {month.toLocaleDateString("en-US", {
                                        month: "short",
                                    })}
                                </span>
                                <span>
                                    {month.toLocaleDateString("en-US", {
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleNextMonth}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleNextYear}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            month={month}
                            onMonthChange={setMonth}
                            formatters={{
                                formatWeekdayName: (date) => {
                                    return date
                                        .toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })
                                        .charAt(0);
                                },
                            }}
                            className="px-0 pb-0 pt-6"
                            classNames={{
                                weekday:
                                    "font-bold rounded-md flex-1 text-[0.8rem] select-none",
                                nav: "hidden",
                                month_caption: "hidden",
                                week: "flex w-full mt-2 gap-x-2",
                            }}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
