import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockCategories = [
  { id: 1, name: "Housing", budget: 1800, spend: 1720 },
  { id: 2, name: "Food", budget: 600, spend: 420 },
  { id: 3, name: "Subscriptions", budget: 120, spend: 140 }
];

export function CategoriesFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Organize spending and connect automation rules.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {mockCategories.map((category) => {
          const remaining = category.budget - category.spend;
          const status = remaining >= 0 ? "On track" : "Over budget";
          return (
            <div key={category.id} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{category.name}</h3>
                <Badge variant={remaining >= 0 ? "outline" : "destructive"}>{status}</Badge>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>
                  <dt>Budget</dt>
                  <dd className="font-medium text-foreground">
                    {category.budget.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD"
                    })}
                  </dd>
                </div>
                <div>
                  <dt>Spent</dt>
                  <dd className="font-medium text-foreground">
                    {category.spend.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD"
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
