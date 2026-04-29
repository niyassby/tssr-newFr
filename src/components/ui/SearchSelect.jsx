import React, { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

function SearchSelect({
    data = [],
    text = "Select...",
    value,
    onChange,
    isObject = false,
    disabled = false,
    error = false,
    className,
}) {
    const [open, setOpen] = useState(false);

    const getLabel = (item) =>
        item?.courseName || item?.name || item?.month || "Unknown";

    const getValue = (item) =>
        item?.courseId || item?._id;

    const selectedItem = data?.find((item) =>
        isObject ? getValue(item) === value : item === value
    );

    return (
        <div className=" w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
                        role="combobox"
                        variant="outline"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between truncate font-normal",
                            className,
                            error && "border-red-500"
                        )}
                    >
                        { selectedItem ? (
                            <span className="truncate max-w-[calc(100%-35px)]">
                                {isObject ? getLabel(selectedItem) : value}
                            </span>
                        ) : (
                            <span className="text-muted-foreground truncate max-w-[calc(100%-35px)]">
                                {text}
                            </span>
                        )}

                        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent avoidCollisions={false} className="w-full p-0 pb-2 max-w-md">
                    <Command>
                        <CommandInput placeholder={`Search ${text}...`} />

                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>

                            <CommandGroup heading={text}>
                                {data?.map((option) => {
                                    const optionValue = isObject
                                        ? getValue(option)
                                        : option;

                                    const isSelected = optionValue === value;

                                    return (
                                        <CommandItem
                                            key={optionValue}
                                            value={
                                                isObject
                                                    ? getLabel(option)
                                                    : option
                                            }
                                            onSelect={() => {
                                                onChange(optionValue);
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                isSelected && "bg-accent"
                                            )}
                                        >
                                            <span>
                                                {isObject
                                                    ? getLabel(option)
                                                    : option}
                                            </span>

                                            {isSelected && (
                                                <Check className="ml-auto h-4 w-4" />
                                            )}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default SearchSelect;
