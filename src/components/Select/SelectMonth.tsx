import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const MONTHS = [
    { value: '0', label: 'Last Month' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

interface SelectMonthProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export default function SelectMonth({ value, onChange, className }: SelectMonthProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
                {MONTHS.map(month => (
                    <SelectItem key={month.value} value={month.value}>
                        {month.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
