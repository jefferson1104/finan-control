"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

import { upsertTransaction } from "@/app/_actions/upsert-transaction";

import {
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/app/_utils/transaction";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { MoneyInput } from "@/app/_components/money-input";
import { DatePicker } from "@/app/_components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  amount: z
    .number({ required_error: "Amount is required" })
    .positive({ message: "Amount must be positive" }),
  type: z.nativeEnum(TransactionType, { required_error: "Type is required" }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "Category is required",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "Payment method is required",
  }),
  date: z.date({ required_error: "Date is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface TransactionFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: FormSchema;
  transactionId?: string;
}

export function TransactionFormDialog({
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
}: TransactionFormDialogProps) {
  // Hooks
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      amount: 0,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.CASH,
      date: new Date(),
    },
  });

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Constants
  const isUpdate = Boolean(transactionId);

  // Methods
  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      await upsertTransaction({ ...data, id: transactionId });
      setIsOpen(false);
      form.reset();
      toast.success(
        `${isUpdate ? "Updated" : "Created"} transaction successfully.`,
      );
    } catch (error) {
      console.error("Failed to update/create transaction", error);
      toast.error("Failed to update/create transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  // Renders
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          {isUpdate ? "Update" : "Create"} Transaction
        </DialogHeader>
        <DialogDescription>Enter the information below</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Type transaction name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Type transaction value"
                      value={field.value}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a transaction category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isLoading} type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                {isUpdate ? "Update" : isLoading ? "Loading..." : "Create"}
                {isLoading && (
                  <LoaderCircle className="animate-spin text-white" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
