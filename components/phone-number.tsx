"use client";

import { Input } from "./ui/input";
import countryCodes from "@/lib/country-codes.json";
import Flag from "react-world-flags";
import { useState, useEffect } from "react";
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

interface PhoneNumberInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "onChange" | "value"
    > {
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export default function PhoneNumberInput({
    name,
    value,
    onChange,
    error,
}: PhoneNumberInputProps) {
    const [selectedCountry, setSelectedCountry] = useState("ID");
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (value) {
            const matchedCountry = countryCodes.find((country) =>
                value.startsWith(country.dial_code)
            );

            if (matchedCountry) {
                setSelectedCountry(matchedCountry.code);
                const numberPart = value.substring(
                    matchedCountry.dial_code.length
                );
                setPhoneNumber(numberPart);
            } else {
                setPhoneNumber(value);
            }
        } else {
            setPhoneNumber("");
        }
    }, [value]);

    const selectedCountryData = countryCodes.find(
        (country) => country.code === selectedCountry
    );

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setPhoneNumber(newValue);
        setHasInteracted(true);
        const fullNumber = `${
            selectedCountryData?.dial_code || "+62"
        }${newValue}`;
        onChange?.(fullNumber);
    };

    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setOpen(false);
        setHasInteracted(true);
        const newCountry = countryCodes.find((c) => c.code === countryCode);
        if (newCountry) {
            const fullNumber = `${newCountry.dial_code}${phoneNumber}`;
            onChange?.(fullNumber);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                className={`flex gap-2 items-center border-2 rounded-md h-10 py-2 ${
                    error && !hasInteracted
                        ? "border-danger-main"
                        : "border-neutral-40"
                }`}
            >
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
                                                handleCountryChange(
                                                    country.code
                                                );
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
                    name={name}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="flex-1 border-0 focus:ring-0 outline-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none font-normal"
                />
            </div>
            {error && !hasInteracted && (
                <p className="text-danger-main text-xs font-normal">{error}</p>
            )}
        </div>
    );
}
