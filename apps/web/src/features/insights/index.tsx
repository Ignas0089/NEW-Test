import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Wallet } from "lucide-react";

const mockInsights = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Spending down 12% vs last month",
    detail: "A drop in discretionary purchases is improving your savings rate."
  },
  {
    id: 2,
    icon: Wallet,
    title: "Budget efficiency improved",
    detail: "80% of categories stayed under budget in the last cycle."
  }
];

export function InsightsFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>High-level signals powered by transaction analytics.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="flex gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <insight.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{insight.title}</h3>
              <p className="text-sm text-muted-foreground">{insight.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
