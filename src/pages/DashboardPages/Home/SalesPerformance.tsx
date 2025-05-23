'use client';

import SelectMonth from '@/components/Select/SelectMonth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialBar, RadialBarChart, PolarGrid, PolarRadiusAxis, Label } from 'recharts';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

const metrics = [
    { name: 'Completed', value: 82, fill: 'hsl(var(--primary))' },
    { name: 'Canceled', value: 90, fill: 'hsl(var(--destructive))' },
    { name: 'Success Rate', value: 30, fill: 'hsl(var(--warning))' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

const chartData = [{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' }];

export function SalesPerformance() {
    return (
        <Card className="p-6 my-4 basis-4/12">
            <CardHeader className="p-0 pb-6">
                <div className="flex justify-between items-center w-full">
                    <CardTitle className="text-lg font-semibold">Sales Performance</CardTitle>
                    <SelectMonth value="0" onChange={() => {}} />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="space-y-6">
                    {metrics.map(metric => (
                        <div
                            key={metric.name}
                            className="flex items-center gap-4 pb-6 border-b last:border-b-0 last:pb-0"
                        >
                            <div className="w-36 h-36 flex-shrink-0">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <RadialBarChart
                                        data={chartData}
                                        startAngle={0}
                                        endAngle={250}
                                        innerRadius={50}
                                        outerRadius={80}
                                    >
                                        <PolarGrid
                                            gridType="circle"
                                            radialLines={false}
                                            stroke="none"
                                            className="first:fill-muted last:fill-background"
                                            polarRadius={[55, 45]}
                                        />
                                        <RadialBar
                                            dataKey="visitors"
                                            background
                                            className="fill-primary"
                                            cornerRadius={10}
                                        />
                                        <PolarRadiusAxis
                                            tick={false}
                                            tickLine={false}
                                            axisLine={false}
                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (
                                                        viewBox &&
                                                        'cx' in viewBox &&
                                                        'cy' in viewBox
                                                    ) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="fill-foreground text-2xl font-bold"
                                                                >
                                                                    {chartData[0].visitors.toLocaleString()}
                                                                </tspan>
                                                            </text>
                                                        );
                                                    }
                                                }}
                                            />
                                        </PolarRadiusAxis>
                                    </RadialBarChart>
                                </ChartContainer>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium">{metric.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
