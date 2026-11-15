import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import { AlertTriangle, RefreshCw, SearchX } from "lucide-react";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace(",", "");
};

const formatPhp = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val || 0);

export default function RegistrationTable({ items, loading, error, onRetry, onClearFilters }) {
  if (error) {
    return (
      <div className="py-12 px-4 text-center border border-red-200 bg-red-50/50 rounded-lg">
        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm font-medium text-red-800 mb-3">
          Cannot reach the API. Please check if the backend server is running.
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <th className="py-3 px-4">Registration No.</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Participant</th>
            <th className="py-3 px-4">Car</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Fee / Paid</th>
            <th className="py-3 px-4">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm bg-white">
          {loading ? (
            [...Array(5)].map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <td colSpan={8} className="py-4 px-4">
                  <div className="h-5 bg-slate-100 rounded w-full" />
                </td>
              </tr>
            ))
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 px-4 text-center">
                <SearchX className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium mb-3">No registrations match your filters</p>
                <button
                  onClick={onClearFilters}
                  className="px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  Clear filters
                </button>
              </td>
            </tr>
          ) : (
            items.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                  {reg.registrationNumber}
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  {formatDate(reg.registrationDate)}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900">{reg.participantName}</div>
                  <div className="text-xs text-slate-500">{reg.contactNumber} • {reg.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-slate-800">{reg.carMakeModel}</div>
                  <div className="text-xs font-mono text-slate-500">{reg.plateNumber}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">{reg.registrationType}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={reg.status} />
                </td>
                <td className="py-3.5 px-4 text-right font-mono whitespace-nowrap">
                  <span className="text-slate-900 font-medium">{formatPhp(reg.registrationFee)}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span className="text-emerald-700 font-medium">{formatPhp(reg.amountPaid)}</span>
                </td>
                <td className="py-3.5 px-4">
                  <PaymentBadge paymentStatus={reg.paymentStatus} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}