"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Label } from "./ui/label";
import AvatarIcon from "./icons/avatar";
import { Button } from "./ui/button";
import { Upload, X, Camera, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "./ui/dialog";
import { Finger1, Finger2, Finger3 } from "./icons/finger-pose";

interface ProfileUploaderProps {
    name?: string;
    value?: string;
    error?: string;
    onChange?: (value: string) => void;
}

export default function ProfileUploader({
    name,
    value,
    error,
    onChange,
}: ProfileUploaderProps) {
    const webcamRef = useRef<Webcam>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [savedImage, setSavedImage] = useState<string | null>(value || null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (value !== savedImage) {
            setSavedImage(value || null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
        }
    }, [webcamRef]);

    const retake = () => {
        setCapturedImage(null);
    };

    const savePhoto = () => {
        if (capturedImage) {
            setSavedImage(capturedImage);
            onChange?.(capturedImage);
            setHasInteracted(true);
            setIsModalOpen(false);
            setCapturedImage(null);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setCapturedImage(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCapturedImage(null);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSavedImage(result);
                onChange?.(result);
                setHasInteracted(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-2 text-xs font-bold">
            <Label htmlFor="profilePhoto">Photo Profile</Label>

            {savedImage ? (
                <Image
                    src={savedImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 aspect-square rounded-lg object-cover"
                />
            ) : (
                <AvatarIcon />
            )}

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-fit"
                    type="button"
                    onClick={handleOpenModal}
                >
                    <Upload className="h-4 w-4" /> Take a Picture
                </Button>
            </div>

            {name && (
                <input type="hidden" name={name} value={savedImage || ""} />
            )}

            <Input
                type="file"
                id="profilePhoto"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
            />

            {error && !hasInteracted && (
                <p className="text-danger-main text-xs font-normal">{error}</p>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
                    <DialogHeader className="flex flex-row justify-between items-center">
                        <div className="flex-1">
                            <DialogTitle className="font-bold">
                                Raise Your Hand to Capture
                            </DialogTitle>
                            <DialogDescription className="text-neutral-100 text-xs">
                                We&apos;ll take the photo once your hand pose is
                                detected.
                            </DialogDescription>
                        </div>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            <X />
                        </Button>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center gap-4">
                        {!capturedImage ? (
                            <>
                                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        className="w-full h-full object-cover"
                                        mirrored
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-3 w-full">
                                    <p className="text-sm text-muted-foreground text-start">
                                        To take a picture, follow the hand poses
                                        in the order shown below. The system
                                        will automatically capture the image
                                        once the final pose is detected.
                                    </p>

                                    {/* Hand pose instructions */}
                                    <div className="flex items-center justify-center gap-4 py-2">
                                        <Finger3 />
                                        <span>
                                            <ChevronRight />
                                        </span>
                                        <Finger2 />
                                        <span>
                                            <ChevronRight />
                                        </span>
                                        <Finger1 />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                                <Image
                                    src={capturedImage}
                                    alt="Captured"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex flex-row sm:justify-center w-full items-center">
                        {!capturedImage ? (
                            <>
                                <Button onClick={capture}>
                                    <Camera className="mr-2 h-4 w-4" /> Capture
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={retake}>
                                    Retake Photo
                                </Button>
                                <Button variant="primary" onClick={savePhoto}>
                                    Submit
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
