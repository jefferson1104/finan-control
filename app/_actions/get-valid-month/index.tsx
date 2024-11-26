import { redirect } from "next/navigation";
import { isMatch } from "date-fns";

export const getValidMonth = async (month: string) => {
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`);
  }
};
