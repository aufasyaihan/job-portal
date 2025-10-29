"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
    value: string;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
    undefined
);

function useSelectContext() {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("Select components must be used within Select");
    }
    return context;
}

interface SelectProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
}

function Select({
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    children,
}: SelectProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
        setOpen(false);
    };

    return (
        <SelectContext.Provider
            value={{
                value,
                onValueChange: handleValueChange,
                open,
                setOpen,
                triggerRef,
            }}
        >
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
}

function SelectGroup({ children }: { children: React.ReactNode }) {
    return <div data-slot="select-group">{children}</div>;
}

function SelectValue({
    placeholder,
    className,
}: {
    placeholder?: string;
    className?: string;
}) {
    const { value } = useSelectContext();

    return (
        <span
            data-slot="select-value"
            className={cn("line-clamp-1 flex items-center gap-2", className)}
            data-placeholder={!value ? "" : undefined}
        >
            {value || placeholder}
        </span>
    );
}

interface SelectTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "default";
    children: React.ReactNode;
}

function SelectTrigger({
    className,
    size = "default",
    children,
    ...props
}: SelectTriggerProps) {
    const { open, setOpen, triggerRef, value } = useSelectContext();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <button
            ref={triggerRef}
            type="button"
            data-slot="select-trigger"
            data-size={size}
            data-placeholder={!value ? "" : undefined}
            onClick={handleClick}
            className={cn(
                "border-danger-main border-2 data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-2xs transition-[color,box-shadow] outline-hidden focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-10 data-[size=sm]:h-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDownIcon
                className={cn(
                    "size-4 transition-transform",
                    open && "rotate-180"
                )}
            />
        </button>
    );
}

interface SelectContentProps {
    children: React.ReactNode;
    className?: string;
    position?: "popper" | "item-aligned";
}

function SelectContent({
    className,
    children,
    position = "popper",
}: SelectContentProps) {
    const { open, setOpen, triggerRef } = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = React.useState<"bottom" | "top">("bottom");

    React.useEffect(() => {
        if (!open || !triggerRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current || !contentRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentHeight = contentRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            // If not enough space below and more space above, show on top
            if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
                setDropdownPosition("top");
            } else {
                setDropdownPosition("bottom");
            }
        };

        // Update position initially and on scroll/resize
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, triggerRef]);

    React.useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return (
        <div
            ref={contentRef}
            data-slot="select-content"
            data-position={dropdownPosition}
            className={cn(
                "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute z-50 max-h-96 min-w-32 w-full overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
                dropdownPosition === "bottom" && "mt-1 slide-in-from-top-2",
                dropdownPosition === "top" && "mb-1 bottom-full slide-in-from-bottom-2",
                position === "popper" && dropdownPosition === "bottom" && "translate-y-1",
                position === "popper" && dropdownPosition === "top" && "-translate-y-1",
                className
            )}
        >
            <div className="p-1">{children}</div>
        </div>
    );
}

function SelectLabel({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            data-slot="select-label"
            className={cn("text-muted-foreground px-2 py-1.5 text-xs font-semibold", className)}
        >
            {children}
        </div>
    );
}

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

function SelectItem({
    className,
    children,
    value: itemValue,
    disabled = false,
}: SelectItemProps) {
    const { value: selectedValue, onValueChange } = useSelectContext();
    const isSelected = selectedValue === itemValue;

    const handleClick = () => {
        if (!disabled) {
            onValueChange(itemValue);
        }
    };

    return (
        <div
            data-slot="select-item"
            data-disabled={disabled ? "" : undefined}
            onClick={handleClick}
            className={cn(
                "focus:bg-accent focus:text-accent-foreground relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-normal",
                className
            )}
        >
            <span className="absolute right-2 flex size-3.5 items-center justify-center">
                {isSelected && <CheckIcon className="size-4" />}
            </span>
            <span className="flex items-center gap-2">{children}</span>
        </div>
    );
}

function SelectSeparator({ className }: { className?: string }) {
    return (
        <div
            data-slot="select-separator"
            className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
        />
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
