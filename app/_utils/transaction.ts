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
