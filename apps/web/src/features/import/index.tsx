import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadZone } from "./upload-zone";

export function ImportFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import transactions</CardTitle>
        <CardDescription>Upload a CSV or connect to your bank provider.</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadZone />
      </CardContent>
    </Card>
  );
}
