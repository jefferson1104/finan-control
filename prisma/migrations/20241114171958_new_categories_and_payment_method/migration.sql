-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionCategory" ADD VALUE 'CREDIT_CARD';
ALTER TYPE "TransactionCategory" ADD VALUE 'CRYPTO';
ALTER TYPE "TransactionCategory" ADD VALUE 'INVESTMENTS';
ALTER TYPE "TransactionCategory" ADD VALUE 'LOAN';
ALTER TYPE "TransactionCategory" ADD VALUE 'TAXES';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionPaymentMethod" ADD VALUE 'VENMO';
ALTER TYPE "TransactionPaymentMethod" ADD VALUE 'ZELLE';
