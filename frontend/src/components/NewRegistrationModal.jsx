import { useState } from "react";
import { X, PlusCircle, AlertCircle } from "lucide-react";

const TYPE_FEES = {
  Exhibitor: 1500,
  Competitor: 2500,
  VIP: 5000,
};

export default function NewRegistrationModal({ isOpen, onClose, onCreate, onSuccess }) {
  const [form, setForm] = useState({
    participantName: "",
    contactNumber: "",
    email: "",
    address: "",
    carMakeModel: "",
    plateNumber: "",
    registrationType: "Exhibitor",
    amountPaid: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on that field as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setGeneralError("");

    try {
      const payload = {
        ...form,
        registrationFee: TYPE_FEES[form.registrationType] || 1500,
        amountPaid: Number(form.amountPaid) || 0,
      };
      await onCreate(payload);
      setForm({
        participantName: "",
        contactNumber: "",
        email: "",
        address: "",
        carMakeModel: "",
        plateNumber: "",
        registrationType: "Exhibitor",
        amountPaid: 0,
      });
      onSuccess();
      onClose();
    } catch (err) {
      if (err.status === 400 && err.errors) {
        setFieldErrors(err.errors);
      } else if (err.status === 409) {
        setFieldErrors({ plateNumber: [err.message || "Duplicate plate number."] });
      } else {
        setGeneralError(err.message || "Something went wrong while saving.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderError = (field) =>
    fieldErrors[field] ? (
      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {fieldErrors[field][0]}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
          <h3 className="text-lg font-bold text-slate-900">New Car Registration</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {generalError && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {generalError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Participant Name *</label>
            <input
              type="text"
              name="participantName"
              value={form.participantName}
              onChange={handleChange}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError("participantName")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number *</label>
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="09171234567"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {renderError("contactNumber")}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@example.com"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {renderError("email")}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Rizal St., Sorsogon City"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError("address")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Car Make / Model *</label>
              <input
                type="text"
                name="carMakeModel"
                value={form.carMakeModel}
                onChange={handleChange}
                placeholder="Toyota Supra MK4"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {renderError("carMakeModel")}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Plate Number *</label>
              <input
                type="text"
                name="plateNumber"
                value={form.plateNumber}
                onChange={handleChange}
                placeholder="ABC 1234"
                className="w-full px-3 py-2 text-sm font-mono uppercase border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {renderError("plateNumber")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Registration Type</label>
              <select
                name="registrationType"
                value={form.registrationType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Exhibitor">Exhibitor (₱1,500)</option>
                <option value="Competitor">Competitor (₱2,500)</option>
                <option value="VIP">VIP (₱5,000)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initial Amount Paid (₱)</label>
              <input
                type="number"
                name="amountPaid"
                min="0"
                max={TYPE_FEES[form.registrationType]}
                value={form.amountPaid}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {renderError("amountPaid")}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              {submitting ? "Saving..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}