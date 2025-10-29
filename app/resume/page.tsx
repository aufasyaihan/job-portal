"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/date-picker";
import PhoneNumberInput from "@/components/phone-number";
import ResumeHeader from "@/components/resume/header";
import LinkInput from "@/components/link-input";
import EmailInput from "@/components/email-input";
import ProfileUploader from "@/components/profile-uploader";
import { submitResume, type FormState } from "@/app/actions/resume";
import { Loader2 } from "lucide-react";

const initialState: FormState = {
    success: false,
    message: "",
};

export default function ResumePage() {
    const [state, formAction, isPending] = useActionState(
        submitResume,
        initialState
    );
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        domicile: "",
        phoneNumber: "",
        email: "",
        linkedIn: "",
        profilePhoto: "",
    });

    useEffect(() => {
        if (state?.errors) {
            console.log(state.errors);

            const firstErrorField = Object.keys(state.errors)[0];
            const element = document.getElementById(firstErrorField);
            element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [state?.errors]);

    const getErrorMessage = (field: keyof typeof formData) => {
        return state?.errors?.[field]?.[0];
    };

    return (
        <form ref={formRef} action={formAction} className="flex-1">
            <Card className="w-full flex-1 flex flex-col overflow-hidden max-h-[calc(100dvh-11.83rem)] rounded-none shadow-none">
                <ResumeHeader />
                <CardContent className="overflow-y-auto flex-1 scrollbar pb-2">
                    <div className="flex flex-col gap-4 px-6">
                        <p className="text-danger-main font-bold text-xs">
                            * Required
                        </p>

                        <ProfileUploader
                            name="profilePhoto"
                            value={formData.profilePhoto}
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    profilePhoto: value,
                                })
                            }
                            error={getErrorMessage("profilePhoto")}
                        />

                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="full_name"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                id="full_name"
                                name="full_name"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }
                                className={
                                    getErrorMessage("fullName")
                                        ? "border-danger-main"
                                        : ""
                                }
                            />
                            {getErrorMessage("fullName") && (
                                <p className="text-danger-main text-xs font-normal">
                                    {getErrorMessage("fullName")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="date_of_birth"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Date of Birth
                            </Label>
                            <DatePicker
                                id="date_of_birth"
                                name="date_of_birth"
                                placeholder="Select your date of birth"
                                value={formData.dateOfBirth}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: value,
                                    })
                                }
                                error={getErrorMessage("dateOfBirth")}
                            />
                            {getErrorMessage("dateOfBirth") && (
                                <p className="text-danger-main text-xs font-normal">
                                    {getErrorMessage("dateOfBirth")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal">
                                Pronoun (gender)
                            </Label>
                            <div className="flex gap-6">
                                <Label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-90">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === "female"}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                gender: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-primary-main cursor-pointer"
                                    />
                                    <span className="font-normal">
                                        She/her (Female)
                                    </span>
                                </Label>
                                <Label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-90">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === "male"}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                gender: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-primary-main cursor-pointer"
                                    />
                                    <span className="font-normal">
                                        He/him (Male)
                                    </span>
                                </Label>
                            </div>
                            {getErrorMessage("gender") && (
                                <p className="text-danger-main text-xs font-normal">
                                    {getErrorMessage("gender")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="domicile"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Domicile
                            </Label>
                            <Select
                                value={formData.domicile}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        domicile: value,
                                    })
                                }
                            >
                                <SelectTrigger
                                    className={
                                        getErrorMessage("domicile")
                                            ? "border-danger-main"
                                            : ""
                                    }
                                >
                                    <SelectValue
                                        className="font-normal capitalize text-xs"
                                        placeholder="Choose your domicile"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jakarta">
                                        Jakarta
                                    </SelectItem>
                                    <SelectItem value="bandung">
                                        Bandung
                                    </SelectItem>
                                    <SelectItem value="surabaya">
                                        Surabaya
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <input
                                type="hidden"
                                name="domicile"
                                value={formData.domicile}
                            />
                            {getErrorMessage("domicile") && (
                                <p className="text-danger-main text-xs font-normal">
                                    {getErrorMessage("domicile")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="phone_number"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Phone number
                            </Label>
                            <PhoneNumberInput
                                name="phone_number"
                                value={formData.phoneNumber}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        phoneNumber: value,
                                    })
                                }
                                error={getErrorMessage("phoneNumber")}
                            />
                        </div>

                        <EmailInput
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(value) =>
                                setFormData({ ...formData, email: value })
                            }
                            error={getErrorMessage("email")}
                        />

                        <LinkInput
                            label="Link LinkedIn"
                            id="linkedIn"
                            name="linkedIn"
                            placeholder="https://www.linkedin.com/in/username"
                            value={formData.linkedIn}
                            onChange={(value) =>
                                setFormData({ ...formData, linkedIn: value })
                            }
                            error={getErrorMessage("linkedIn")}
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="bg-neutral-10 border border-neutral-40 px-10 py-6">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary-main hover:bg-primary-main/90 text-white font-bold disabled:opacity-50"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
}
