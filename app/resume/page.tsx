import AvatarIcon from "@/components/icons/avatar";
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
import { Upload } from "lucide-react";
import DatePicker from "@/components/date-picker";
import PhoneNumberInput from "@/components/phone-number";
import ResumeHeader from "@/components/resume/header";

export default function ResumePage() {
    return (
        <form className="flex-1">
            <Card className="w-full flex-1 flex flex-col overflow-hidden max-h-[calc(100dvh-11.83rem)] rounded-none shadow-none">
                <ResumeHeader />
                <CardContent className="overflow-y-auto flex-1 scrollbar">
                    <div className="flex flex-col gap-4 px-6">
                        <p className="text-danger-main font-bold text-xs">
                            * Required
                        </p>
                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label htmlFor="profile_photo">Photo Profile</Label>
                            <AvatarIcon />
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-fit"
                            >
                                <Upload /> Take a Picture
                            </Button>
                            <Input
                                type="file"
                                id="profile_photo"
                                className="hidden"
                            />
                        </div>
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
                                placeholder="Enter your full name"
                            />
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
                                placeholder="Select your date of birth"
                            />
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
                                        className="w-4 h-4 accent-primary-main cursor-pointer"
                                    />
                                    <span className="font-normal">
                                        He/him (Male)
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="domicile"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Domicile
                            </Label>
                            <Select>
                                <SelectTrigger>
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
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="phone_number"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Phone number
                            </Label>
                            <PhoneNumberInput />
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="email"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-bold">
                            <Label
                                htmlFor="linkedin"
                                className="after:content-['*'] after:ml-0.5 after:text-danger-main after:font-normal"
                            >
                                Link Linkedin
                            </Label>
                            <Input
                                type="url"
                                id="linkedin"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="bg-neutral-10 border border-neutral-40 px-10 py-6">
                <Button
                    type="submit"
                    className="w-full bg-primary-main hover:bg-primary-main/90 text-white font-bold"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
