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
import { Spinner } from "../../../../components/ui/spinner"


interface ChartData {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
}


const chartConfig = {
    positive: {
        label: "Positive",
        color: "var(--color-green-200)",
    },
    negative: {
        label: "Negative",
        color: "var(--color-red-200)",
    },
    neutral: {
        label: "Neutral",
        color: "var(--color-cyan-200)",
    },
} satisfies ChartConfig

interface OverviewProps {
    data: IHabit[]
    loading: boolean
}

export function Overview({ data, loading }: OverviewProps) {
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
        <Card className="[&>*]:p-0 py-0 overview-report">
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
                                disabled={loading}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                {loading ? <Spinner className="w-8 h-8 text-gray-200" />
                                    : <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString()}
                                    </span>}
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {chartData.length === 0 && <div className="aspect-auto items-center justify-center">
                    {loading && <Spinner className="w-12 h-12 text-gray-300" />}
                    {!loading && <span className="text-center text-sm">No data available</span>}
                </div>}
                {chartData.length > 0 &&
                    <ChartContainer
                        config={chartConfig}
                        className="max-h-[400px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{ left: 12, right: 12, bottom: 12 }}
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
                    </ChartContainer>}
            </CardContent>
        </Card>
    )
}
