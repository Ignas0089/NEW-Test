import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockBudgets = [
  { id: 1, name: "Monthly budget", limit: 4200, spend: 3315 },
  { id: 2, name: "Vacation fund", limit: 1800, spend: 900 }
];

export function BudgetsFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budgets</CardTitle>
        <CardDescription>Track how close you are to the goals you set.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockBudgets.map((budget) => {
          const progress = Math.min(100, Math.round((budget.spend / budget.limit) * 100));
          return (
            <div key={budget.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">{budget.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {budget.spend.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD"
                    })}
                    {" "}of
                    {" "}
                    {budget.limit.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD"
                    })}
                  </p>
                </div>
                <div className="text-right text-sm font-medium">{progress}%</div>
              </div>
              <Progress value={progress} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
