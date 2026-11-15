export default function PaymentBadge({ paymentStatus }) {
  const styles = {
    Unpaid: "bg-red-50 text-red-700 border-red-200",
    Partial: "bg-amber-50 text-amber-800 border-amber-200",
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[paymentStatus] || styles.Unpaid}`}>
      {paymentStatus}
    </span>
  );
}