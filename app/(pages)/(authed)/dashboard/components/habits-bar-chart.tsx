"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Spinner } from "@/components/ui/spinner"
import { IHabit } from "@/lib/models/Habit"
import { useMemo } from "react"

interface ChartData {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    positive: {
        label: "Positive",
        color: "#2563eb",
    },
    negative: {
        label: "Negative",
        color: "#60a5fa",
    },
    neutral: {
        label: "Neutral",
        color: "#f59e0b",
    },
} satisfies ChartConfig

interface HabitsBarChartProps {
    habits: IHabit[],
    loading: boolean
}

export function HabitsBarChart({ habits, loading }: HabitsBarChartProps) {
    const chartData = useMemo<ChartData[]>(() => {
        const datesMap = new Map<string, any>();
        habits.forEach(h => {
            const date = new Date(h.createdAt).toDateString()
            if (!datesMap.has(date)) {
                datesMap.set(date, {
                    positive: 0,
                    negative: 0,
                    neutral: 0,
                });
            }
            datesMap.get(date)[h.type] += 1;
        });
        const final: ChartData[] = [];
        datesMap.forEach((v, k) => {
            final.push({
                date: k,
                positive: v.positive,
                negative: v.negative,
                neutral: v.neutral,
            })
        })
        return final;
    }, [habits])

    return (
        <Card className="[&>*]:p-0 py-0 habits-bar-chart">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b sm:flex-row [.border-b]:pb-0">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-6">
                    <CardTitle>Habits Summary</CardTitle>
                    <CardDescription>
                        Showing habits count in a given period of time.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 && <div className="flex items-center justify-center w-full min-h-[200px]">
                    {loading && <Spinner className="w-12 h-12 text-gray-300" />}
                    {!loading && <span className="text-center text-sm">No data available</span>}
                </div>}
                {chartData.length > 0 && <ChartContainer config={chartConfig} className="aspect-ratio max-h-[400px] min-h-[200px] aspect-square w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="positive" fill="var(--color-green-200)" radius={4} />
                        <Bar dataKey="negative" fill="var(--color-red-200)" radius={4} />
                        <Bar dataKey="neutral" fill="var(--color-cyan-200)" radius={4} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                    </BarChart>
                </ChartContainer>}
            </CardContent>
        </Card>
    )
}
