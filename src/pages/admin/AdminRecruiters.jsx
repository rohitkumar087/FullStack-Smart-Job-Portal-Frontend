import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAllRecruiters,
  updateRecruiterStatus,
} from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";
import {
  Building2,
  Search,
  MapPin,
  Globe,
  Mail,
  UserRound,
  CheckCircle2,
  XCircle,
  Clock3,
  Sparkles,
  Filter,
  RefreshCcw,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllRecruiters();
      setRecruiters(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load recruiters."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleStatusUpdate = async (companyProfileId, status) => {
    try {
      setUpdatingId(companyProfileId);
      setError("");
      setSuccess("");
      await updateRecruiterStatus(companyProfileId, status);
      setSuccess(`Recruiter status updated to ${status}.`);
      await fetchRecruiters();
    } catch (error) {
      console.error("Error updating recruiter status:", error);
      setError(getErrorMessage(error, "Failed to update recruiter status."));
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRecruiters = useMemo(() => {
    return recruiters.filter((company) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        company.companyName?.toLowerCase().includes(keyword) ||
        company.companyLocation?.toLowerCase().includes(keyword) ||
        company.recruiter?.name?.toLowerCase().includes(keyword) ||
        company.recruiter?.email?.toLowerCase().includes(keyword);

      const matchesStatus =
        selectedStatus === "ALL" ||
        company.recruiterStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [recruiters, search, selectedStatus]);

  const totalVerified = recruiters.filter(
    (item) => item.recruiterStatus === "VERIFIED"
  ).length;

  const totalPending = recruiters.filter(
    (item) => item.recruiterStatus === "PENDING"
  ).length;

  const totalRejected = recruiters.filter(
    (item) => item.recruiterStatus === "REJECTED"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "VERIFIED") {
      return {
        badge: "bg-green-50 text-green-700 border-green-100",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        Icon: CheckCircle2,
      };
    }

    if (status === "REJECTED") {
      return {
        badge: "bg-red-50 text-red-700 border-red-100",
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        Icon: XCircle,
      };
    }

    return {
      badge: "bg-yellow-50 text-yellow-700 border-yellow-100",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      Icon: Clock3,
    };
  };

  const statCards = [
    {
      title: "Total Recruiters",
      value: recruiters.length,
      icon: Building2,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Verified",
      value: totalVerified,
      icon: ShieldCheck,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: totalPending,
      icon: Clock3,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      title: "Rejected",
      value: totalRejected,
      icon: XCircle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden mb-8">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-5">
                <Sparkles size={16} className="text-orange-600" />
                <span className="text-sm font-bold text-orange-600">
                  Admin Recruiter Management
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Manage Recruiter Companies
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                Review recruiter company profiles, verify genuine companies,
                reject invalid requests, and monitor platform recruiters.
              </p>
            </div>

            <button
              onClick={fetchRecruiters}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
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

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon size={26} className={item.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-5 sm:p-6 mb-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search company, recruiter, email or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-semibold"
              />
            </div>

            <div className="relative">
              <Filter
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-bold appearance-none"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </section>

        {/* Recruiter List */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold">All Recruiters</h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredRecruiters.length} of {recruiters.length}{" "}
                companies
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
              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                <Building2 size={34} className="text-slate-400" />
              </div>

              <h3 className="text-xl font-bold">No recruiters found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try changing search keyword or selected status.
              </p>
            </div>
          ) : (
            <div className="grid xl:grid-cols-2 gap-5">
              {filteredRecruiters.map((company) => {
                const statusStyle = getStatusStyle(company.recruiterStatus);
                const StatusIcon = statusStyle.Icon;

                return (
                  <div
                    key={company.id}
                    className="group rounded-[1.7rem] border border-gray-100 bg-slate-50/70 p-5 hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                      <div className="flex gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${statusStyle.iconBg} flex items-center justify-center shrink-0`}
                        >
                          <StatusIcon
                            size={25}
                            className={statusStyle.iconColor}
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-extrabold text-lg text-slate-950">
                              {company.companyName}
                            </h3>

                            <span
                              className={`px-3 py-1 rounded-full border text-xs font-bold ${statusStyle.badge}`}
                            >
                              {company.recruiterStatus}
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
                            {company.companyLocation || "No location"}
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
                      <p className="mt-5 text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {company.companyDescription}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          handleStatusUpdate(company.id, "VERIFIED")
                        }
                        disabled={company.recruiterStatus === "VERIFIED" || updatingId === company.id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle2 size={17} />
                        {updatingId === company.id ? "Updating..." : "Verify"}
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(company.id, "REJECTED")
                        }
                        disabled={company.recruiterStatus === "REJECTED" || updatingId === company.id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircle size={17} />
                        {updatingId === company.id ? "Updating..." : "Reject"}
                      </button>

                      {company.recruiterStatus !== "PENDING" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(company.id, "PENDING")
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-50 text-yellow-700 border border-yellow-100 text-sm font-bold hover:bg-yellow-100 transition"
                        >
                          <Clock3 size={17} />
                          Mark Pending
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminRecruiters;