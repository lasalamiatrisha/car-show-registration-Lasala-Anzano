import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageSize, totalCount, totalPages, loading, onPageChange, onPageSizeChange }) {
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-2">
      {/* Page buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={loading || page <= 1}
          aria-label="Previous page"
          className="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const p = idx + 1;
          const isActive = p === page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              disabled={loading}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              } disabled:opacity-50`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={loading || page >= totalPages}
          aria-label="Next page"
          className="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Summary and Page Size */}
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>
          Showing <strong className="text-slate-900">{startItem}–{endItem}</strong> of{" "}
          <strong className="text-slate-900">{totalCount}</strong>
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-slate-500">Per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            disabled={loading}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}