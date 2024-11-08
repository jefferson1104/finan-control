import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Education",
  ENTERTAINMENT: "Entertainment",
  FOOD: "Food",
  GROCERIES: "Groceries",
  HEALTH: "Health",
  HOUSING: "Housing",
  INSURANCE: "Insurance",
  INVESTMENTS: "Investments",
  OTHER: "Other",
  SHOPPING: "Shopping",
  TRANSPORTATION: "Transportation",
  TRAVEL: "Travel",
  SALARY: "Salary",
  REFUND: "Refund",
  GIFT: "Gift",
  UTILITY: "Utility",
  TAX: "Tax",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Bank Transfer",
  BANK_SLIP: "Bank Slip",
  CASH: "Cash",
  CREDIT_CARD: "Credit Card",
  DEBIT_CARD: "Debit Card",
  PIX: "Pix",
  PAYPAL: "PayPal",
  ZELLE: "Zelle",
  VENMO: "Venmo",
  APPLE_PAY: "Apple Pay",
  GOOGLE_PAY: "Google Pay",
  SAMSUNG_PAY: "Samsung Pay",
  BITCOIN: "Bitcoin",
  ETHEREUM: "Ethereum",
  LITECOIN: "Litecoin",
  DOGECOIN: "Dogecoin",
  SHIBA_INU: "Shiba Inu",
  SAFEMOON: "SafeMoon",
  OTHER: "Other",
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

export const formatCurrency = (
  amount: number,
  locale: string,
  currency: string,
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
