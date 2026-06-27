export async function confirmRazorpayPayment(paymentId: string, orderId: string, amountInr: number) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return { ok: false, message: "Payment provider is not configured." };

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store"
  });
  const payment = await response.json().catch(() => null);
  if (!response.ok || !payment?.id) return { ok: false, message: "Payment provider confirmation failed." };

  const providerOrderId = String(payment.order_id || "");
  const providerAmount = Number(payment.amount || 0);
  const providerStatus = String(payment.status || "");
  const expectedAmount = Math.round(amountInr * 100);

  if (providerOrderId !== orderId) return { ok: false, message: "Payment order mismatch." };
  if (providerAmount !== expectedAmount) return { ok: false, message: "Payment amount mismatch." };
  if (!["captured", "authorized"].includes(providerStatus)) return { ok: false, message: "Payment is not confirmed yet." };

  return { ok: true, message: "Provider payment confirmed." };
}
