import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockTransactions = [
  { id: 1, date: "2024-02-12", merchant: "Acme Groceries", amount: -82.45 },
  { id: 2, date: "2024-02-14", merchant: "Payroll", amount: 3250.0 },
  { id: 3, date: "2024-02-15", merchant: "Coffee Corner", amount: -5.5 }
];

export function TransactionsFeature() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Review and categorize your latest imports.</CardDescription>
        </div>
        <Button size="sm">Add manual entry</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <table className="min-w-full divide-y">
            <thead className="bg-muted/60 text-sm uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Merchant</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{transaction.date}</td>
                  <td className="px-4 py-3">{transaction.merchant}</td>
                  <td
                    className="px-4 py-3 text-right font-mono"
                    data-type={transaction.amount < 0 ? "debit" : "credit"}
                  >
                    {transaction.amount.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
