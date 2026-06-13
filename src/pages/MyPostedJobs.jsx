import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  IndianRupee,
  CalendarDays,
  Users,
  Eye,
  Edit3,
  Trash2,
  Sparkles,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/jobService";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, jobs]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyJobs();

      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (err) {
      setError("Failed to load your posted jobs.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...jobs];

    if (searchText.trim()) {
      result = result.filter((job) => {
        const title = job.title || "";
        const company = job.company || "";
        const location = job.location || "";

        return (
          title.toLowerCase().includes(searchText.toLowerCase()) ||
          company.toLowerCase().includes(searchText.toLowerCase()) ||
          location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    if (statusFilter !== "ALL") {
      result = result.filter((job) => job.status === statusFilter);
    }

    setFilteredJobs(result);
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

  const handleDeleteJob = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteError("");
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedJobId(null);
    setDeleteError("");
  };

  const confirmDeleteJob = async () => {
    if (!selectedJobId) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await deleteJob(selectedJobId);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJobId)
      );

      setFilteredJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJobId)
      );

      closeDeleteModal();
    } catch (err) {
      setDeleteError(err.response?.data || "Failed to delete job.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const activeJobs = jobs.filter((job) => job.status === "ACTIVE").length;
  const closedJobs = jobs.filter((job) => job.status === "CLOSED").length;

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              Recruiter Panel
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Posted Jobs
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                View and manage all jobs posted by you. Track active jobs,
                applicants, and job details from one place.
              </p>
            </div>

            <Link
              to="/postJob"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <Plus size={18} />
              Post New Job
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            title="Total Jobs"
            value={jobs.length}
            icon={BriefcaseBusiness}
            bg="bg-blue-50"
            color="text-blue-600"
          />

          <StatCard
            title="Active Jobs"
            value={activeJobs}
            icon={Eye}
            bg="bg-green-50"
            color="text-green-600"
          />

          <StatCard
            title="Closed Jobs"
            value={closedJobs}
            icon={Clock3}
            bg="bg-orange-50"
            color="text-orange-600"
          />

          <StatCard
            title="Total Openings"
            value={jobs.reduce((total, job) => total + (job.openings || 0), 0)}
            icon={Users}
            bg="bg-violet-50"
            color="text-violet-600"
          />
        </section>

        {/* Search and Filter */}
        <section className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-blue-100/40 p-5 mb-8">
          <div className="grid lg:grid-cols-[1fr_220px_auto] gap-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
              <Search size={20} className="text-slate-400" />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title, company, or location..."
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
                <option value="ACTIVE">Active</option>
                <option value="CLOSED">Closed</option>
                <option value="PENDING">Pending</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>

            <button
              type="button"
              onClick={fetchMyJobs}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              <Filter size={18} />
              Refresh
            </button>
          </div>
        </section>

        {/* Job List */}
        <section className="space-y-5">
          {loading && (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-6 text-center text-slate-500 font-semibold">
              Loading your posted jobs...
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-[2rem] border border-red-100 p-6 text-center text-red-600 font-semibold">
              {error}
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <BriefcaseBusiness size={30} className="text-blue-600" />
              </div>

              <h2 className="text-xl font-bold text-slate-950">
                No posted jobs found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Start by posting your first job.
              </p>

              <Link
                to="/postJob"
                className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
              >
                <Plus size={17} />
                Post Job
              </Link>
            </div>
          )}

          {!loading &&
            !error &&
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
              >
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness size={30} className="text-blue-600" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                          {job.title}
                        </h2>

                        <span className="px-3 py-1 rounded-full border text-xs font-bold bg-green-50 text-green-700 border-green-100">
                          {job.status || "ACTIVE"}
                        </span>
                      </div>

                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                        <Building2 size={16} />
                        {job.company}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {job.jobType || "Not specified"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <IndianRupee size={14} />
                          {formatSalary(job)}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {job.openings || 1} openings
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(job.createdAt)}
                        </span>
                      </div>

                      {job.skills?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.skills.slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={`/jobDetails/${job.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                    >
                      <Eye size={17} />
                      View
                    </Link>

                    <Link
                      to={`/applicationManagement?jobId=${job.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                    >
                      <Users size={17} />
                      Applicants
                    </Link>

                    <Link
                      to={`/editJob/${job.id}`}
                      className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <Edit3 size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id)}
                      className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {job.description?.length > 180
                      ? job.description.substring(0, 180) + "..."
                      : job.description || "No description added."}
                  </p>
                </div>
              </div>
            ))}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-white shadow-2xl border border-red-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertTriangle size={30} className="text-red-600" />
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleteLoading}
                className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-60"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">
              Delete this job?
            </h2>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete this job posting? This action
              cannot be undone, and candidates will no longer be able to view or
              apply for this job.
            </p>

            {deleteError && (
              <div className="mt-5 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-600">
                {deleteError}
              </div>
            )}

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleteLoading}
                className="flex-1 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteJob}
                disabled={deleteLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition disabled:opacity-60"
              >
                <Trash2 size={17} />
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
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

export default MyPostedJobs;