import { Search, RotateCcw } from "lucide-react";

export default function RegistrationFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onClear,
}) {
  const hasFilters = search.trim() !== "" || type !== "All" || status !== "All";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <h2 className="text-lg font-semibold text-slate-800">Registrations</h2>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search by participant name */}
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search participant name..."
            aria-label="Search participant name"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Registration Type Filter */}
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by registration type"
          className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Type: All</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
          className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Status: All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Clear / Reset Button */}
        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear filters
        </button>
      </div>
    </div>
  );
}