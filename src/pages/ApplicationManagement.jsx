import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  BriefcaseBusiness,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Clock3,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  GraduationCap,
  BadgeDollarSign,
  Download,
  Sparkles,
  ChevronDown,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import {
  getMyJobs,
  getApplicantsByJob,
  updateApplicationStatus,
  viewResume,
} from "../services/jobService";

const ApplicationsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applications, setApplications] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchParams] = useSearchParams();
  const jobIdFromUrl = searchParams.get("jobId");

  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      fetchApplicants(selectedJobId);
    }
  }, [selectedJobId]);

  const fetchRecruiterJobs = async () => {
    try {
      setLoadingJobs(true);
      setError("");

      const data = await getMyJobs();

      setJobs(data || []);

      if (data && data.length > 0) {
        if (jobIdFromUrl) {
          setSelectedJobId(jobIdFromUrl);
        } else {
          setSelectedJobId(data[0].id);
        }
      }
    } catch (err) {
      setError("Failed to load your jobs.");
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      setLoadingApplications(true);
      setError("");

      const data = await getApplicantsByJob(jobId);

      setApplications(data || []);
    } catch (err) {
      setError(err.response?.data || "Failed to load applicants.");
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      setError("");
      setSuccess("");

      const result = await updateApplicationStatus(applicationId, status);

      setSuccess(`Application marked as ${status}.`);

      if (selectedJobId) {
        fetchApplicants(selectedJobId);
      }
    } catch (err) {
      setError(err.response?.data || "Failed to update status.");
    }
  };

  const handleViewResume = async (applicationId) => {
    try {
      const fileBlob = await viewResume(applicationId);

      const pdfBlob = new Blob([fileBlob], {
        type: "application/pdf",
      });

      const fileURL = window.URL.createObjectURL(pdfBlob);
      window.open(fileURL, "_blank");
    } catch (err) {
      alert("Failed to open resume.");
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return {
          label: "Shortlisted",
          color: "bg-green-50 text-green-700 border-green-100",
          icon: CheckCircle2,
        };

      case "REJECTED":
        return {
          label: "Rejected",
          color: "bg-red-50 text-red-700 border-red-100",
          icon: XCircle,
        };

      case "PENDING":
      default:
        return {
          label: "Pending",
          color: "bg-yellow-50 text-yellow-700 border-yellow-100",
          icon: AlertCircle,
        };
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently";
    }

    return new Date(dateValue).toLocaleDateString();
  };

  const formatSalary = (salary) => {
    if (!salary) {
      return "Not disclosed";
    }

    return `₹${salary}`;
  };

  const filteredApplications = applications.filter((application) => {
    const candidateName = application.candidate?.name || "";
    const candidateEmail = application.candidate?.email || "";
    const jobTitle = application.job?.title || "";

    const matchesSearch =
      candidateName.toLowerCase().includes(searchText.toLowerCase()) ||
      candidateEmail.toLowerCase().includes(searchText.toLowerCase()) ||
      jobTitle.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: applications.filter((app) => app.status === "PENDING").length,
      icon: AlertCircle,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      title: "Shortlisted",
      value: applications.filter((app) => app.status === "SHORTLISTED").length,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Rejected",
      value: applications.filter((app) => app.status === "REJECTED").length,
      icon: XCircle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  const selectedJob = jobs.find((job) => String(job.id) === String(selectedJobId));
  const selectedApplication = filteredApplications[0];

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
                Manage Applications
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                Select one of your posted jobs, review candidates, and update
                application status as Pending, Shortlisted, or Rejected.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-sm font-semibold text-slate-500">
                Selected Job
              </p>
              <p className="mt-1 text-lg font-extrabold text-blue-600">
                {selectedJob?.title || "No Job Selected"}
              </p>
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl bg-green-50 border border-green-100 px-5 py-4 text-sm font-semibold text-green-700">
            {success}
          </div>
        )}

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((item, index) => {
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

        {/* Search and Filters */}
        <section className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-blue-100/40 p-5 mb-8">
          <div className="grid lg:grid-cols-[1fr_220px_220px_auto] gap-4">
            {/* Search */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by candidate name, email, or job role..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Status Filter */}
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

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Job Filter */}
            <div className="relative">
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm font-semibold text-slate-700"
              >
                {loadingJobs && <option>Loading Jobs...</option>}

                {!loadingJobs && jobs.length === 0 && (
                  <option value="">No Jobs Found</option>
                )}

                {!loadingJobs &&
                  jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={() => selectedJobId && fetchApplicants(selectedJobId)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              <Filter size={18} />
              Refresh
            </button>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Applications List */}
          <div className="space-y-5">
            {loadingApplications && (
              <div className="bg-white rounded-[2rem] border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                Loading applications...
              </div>
            )}

            {!loadingApplications && jobs.length === 0 && (
              <div className="bg-white rounded-[2rem] border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                You have not posted any jobs yet.
              </div>
            )}

            {!loadingApplications &&
              jobs.length > 0 &&
              filteredApplications.length === 0 && (
                <div className="bg-white rounded-[2rem] border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                  No applications found for this job.
                </div>
              )}

            {!loadingApplications &&
              filteredApplications.map((application) => {
                const statusInfo = getStatusInfo(application.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={application.id}
                    className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                      {/* Candidate Info */}
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                          <UserRound size={30} className="text-blue-600" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                              {application.candidate?.name || "Candidate"}
                            </h2>

                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${statusInfo.color}`}
                            >
                              <StatusIcon size={15} />
                              {statusInfo.label}
                            </span>
                          </div>

                          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                            <BriefcaseBusiness size={16} />
                            Applied for {application.job?.title}
                          </p>

                          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-slate-500">
                            <p className="flex items-center gap-2">
                              <Mail size={16} className="text-slate-400" />
                              {application.candidate?.email || "Email not found"}
                            </p>

                            <p className="flex items-center gap-2">
                              <Phone size={16} className="text-slate-400" />
                              Phone saved in candidate profile
                            </p>

                            <p className="flex items-center gap-2">
                              <MapPin size={16} className="text-slate-400" />
                              {application.currentLocation || "Not added"}
                            </p>

                            <p className="flex items-center gap-2">
                              <Clock3 size={16} className="text-slate-400" />
                              Applied {formatDate(application.appliedAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Resume Button */}
                      <button
                        type="button"
                        onClick={() => handleViewResume(application.id)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition shrink-0"
                      >
                        <FileText size={17} />
                        View Resume
                      </button>
                    </div>

                    {/* Professional Details */}
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <GraduationCap size={17} className="text-blue-600" />
                          Experience
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {application.experience || "Not added"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <BadgeDollarSign
                            size={17}
                            className="text-green-600"
                          />
                          Expected Salary
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {formatSalary(application.expectedSalary)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <FileText size={17} className="text-orange-600" />
                          Resume
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {application.resumeUrl ? "Uploaded" : "Not uploaded"}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {application.skills?.length > 0 ? (
                        application.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          No skills added.
                        </span>
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

                    {/* Actions */}
                    <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-sm text-slate-500">
                        Backend status value:{" "}
                        <span className="font-bold text-slate-900">
                          {application.status}
                        </span>
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(application.id, "SHORTLISTED")
                          }
                          disabled={application.status === "SHORTLISTED"}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <CheckCircle2 size={17} />
                          Shortlist
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(application.id, "REJECTED")
                          }
                          disabled={application.status === "REJECTED"}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <XCircle size={17} />
                          Reject
                        </button>

                        <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-100 bg-white text-slate-700 text-sm font-bold hover:bg-slate-50 transition">
                          <Eye size={17} />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Candidate Preview */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Candidate Preview</h2>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <UserRound size={20} className="text-blue-600" />
                </div>
              </div>

              {selectedApplication ? (
                <>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-[1.7rem] bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <UserRound size={38} className="text-blue-600" />
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold">
                      {selectedApplication.candidate?.name || "Candidate"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedApplication.job?.title}
                    </p>

                    <div
                      className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${getStatusInfo(selectedApplication.status).color
                        }`}
                    >
                      {React.createElement(
                        getStatusInfo(selectedApplication.status).icon,
                        { size: 15 }
                      )}
                      {getStatusInfo(selectedApplication.status).label}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail size={17} className="text-blue-600" />
                      {selectedApplication.candidate?.email || "Not found"}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <MapPin size={17} className="text-blue-600" />
                      {selectedApplication.currentLocation || "Not added"}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <GraduationCap size={17} className="text-blue-600" />
                      {selectedApplication.experience || "Not added"}
                    </div>
                  </div>

                  <button className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition">
                    <Download size={17} />
                    Download Resume
                  </button>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  Select a job with applications to see candidate preview.
                </p>
              )}
            </div>

            {/* Status Guide */}
            <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 text-white">
              <h2 className="text-xl font-bold">Application Status</h2>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <AlertCircle size={18} className="text-yellow-300" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">PENDING</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Candidate applied but recruiter has not reviewed yet.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-green-300" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">SHORTLISTED</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Candidate is selected for the next hiring round.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                    <XCircle size={18} className="text-red-300" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">REJECTED</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Candidate is rejected for this job application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ApplicationsManagement;