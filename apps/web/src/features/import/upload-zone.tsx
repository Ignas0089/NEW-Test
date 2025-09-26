import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export function UploadZone() {
  const [filename, setFilename] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    if (file) {
      setFilename(file.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"]
    }
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-muted-foreground/50 p-10 text-center"
    >
      <input {...getInputProps()} />
      <div className="space-y-1">
        <p className="text-base font-medium">
          {isDragActive ? "Drop the file to import" : "Drag & drop a file, or click to browse"}
        </p>
        <p className="text-sm text-muted-foreground">
          Support for CSV or JSON exports from your financial institutions.
        </p>
      </div>
      <Button type="button" variant="outline">
        {filename ? `Selected: ${filename}` : "Choose file"}
      </Button>
    </div>
  );
}
