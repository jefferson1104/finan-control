"use client";

import { enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/app/_lib/utils";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { dateToLocaleString } from "@/app/_utils/transaction";

interface DatePickerProps {
  value: Date;
  onChange?: SelectSingleEventHandler;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  // Constants
  const dateValue = value
    ? dateToLocaleString(new Date(value), "en-US")
    : dateToLocaleString(new Date(), "en-US");

  // Renders
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? dateValue : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={onChange}
          initialFocus
          locale={enUS}
        />
      </PopoverContent>
    </Popover>
  );
}
