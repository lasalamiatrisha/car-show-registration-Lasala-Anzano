import { useState, useEffect, useCallback } from "react";
import { Car, Plus } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import Pagination from "../components/Pagination";
import NewRegistrationModal from "../components/NewRegistrationModal";
import RegistrationDetailsModal from "../components/RegistrationDetailsModal";

// Switch between "sample-data" and "registrationsApi"
import {
  getRegistrations,
  getSummary,
  getRegistrationById,
  createRegistration,
} from "../api/sample-data";

export default function RegistrationsPage() {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Paging
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchSummaryData = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const fetchRegistrationsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRegistrations({
        participantName: debouncedSearch,
        type,
        status,
        page,
        pageSize,
      });
      setItems(data.items);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Error loading registrations");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, type, status, page, pageSize]);

  useEffect(() => {
    fetchSummaryData();
  }, [fetchSummaryData]);

  useEffect(() => {
    fetchRegistrationsData();
  }, [fetchRegistrationsData]);

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };
  const handleTypeChange = (val) => {
    setType(val);
    setPage(1);
  };
  const handleStatusChange = (val) => {
    setStatus(val);
    setPage(1);
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };
  const handleClearFilters = () => {
    setSearch("");
    setType("All");
    setStatus("All");
    setPage(1);
  };

  const handleRegistrationCreated = () => {
    setPage(1);
    fetchSummaryData();
    fetchRegistrationsData();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Car Show 2027</h1>
              <p className="text-xs text-slate-500">AutoVista Events • Registration Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
              Sorsogon City Coliseum
            </span>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              New Registration
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <KpiCards summary={summary} loading={summaryLoading} />

        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <RegistrationFilters
            search={search}
            onSearchChange={handleSearchChange}
            type={type}
            onTypeChange={handleTypeChange}
            status={status}
            onStatusChange={handleStatusChange}
            onClear={handleClearFilters}
          />

          <RegistrationTable
            items={items}
            loading={loading}
            error={error}
            onRetry={fetchRegistrationsData}
            onClearFilters={handleClearFilters}
            onSelectRow={setSelectedId}
          />

          {!error && (
            <Pagination
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              totalPages={totalPages}
              loading={loading}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </section>
      </main>

      {/* Modals */}
      <NewRegistrationModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreate={createRegistration}
        onSuccess={handleRegistrationCreated}
      />

      <RegistrationDetailsModal
        registrationId={selectedId}
        onClose={() => setSelectedId(null)}
        fetchById={getRegistrationById}
      />
    </div>
  );
}