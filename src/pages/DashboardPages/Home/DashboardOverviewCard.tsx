import SelectMonth from '@/components/Select/SelectMonth';
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface DashboardOverviewCardProps {
    title: string;
    initialMonth?: string;
}

export default function DashboardOverviewCard({
    title,
    initialMonth = '0',
}: DashboardOverviewCardProps) {
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        // Here you would typically fetch new data based on the selected month
        // For example: fetchDashboardData(month);
        console.log('Selected month:', month);
    };

    return (
        <Card className="p-4 ">
            <span className="text-xl text-muted-foreground">{title}</span>
            <span className="text-3xl font-bold">22 Days</span>

            <div className="flex justify-between items-end">
                <div className="text-green-600 flex items-center bg-primary/20 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="ml-1 text-sm">1.29%</span>
                </div>
                <SelectMonth
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="w-[150px]"
                />
            </div>
        </Card>
    );
}
