import { Button } from '@new-test/ui';

export default function ImportPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Import data</h1>
        <p className="text-muted-foreground">
          Connect your bank accounts or upload CSV statements to kickstart your
          personal finance workspace.
        </p>
      </header>
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Drag and drop statements or choose a file to import.
        </p>
        <Button variant="default">Choose file</Button>
      </div>
    </section>
  );
}
