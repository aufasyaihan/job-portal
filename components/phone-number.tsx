"use client";

import { Input } from "./ui/input";
import countryCodes from "@/lib/country-codes.json";
import Flag from "react-world-flags";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PhoneNumberInput() {
    const [selectedCountry, setSelectedCountry] = useState("ID");
    const [open, setOpen] = useState(false);

    const selectedCountryData = countryCodes.find(
        (country) => country.code === selectedCountry
    );

    return (
        <div className="flex gap-2 items-center border-2 border-neutral-40 rounded-md h-10 py-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded transition-colors">
                    <Flag
                        code={selectedCountry}
                        className="w-5 h-4 object-cover rounded-sm border border-neutral-40"
                    />
                    <ChevronDown className="size-7 text-neutral-100" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[346px]" align="start">
                    <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList className="max-h-[100px] scrollbar">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {countryCodes.map((country) => (
                                    <CommandItem
                                        key={country.code}
                                        value={`${country.name} ${country.code} ${country.dial_code}`}
                                        onSelect={() => {
                                            setSelectedCountry(country.code);
                                            setOpen(false);
                                        }}
                                    >
                                        <Flag
                                            code={country.code}
                                            className="w-5 h-4 object-cover rounded-sm"
                                        />
                                        <span className="flex-1">
                                            {country.name}
                                        </span>
                                        <span className="text-gray-500 text-xs">
                                            {country.dial_code}
                                        </span>
                                        <Check
                                            className={cn(
                                                "size-4",
                                                selectedCountry === country.code
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="bg-neutral-40 w-px h-full flex-shrink-0" />
            <p className="text-neutral-90">
                {selectedCountryData?.dial_code || "+62"}
            </p>
            <Input
                type="number"
                id="phone_number"
                placeholder="Enter your phone number"
                className="flex-1 border-0 focus:ring-0 outline-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
        </div>
    );
}
