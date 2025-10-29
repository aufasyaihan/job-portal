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
import { ChevronDown } from "lucide-react";

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
                        className="w-4 aspect-square border border-neutral-40 object-cover rounded-full"
                    />
                    <ChevronDown className="size-5 text-neutral-100" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[346px]" align="start">
                    <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList className="scrollbar">
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
                                            className="w-4 aspect-square border border-neutral-40 object-cover rounded-full"
                                        />
                                        <span className="flex-1">
                                            {country.name}
                                        </span>
                                        <span className="text-gray-500 text-xs">
                                            {country.dial_code}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="bg-neutral-40 w-px h-full shrink-0" />
            <p className="text-neutral-90">
                {selectedCountryData?.dial_code || "+62"}
            </p>
            <Input
                type="number"
                id="phone_number"
                placeholder="Enter your phone number"
                className="flex-1 border-0 focus:ring-0 outline-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none font-normal"
            />
        </div>
    );
}
