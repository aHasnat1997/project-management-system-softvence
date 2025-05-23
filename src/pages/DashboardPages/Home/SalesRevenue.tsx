'use client';

import { ArrowUpRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import SelectMonth from '@/components/Select/SelectMonth';

const chartData = [
    { month: '01', desktop: 186 },
    { month: '02', desktop: 305 },
    { month: '03', desktop: 237 },
    { month: '04', desktop: 73 },
    { month: '05', desktop: 209 },
    { month: '06', desktop: 422 },
    { month: '07', desktop: 786 },
    { month: '08', desktop: 222 },
    { month: '09', desktop: 214 },
    { month: '10', desktop: 344 },
    { month: '11', desktop: 124 },
    { month: '12', desktop: 643 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

export function SalesRevenue() {
    return (
        <Card className="my-5 basis-8/12">
            <CardHeader className="flex flex-col gap-2">
                <div className="flex justify-between w-full">
                    <CardTitle className="text-2xl">Sales Revenue</CardTitle>
                    <div>
                        <SelectMonth value="0" onChange={() => {}} />
                    </div>
                </div>
                <span className="text-4xl font-bold">$35,000.00</span>
                <div className="flex items-center gap-2">
                    <div className="text-green-600 flex items-center bg-primary/20 px-2 py-1 rounded-full">
                        <ArrowUpRight /> 1.29%
                    </div>
                    <span> / Last Month</span>
                </div>
                <CardDescription>Excellent job on your Project </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="p-0 max-h-[400px] w-full" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.slice(0, 3)}
                        />
                        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-primary text-primary-foreground rounded-md p-2 shadow-lg">
                                            <p>{`$${payload[0].value?.toLocaleString()}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--primary-40)"
                            radius={[8, 8, 0, 0]}
                            barSize={30}
                            activeBar={{ fill: 'var(--color-primary)' }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
