"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Input } from "./ui/input";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

export default function DatePicker({
    id,
    placeholder,
}: {
    id: string;
    placeholder?: string;
}) {
    const [date, setDate] = useState<Date | undefined>();
    const [open, setOpen] = useState<boolean>(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
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
                            <span className="text-neutral-60 flex-1">
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
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
