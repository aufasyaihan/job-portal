"use client";

import { cn } from "@/lib/utils";
import { cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState } from "react";

interface DropdownContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
    undefined
);

function useDropdown() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("Dropdown components must be used within Dropdown");
    }
    return context;
}

interface DropdownProps {
    children: React.ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLElement | null>(null);

    return (
        <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
            <div className="relative">{children}</div>
        </DropdownContext.Provider>
    );
}

interface DropdownTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export function DropdownTrigger({ children, asChild }: DropdownTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdown();

    const handleClick = () => setOpen(!open);

    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            ref: triggerRef,
            onClick: handleClick,
        } as React.HTMLAttributes<HTMLElement>);
    }

    return (
        <button ref={triggerRef as React.MutableRefObject<HTMLButtonElement | null>} onClick={handleClick} type="button">
            {children}
        </button>
    );
}

interface DropdownContentProps {
    children: React.ReactNode;
    align?: "start" | "end";
    className?: string;
}

export function DropdownContent({
    children,
    align = "end",
    className,
}: DropdownContentProps) {
    const { open, setOpen, triggerRef } = useDropdown();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedTrigger = triggerRef.current?.contains(target);
            const clickedContent = ref.current?.contains(target);
            
            if (!clickedTrigger && !clickedContent) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute top-full mt-2 z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white shadow-lg",
                align === "end" ? "right-0" : "left-0",
                className
            )}
        >
            {children}
        </div>
    );
}

interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export function DropdownItem({
    children,
    onClick,
    className,
    disabled,
}: DropdownItemProps) {
    const { setOpen } = useDropdown();

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
            setOpen(false);
        }
    };

    return (
        <button
            className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                className
            )}
            onClick={handleClick}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
}

interface DropdownSeparatorProps {
    className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
    return <div className={cn("my-1 h-px bg-gray-200", className)} />;
}
