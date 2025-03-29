"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { IHabit } from "@/lib/models/Habit"


interface ChartData {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
}


const chartConfig = {
    views: {
        label: "Count",
    },
    positive: {
        label: "Positive",
        color: "hsl(var(--chart-1))",
    },
    negative: {
        label: "Negative",
        color: "hsl(var(--chart-2))",
    },
    neutral: {
        label: "Neutral",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

interface OverviewProps {
    data: IHabit[]
}

export function Overview({ data }: OverviewProps) {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("positive")

    const total = React.useMemo(
        () => ({
            positive: data.filter(h => h.type === "positive").length,
            negative: data.filter(h => h.type === "negative").length,
            neutral: data.filter(h => h.type === "neutral").length,
        }),
        [data]
    )

    const chartData = React.useMemo<ChartData[]>(() => {
        const datesMap = new Map<string, any>();
        data.forEach(h => {
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
    }, [data])

    return (
        <Card className="[&>*]:p-0 py-0">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b sm:flex-row [.border-b]:pb-0">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-6">
                    <CardTitle>Habits Summary</CardTitle>
                    <CardDescription>
                        Showing total habit types in a given period of time.
                    </CardDescription>
                </div>
                <div className="flex">
                    {["positive", "neutral", "negative"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
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
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
