ALTER TABLE "Order" DROP COLUMN "mpPreferenceId",
DROP COLUMN "mpPaymentId",
ADD COLUMN "paymentMethod" TEXT;
