'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    RadialBar,
    RadialBarChart,
    PolarGrid,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

const metrics = [
    { name: 'Completed', value: 82, fill: 'hsl(var(--primary))' },
    { name: 'Canceled', value: 90, fill: 'hsl(var(--destructive))' },
    { name: 'Success Rate', value: 30, fill: 'hsl(var(--warning))' },
];

export function SalesPerformance() {
    return (
        <Card className="p-6 my-4 basis-4/12">
            <CardHeader className="p-0 pb-6">
                <CardTitle className="text-lg font-semibold">Sales Performance</CardTitle>
                <CardDescription className="text-sm">Last Month</CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
                {metrics.map(metric => (
                    <div key={metric.name} className="flex items-center gap-4 border-b-2">
                        <div className="w-40 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    innerRadius="60%"
                                    outerRadius="90%"
                                    data={[
                                        { ...metric, endAngle: 360 * (metric.value / 100) + 90 },
                                    ]}
                                    startAngle={90}
                                >
                                    <PolarGrid radialLines={false} stroke="hsl(var(--border))" />
                                    <RadialBar
                                        dataKey="value"
                                        cornerRadius={10}
                                        className="fill-primary"
                                    />
                                    <PolarRadiusAxis angle={0} tick={false} axisLine={false} />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-sm font-bold"
                                        fill="hsl(var(--foreground))"
                                    >
                                        {metric.value}%
                                    </text>
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                        <span className="text font-medium text-muted-foreground">
                            Total Project {metric.name}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
