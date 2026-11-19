import { useEffect, useState } from "react";
import { X, Car, User, CreditCard, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

const formatPhp = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val || 0);

const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export default function RegistrationDetailsModal({ registrationId, onClose, fetchById }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!registrationId) return;
    let active = true;
    setLoading(true);
    setError(null);

    fetchById(registrationId)
      .then((data) => {
        if (active) setDetails(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Could not load details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [registrationId, fetchById]);

  if (!registrationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Registration Details
            </span>
            <h3 className="text-lg font-bold font-mono text-slate-900">
              {details ? details.registrationNumber : "Loading..."}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-slate-100 rounded w-1/2" />
              <div className="h-20 bg-slate-100 rounded" />
              <div className="h-20 bg-slate-100 rounded" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-600 text-center py-6">{error}</p>
          ) : details ? (
            <div className="space-y-5 text-sm">
              {/* Badges & Date */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <StatusBadge status={details.status} />
                  <PaymentBadge paymentStatus={details.paymentStatus} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(details.registrationDate)}
                </div>
              </div>

              {/* Participant Info */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Participant Information
                </h4>
                <div className="bg-slate-50 rounded-lg p-3.5 space-y-1.5 border border-slate-100">
                  <p className="font-semibold text-slate-900 text-base">{details.participantName}</p>
                  <p className="text-slate-600">{details.contactNumber} • {details.email}</p>
                  <p className="text-slate-500 text-xs">{details.address}</p>
                </div>
              </div>

              {/* Vehicle Info */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" /> Vehicle & Category
                </h4>
                <div className="bg-slate-50 rounded-lg p-3.5 grid grid-cols-2 gap-3 border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block">Car Make / Model</span>
                    <span className="font-medium text-slate-900">{details.carMakeModel}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Plate Number</span>
                    <span className="font-mono font-semibold text-slate-900">{details.plateNumber}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-slate-400 block">Entry Category</span>
                    <span className="font-medium text-blue-700">{details.registrationType}</span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Payment Breakdown
                </h4>
                <div className="bg-slate-50 rounded-lg p-3.5 space-y-2 border border-slate-100 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Registration Fee</span>
                    <span className="font-medium text-slate-900">{formatPhp(details.registrationFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Amount Paid</span>
                    <span className="font-medium text-emerald-700">{formatPhp(details.amountPaid)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-semibold">
                    <span className="text-slate-700 font-sans">Balance Due</span>
                    <span className="text-amber-700">
                      {formatPhp(Math.max(0, details.registrationFee - details.amountPaid))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}