import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getPendingRecruiters,
  updateRecruiterStatus,
} from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";
import {
  Clock3,
  Building2,
  CheckCircle2,
  XCircle,
  Search,
  MapPin,
  Mail,
  UserRound,
  Globe,
  Sparkles,
  RefreshCcw,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

const AdminPendingRecruiters = () => {
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPendingRecruiters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPendingRecruiters();
      setPendingRecruiters(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load pending recruiters."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRecruiters();
  }, []);

  const handleStatusUpdate = async (companyProfileId, status) => {
    try {
      setUpdatingId(companyProfileId);
      setError("");
      setSuccess("");
      await updateRecruiterStatus(companyProfileId, status);
      setSuccess(`Recruiter status updated to ${status}.`);
      await fetchPendingRecruiters();
    } catch (error) {
      setError(getErrorMessage(error, "Failed to update recruiter status."));
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRecruiters = useMemo(() => {
    return pendingRecruiters.filter((company) => {
      const keyword = search.toLowerCase();

      return (
        company.companyName?.toLowerCase().includes(keyword) ||
        company.location?.toLowerCase().includes(keyword) ||
        company.recruiter?.name?.toLowerCase().includes(keyword) ||
        company.recruiter?.email?.toLowerCase().includes(keyword)
      );
    });
  }, [pendingRecruiters, search]);

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden mb-8">
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-yellow-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 mb-5">
                <Sparkles size={16} className="text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  Recruiter Verification Queue
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Pending Recruiter Requests
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                Review newly registered recruiters, verify genuine companies,
                and reject invalid or suspicious company profiles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="px-5 py-3 rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-extrabold flex items-center gap-2">
                <Clock3 size={18} />
                {pendingRecruiters.length} Pending
              </div>

              <button
                onClick={fetchPendingRecruiters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
              >
                <RefreshCcw size={18} />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {(error || success) && (
          <div
            className={`mb-8 flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold ${
              error
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-green-100 bg-green-50 text-green-700"
            }`}
          >
            {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {error || success}
          </div>
        )}

        {/* Top Summary */}
        <section className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Pending Reviews
                </p>
                <h3 className="mt-2 text-3xl font-extrabold">
                  {pendingRecruiters.length}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Clock3 size={26} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Verification Action
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">Verify</h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <ShieldCheck size={26} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Invalid Profiles
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">Reject</h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <XCircle size={26} className="text-red-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-5 sm:p-6 mb-8">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search pending recruiter by company, recruiter, email or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-semibold"
            />
          </div>
        </section>

        {/* Pending Recruiter Cards */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold">
                Recruiters Waiting for Approval
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredRecruiters.length} of{" "}
                {pendingRecruiters.length} pending requests
              </p>
            </div>

            {loading && (
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                Loading...
              </span>
            )}
          </div>

          {filteredRecruiters.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} className="text-green-600" />
              </div>

              <h3 className="text-xl font-bold">No pending recruiters found</h3>

              <p className="mt-2 text-sm text-slate-500">
                All recruiter requests are already reviewed or your search has
                no result.
              </p>
            </div>
          ) : (
            <div className="grid xl:grid-cols-2 gap-5">
              {filteredRecruiters.map((company) => (
                <div
                  key={company.id}
                  className="group rounded-[1.7rem] border border-yellow-100 bg-yellow-50/40 p-5 hover:bg-white hover:shadow-xl hover:shadow-yellow-100/50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center shrink-0">
                        <Building2 size={25} className="text-yellow-700" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-extrabold text-lg text-slate-950">
                            {company.companyName}
                          </h3>

                          <span className="px-3 py-1 rounded-full border text-xs font-bold bg-yellow-50 text-yellow-700 border-yellow-100">
                            {company.recruiterStatus || "PENDING"}
                          </span>
                        </div>

                        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                          <UserRound size={14} />
                          {company.recruiter?.name || "Recruiter"}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <Mail size={14} />
                          {company.recruiter?.email || "No email"}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin size={14} />
                          {company.location || "No location"}
                        </p>

                        {company.companyWebsite && (
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                            <Globe size={14} />
                            {company.companyWebsite}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {company.companyDescription && (
                    <div className="mt-5 rounded-2xl bg-white/70 border border-yellow-100 p-4">
                      <p className="text-xs font-bold text-slate-500 mb-1">
                        Company Description
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {company.companyDescription}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        handleStatusUpdate(company.id, "VERIFIED")
                      }
                      disabled={updatingId === company.id}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={18} />
                      {updatingId === company.id ? "Updating..." : "Verify Company"}
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(company.id, "REJECTED")
                      }
                      disabled={updatingId === company.id}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <XCircle size={18} />
                      {updatingId === company.id ? "Updating..." : "Reject Request"}
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-2xl bg-orange-50 border border-orange-100 p-3">
                    <AlertCircle
                      size={17}
                      className="text-orange-600 shrink-0 mt-0.5"
                    />
                    <p className="text-xs font-semibold text-orange-700 leading-relaxed">
                      Verify only if company details look genuine. Rejected
                      recruiters cannot post jobs until status is changed again.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPendingRecruiters;