'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

interface SelectBySearchProps<T extends { _id: string }> {
    data?: T[];
    isLoading?: boolean;
    isFetching?: boolean;
    displayKey: keyof T;
    displayKey2?: keyof T;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    limit?: number;
    value: string;
    onValueChange: (value: string) => void;
    onSearchChange?: (searchTerm: string) => void;
    className?: string;
    initialSelectedItem?: T;
}

export function SelectBySearch<T extends { _id: string; [displayKey: string]: string }>({
    data = [],
    isLoading = false,
    isFetching = false,
    displayKey,
    displayKey2,
    placeholder = 'Select...',
    searchPlaceholder = 'Search...',
    emptyText = 'No results found',
    limit = 5,
    value,
    onValueChange,
    onSearchChange,
    className,
    initialSelectedItem,
}: SelectBySearchProps<T>): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const selectedItem = useMemo(() => {
        // First try to find in the current data
        const foundInData = data.find(item => item._id === value);
        if (foundInData) return foundInData;

        // If not found and we have an initial selected item, use that
        if (initialSelectedItem && initialSelectedItem._id === value) {
            return initialSelectedItem;
        }

        return undefined;
    }, [value, data, initialSelectedItem]);

    const displayedItems = useMemo(() => {
        return data.slice(0, limit);
    }, [data, limit]);

    const getDisplayValue = (item: T): string => {
        const firstValue = item[displayKey] ? String(item[displayKey]) : '';
        const secondValue = displayKey2 && item[displayKey2] ? String(item[displayKey2]) : '';
        return secondValue ? `${firstValue} ${secondValue}` : firstValue;
    };

    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        onSearchChange?.(search);
    };

    const handleSelect = (currentValue: string) => {
        onValueChange(currentValue === value ? '' : currentValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    color="secondary"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between text-muted-foreground border-border',
                        className
                    )}
                    disabled={isLoading || isFetching}
                >
                    {isLoading || isFetching ? (
                        <Skeleton className="h-4 w-[80%]">
                            <span className="flex items-center gap-2">
                                <Loader className=" animate-spin" /> Loading...
                            </span>
                        </Skeleton>
                    ) : value && selectedItem ? (
                        getDisplayValue(selectedItem)
                    ) : (
                        placeholder
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command className="w-full" shouldFilter={false}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        className="h-9"
                        value={searchTerm}
                        onValueChange={handleSearchChange}
                    />
                    <CommandList className="max-h-[200px] overflow-y-auto">
                        {isLoading || isFetching ? (
                            <div className="space-y-1 p-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-full" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <CommandEmpty>{emptyText}</CommandEmpty>
                                <CommandGroup>
                                    {displayedItems.map(item => (
                                        <CommandItem
                                            key={item._id}
                                            value={item._id}
                                            onSelect={handleSelect}
                                            className="w-full"
                                        >
                                            {getDisplayValue(item)}
                                            <Check
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    value === item._id ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
