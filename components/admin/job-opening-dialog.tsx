"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioChipGroup, RadioChipItem } from "@/components/ui/radio-chip";
import { useActionState, useState, useEffect } from "react";
import { createJobOpening } from "@/app/actions/job";
import { Card, CardContent } from "../ui/card";

const profileFields = [
    { id: "fullName", label: "Full name" },
    { id: "photoProfile", label: "Photo Profile" },
    { id: "gender", label: "Gender" },
    { id: "domicile", label: "Domicile" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone number" },
    { id: "linkedinLink", label: "Linkedin link" },
    { id: "dateOfBirth", label: "Date of birth" },
];

type ProfileRequirement = "Mandatory" | "Optional" | "Off";

const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function JobOpeningDialog({ children }: { children: React.ReactNode }) {
    const [state, formAction, isPending] = useActionState(createJobOpening, {
        success: undefined,
        message: undefined,
        errors: undefined,
    });

    const [open, setOpen] = useState(false);
    const [jobType, setJobType] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");
    const [salaryError, setSalaryError] = useState<string>("");
    const [profileRequirements, setProfileRequirements] = useState<
        Record<string, ProfileRequirement>
    >(
        Object.fromEntries(
            profileFields.map((field) => [field.id, "Mandatory"])
        )
    );

    const handleRequirementChange = (
        fieldId: string,
        value: ProfileRequirement
    ) => {
        setProfileRequirements((prev) => ({
            ...prev,
            [fieldId]: value,
        }));
    };

    useEffect(() => {
        if (minSalary && maxSalary) {
            const minValue = parseInt(minSalary.replace(/\./g, ""));
            const maxValue = parseInt(maxSalary.replace(/\./g, ""));

            if (maxValue < minValue) {
                setSalaryError(
                    "Maximum salary harus sama atau lebih besar dari minimum salary"
                );
            } else {
                setSalaryError("");
            }
        } else {
            setSalaryError("");
        }
    }, [minSalary, maxSalary]);

    useEffect(() => {
        if (state.success && open) {
            const timer = setTimeout(() => {
                setOpen(false);
                setTimeout(() => {
                    setJobType("");
                    setMinSalary("");
                    setMaxSalary("");
                    setSalaryError("");
                    setProfileRequirements(
                        Object.fromEntries(
                            profileFields.map((field) => [
                                field.id,
                                "Mandatory",
                            ])
                        )
                    );
                }, 300);
                state.success = undefined;
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state.success, open, state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle>Job Opening</DialogTitle>
                </DialogHeader>

                <form
                    action={formAction}
                    className="flex flex-col flex-1 overflow-hidden"
                >
                    <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-6 scrollbar">
                        <div className="space-y-2">
                            <Label htmlFor="jobName">
                                Job Name<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="jobName"
                                name="jobName"
                                placeholder="Ex. Front End Engineer"
                            />
                            {state.errors?.jobName && (
                                <p className="text-sm text-red-500">
                                    {state.errors.jobName[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jobType">
                                Job Type<span className="text-red-500">*</span>
                            </Label>
                            <Select value={jobType} onValueChange={setJobType}>
                                <SelectTrigger id="jobType">
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full Time">
                                        Full Time
                                    </SelectItem>
                                    <SelectItem value="Part Time">
                                        Part Time
                                    </SelectItem>
                                    <SelectItem value="Contract">
                                        Contract
                                    </SelectItem>
                                    <SelectItem value="Internship">
                                        Internship
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <input
                                type="hidden"
                                name="jobType"
                                value={jobType}
                            />
                            {state.errors?.jobType && (
                                <p className="text-sm text-red-500">
                                    {state.errors.jobType[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jobDescription">
                                Job Description
                                <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                placeholder="Ex."
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {state.errors?.jobDescription && (
                                <p className="text-sm text-red-500">
                                    {state.errors.jobDescription[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="candidatesNeeded">
                                Number of Candidate Needed
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="candidatesNeeded"
                                name="candidatesNeeded"
                                type="number"
                                placeholder="Ex. 2"
                                className="[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            {state.errors?.candidatesNeeded && (
                                <p className="text-sm text-red-500">
                                    {state.errors.candidatesNeeded[0]}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Job Salary</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="minSalary"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Minimum Estimated Salary
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute top-[23%] left-3 font-bold text-sm">
                                            Rp
                                        </span>
                                        <Input
                                            id="minSalary"
                                            name="minSalary"
                                            type="text"
                                            maxLength={10}
                                            value={minSalary}
                                            onChange={(e) => {
                                                const formatted =
                                                    formatCurrency(
                                                        e.target.value
                                                    );
                                                setMinSalary(formatted);
                                            }}
                                            placeholder="7.000.000"
                                            className="pl-8"
                                        />
                                    </div>
                                    {state.errors?.minSalary && (
                                        <p className="text-sm text-red-500">
                                            {state.errors.minSalary[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="maxSalary"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Maximum Estimated Salary
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute top-[23%] left-3 font-bold text-sm">
                                            Rp
                                        </span>
                                        <Input
                                            id="maxSalary"
                                            name="maxSalary"
                                            type="text"
                                            value={maxSalary}
                                            maxLength={10}
                                            onChange={(e) => {
                                                const formatted =
                                                    formatCurrency(
                                                        e.target.value
                                                    );
                                                setMaxSalary(formatted);
                                            }}
                                            placeholder="8.000.000"
                                            className="pl-8"
                                        />
                                    </div>
                                    {(salaryError ||
                                        state.errors?.maxSalary) && (
                                        <p className="text-sm text-red-500">
                                            {salaryError ||
                                                state.errors?.maxSalary?.[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="space-y-4">
                                <Label className="text-base">
                                    Minimum Profile Information Required
                                </Label>
                                <input
                                    type="hidden"
                                    name="profileRequirements"
                                    value={JSON.stringify(profileRequirements)}
                                />
                                <div className="space-y-3">
                                    {profileFields.map((field) => (
                                        <div
                                            key={field.id}
                                            className="flex items-center justify-between py-2 border-b"
                                        >
                                            <span className="text-sm">
                                                {field.label}
                                            </span>
                                            <RadioChipGroup
                                                value={
                                                    profileRequirements[
                                                        field.id
                                                    ] || "Mandatory"
                                                }
                                                onValueChange={(value) =>
                                                    handleRequirementChange(
                                                        field.id,
                                                        value as ProfileRequirement
                                                    )
                                                }
                                            >
                                                <RadioChipItem
                                                    value="Mandatory"
                                                    label="Mandatory"
                                                />
                                                <RadioChipItem
                                                    value="Optional"
                                                    label="Optional"
                                                />
                                                <RadioChipItem
                                                    value="Off"
                                                    label="Off"
                                                />
                                            </RadioChipGroup>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="px-6 py-4 border-t bg-background">
                        <div className="flex justify-end">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isPending || !!salaryError}
                                className="w-full sm:w-auto"
                            >
                                {isPending ? "Publishing..." : "Publish Job"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
