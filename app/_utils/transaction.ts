import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  CREDIT_CARD: "Credit Card",
  CRYPTO: "Crypto",
  EDUCATION: "Education",
  ENTERTAINMENT: "Entertainment",
  FOOD: "Food",
  HEALTH: "Health",
  HOUSING: "Housing",
  INVESTMENTS: "Investments",
  LOAN: "Loan",
  OTHER: "Other",
  SALARY: "Salary",
  TAXES: "Taxes",
  TRANSPORTATION: "Transportation",
  TRAVEL: "Travel",
  UTILITY: "Utility",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_SLIP: "Bank Slip",
  BANK_TRANSFER: "Bank Transfer",
  CASH: "Cash",
  CREDIT_CARD: "Credit Card",
  DEBIT_CARD: "Debit Card",
  OTHER: "Other",
  PIX: "Pix",
  VENMO: "Venmo",
  ZELLE: "Zelle",
};

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.VENMO]: "venmo.svg",
  [TransactionPaymentMethod.ZELLE]: "zelle.svg",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { label: "Expense", value: TransactionType.EXPENSE },
  { label: "Deposit", value: TransactionType.DEPOSIT },
  { label: "Investment", value: TransactionType.INVESTMENT },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
    value: TransactionPaymentMethod.BANK_TRANSFER,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
    value: TransactionPaymentMethod.BANK_SLIP,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
    value: TransactionPaymentMethod.CASH,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
    value: TransactionPaymentMethod.CREDIT_CARD,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
    value: TransactionPaymentMethod.DEBIT_CARD,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
    value: TransactionPaymentMethod.PIX,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
    value: TransactionPaymentMethod.OTHER,
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
    value: TransactionCategory.EDUCATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
    value: TransactionCategory.ENTERTAINMENT,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
    value: TransactionCategory.FOOD,
  },

  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
    value: TransactionCategory.HEALTH,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
    value: TransactionCategory.HOUSING,
  },

  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
    value: TransactionCategory.OTHER,
  },

  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
    value: TransactionCategory.TRANSPORTATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRAVEL],
    value: TransactionCategory.TRAVEL,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
    value: TransactionCategory.SALARY,
  },

  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITY],
    value: TransactionCategory.UTILITY,
  },
];

export const dateToLocaleString = (date: Date, locale: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const shortDateToLocaleString = (date: Date, locale: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

interface TransactionCurrencyProps {
  amount: number;
  locale?: "pt-BR" | "en-US";
  currency?: "BRL" | "USD";
}
export const formatCurrency = ({
  amount,
  locale = "en-US",
  currency = "USD",
}: TransactionCurrencyProps) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
