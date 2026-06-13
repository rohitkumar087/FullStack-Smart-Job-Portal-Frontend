import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Sparkles,
  Eye,
  IndianRupee,
  Send,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/jobService";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyApplications();

      setApplications(data || []);
      setFilteredApplications(data || []);
    } catch (err) {
      setError("Failed to load your applications.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...applications];

    if (searchText.trim()) {
      result = result.filter((application) => {
        const jobTitle = application.job?.title || "";
        const company = application.job?.company || "";
        const location = application.job?.location || "";

        return (
          jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          company.toLowerCase().includes(searchText.toLowerCase()) ||
          location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    if (statusFilter !== "ALL") {
      result = result.filter(
        (application) => application.status === statusFilter
      );
    }

    setFilteredApplications(result);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return {
          label: "Shortlisted",
          icon: CheckCircle2,
          className: "bg-green-50 text-green-700 border-green-100",
        };

      case "REJECTED":
        return {
          label: "Rejected",
          icon: XCircle,
          className: "bg-red-50 text-red-700 border-red-100",
        };

      case "PENDING":
      default:
        return {
          label: "Pending",
          icon: AlertCircle,
          className: "bg-yellow-50 text-yellow-700 border-yellow-100",
        };
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently";
    }

    return new Date(dateValue).toLocaleDateString();
  };

  const formatSalary = (job) => {
    if (job?.minSalary && job?.maxSalary) {
      return `₹${job.minSalary} - ₹${job.maxSalary}`;
    }

    if (job?.minSalary) {
      return `₹${job.minSalary}+`;
    }

    if (job?.maxSalary) {
      return `Up to ₹${job.maxSalary}`;
    }

    return "Not disclosed";
  };

  const pendingCount = applications.filter(
    (app) => app.status === "PENDING"
  ).length;

  const shortlistedCount = applications.filter(
    (app) => app.status === "SHORTLISTED"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("ALL");
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              Candidate Panel
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Applications
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                Track all jobs you have applied for and check your latest
                application status.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <Send size={18} />
              Apply More Jobs
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            title="Total Applied"
            value={applications.length}
            icon={BriefcaseBusiness}
            bg="bg-blue-50"
            color="text-blue-600"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={AlertCircle}
            bg="bg-yellow-50"
            color="text-yellow-600"
          />

          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={CheckCircle2}
            bg="bg-green-50"
            color="text-green-600"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            icon={XCircle}
            bg="bg-red-50"
            color="text-red-600"
          />
        </section>

        {/* Search + Filter */}
        <section className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-blue-100/40 p-5 mb-8">
          <div className="grid lg:grid-cols-[1fr_220px_auto] gap-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by job title, company, or location..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm font-semibold text-slate-700"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
            >
              <Filter size={18} />
              Clear
            </button>
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-5">
          {loading && (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 text-center text-slate-500 font-semibold">
              Loading your applications...
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-[2rem] border border-red-100 p-8 text-center text-red-600 font-semibold">
              {error}
            </div>
          )}

          {!loading && !error && filteredApplications.length === 0 && (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <BriefcaseBusiness size={30} className="text-blue-600" />
              </div>

              <h2 className="text-xl font-bold text-slate-950">
                No applications found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You have not applied to any matching jobs yet.
              </p>

              <Link
                to="/jobs"
                className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
              >
                Browse Jobs
              </Link>
            </div>
          )}

          {!loading &&
            !error &&
            filteredApplications.map((application) => {
              const job = application.job;
              const statusInfo = getStatusInfo(application.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={application.id}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Building2 size={30} className="text-blue-600" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                            {job?.title || "Job Title"}
                          </h2>

                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${statusInfo.className}`}
                          >
                            <StatusIcon size={15} />
                            {statusInfo.label}
                          </span>
                        </div>

                        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                          <Building2 size={16} />
                          {job?.company || "Company"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            {job?.location || "Location"}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock3 size={14} />
                            {job?.jobType || "Not specified"}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <IndianRupee size={14} />
                            {formatSalary(job)}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            Applied on {formatDate(application.appliedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/jobDetails/${job?.id}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                      >
                        <Eye size={17} />
                        View Job
                      </Link>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    <InfoCard
                      title="Experience"
                      value={application.experience || "Not added"}
                      icon={Clock3}
                      color="text-blue-600"
                    />

                    <InfoCard
                      title="Expected Salary"
                      value={
                        application.expectedSalary
                          ? `₹${application.expectedSalary}`
                          : "Not disclosed"
                      }
                      icon={IndianRupee}
                      color="text-green-600"
                    />

                    <InfoCard
                      title="Resume"
                      value={application.resumeUrl ? "Uploaded" : "Not uploaded"}
                      icon={FileText}
                      color="text-orange-600"
                    />
                  </div>

                  {/* Skills */}
                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-900 mb-3">
                      Skills Submitted
                    </p>

                    {application.skills?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {application.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        No skills submitted.
                      </p>
                    )}
                  </div>

                  {/* Cover Letter */}
                  {application.coverLetter && (
                    <div className="mt-5 rounded-2xl bg-slate-50 border border-gray-100 p-4">
                      <p className="text-sm font-bold text-slate-900">
                        Cover Letter
                      </p>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {application.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, bg, color }) => {
  return (
    <div className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold">{value}</h3>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}
        >
          <Icon size={26} className={color} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <Icon size={17} className={color} />
        {title}
      </div>

      <p className="mt-2 text-sm text-slate-500">{value}</p>
    </div>
  );
};

export default MyApplications;