import { ReactNode } from "react";

interface TransactionPercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

export function TransactionPercentageItem({
  icon,
  title,
  value,
}: TransactionPercentageItemProps) {
  // Renders
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
}
