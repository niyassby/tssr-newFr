import { AreaChart, CartesianGrid, Line, LineChart, XAxis, Area } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format, subMonths } from "date-fns"
import { TrendingUp } from "lucide-react"



const chartConfig = {
  Students: {
    label: "Student",
    color: "var(--chart-2)",
  }
}

export function AdminChart({ data }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Enrollment Analytics</CardTitle>
        <CardDescription>
          Overview of student enrollment from {format(subMonths(new Date(), 5), "MMMM yyyy")} - {format(new Date(), "MMMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data || []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Students)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="85%"
                  stopColor="var(--color-Students)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-Students)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Displaying total student enrollments over the past 6 months
        </div>
        {/* <div className="text-muted-foreground leading-none">
          Displaying total student enrollments over the past 6 months
        </div> */}
      </CardFooter>
    </Card>
  )
}
