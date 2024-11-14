import { Info } from "lucide-react";

export function EmptyState() {
  // Renders
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-6">
      <Info />
      <h2 className="text-lg font-bold">No transactions found</h2>
      <p className="text-sm font-medium text-muted-foreground">
        Create a transaction for you to view the data.
      </p>
    </div>
  );
}
