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
  Sparkles,
  ChevronDown,
  Users,
  RefreshCcw,
  Layers3,
  ArrowUpRight,
  ClipboardCheck,
  SlidersHorizontal,
  CircleCheckBig,
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

      await updateApplicationStatus(applicationId, status);

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
          dot: "bg-green-500",
        };

      case "REJECTED":
        return {
          label: "Rejected",
          color: "bg-red-50 text-red-700 border-red-100",
          icon: XCircle,
          dot: "bg-red-500",
        };

      case "PENDING":
      default:
        return {
          label: "Pending",
          color: "bg-yellow-50 text-yellow-700 border-yellow-100",
          icon: AlertCircle,
          dot: "bg-yellow-500",
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

  const selectedJob = jobs.find(
    (job) => String(job.id) === String(selectedJobId)
  );

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-[8%] w-[560px] h-[560px] rounded-full bg-blue-500/[0.07] blur-[180px]" />

        <div className="absolute top-[35%] -right-64 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.07] blur-[180px]" />

        <div className="absolute bottom-[-250px] left-[30%] w-[500px] h-[500px] rounded-full bg-cyan-400/[0.05] blur-[180px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Hero */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_75px_rgba(37,99,235,0.08)]
            p-6 sm:p-8 lg:p-10
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-blue-500/[0.08] blur-3xl" />

            <div className="absolute -bottom-28 left-[35%] w-72 h-72 rounded-full bg-indigo-500/[0.06] blur-3xl" />

            <div className="hidden lg:block absolute right-[27%] top-10 w-20 h-20 rounded-[2rem] border border-blue-200/50 rotate-[22deg]" />

            <div className="hidden lg:block absolute right-[40%] bottom-10 w-12 h-12 rounded-2xl bg-indigo-500/[0.06] border border-indigo-100 rotate-[28deg]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                <Sparkles size={16} className="text-blue-600" />

                <span className="text-xs sm:text-sm font-black text-blue-600">
                  Recruiter Workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Find the right people
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  for the right opportunity.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                Review applications, explore candidate profiles, and manage
                your hiring decisions from one streamlined workspace.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Users size={17} className="text-blue-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Candidate Management
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <ClipboardCheck size={17} className="text-indigo-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Hiring Pipeline
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Visual */}
            <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">
              <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

              <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 shadow-2xl shadow-blue-500/25 rotate-[-7deg] transition-transform duration-500 hover:rotate-0" />

              <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-[2rem] bg-white border border-white shadow-xl flex items-center justify-center">
                <Users size={45} className="text-blue-600" />

                <div className="absolute -right-3 -bottom-3 w-10 h-10 rounded-2xl bg-slate-950 border-4 border-white flex items-center justify-center">
                  <CircleCheckBig size={17} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Selected Job */}
          <div className="relative mt-7 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <BriefcaseBusiness size={22} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                    Currently Managing
                  </p>

                  <p className="mt-1 font-black text-slate-900">
                    {selectedJob?.title || "No Job Selected"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  selectedJobId && fetchApplicants(selectedJobId)
                }
                className="
                  group inline-flex items-center justify-center gap-2
                  px-5 py-3
                  rounded-2xl
                  bg-white border border-slate-200
                  text-sm font-black text-slate-700
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:text-blue-600
                  hover:shadow-lg
                "
              >
                <RefreshCcw
                  size={17}
                  className="transition-transform duration-500 group-hover:rotate-180"
                />

                Refresh Applications
              </button>
            </div>
          </div>
        </section>

        {/* Alerts */}
        {error && (
          <div className="mb-7 rounded-[1.7rem] bg-red-50/90 border border-red-100 p-5 text-red-600">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>

              <div>
                <h3 className="font-black">Something went wrong</h3>

                <p className="mt-1 text-sm font-medium">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-7 rounded-[1.7rem] bg-green-50/90 border border-green-100 p-5 text-green-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h3 className="font-black">Application Updated</h3>

                <p className="mt-1 text-sm font-medium">
                  {success}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7 sm:mb-9">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-[1.5rem] sm:rounded-[1.8rem]
                  bg-white/85 backdrop-blur-xl
                  border border-white
                  shadow-[0_15px_45px_rgba(15,23,42,0.05)]
                  p-4 sm:p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl hover:shadow-blue-500/[0.08]
                "
              >
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/[0.03] blur-2xl" />

                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-2xl sm:text-3xl font-black">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`
                      w-11 h-11 sm:w-14 sm:h-14
                      rounded-2xl
                      ${item.bg}
                      flex items-center justify-center
                      transition-transform duration-300
                      group-hover:scale-110
                    `}
                  >
                    <Icon
                      size={24}
                      className={item.color}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_15px_50px_rgba(37,99,235,0.07)]
            p-4 sm:p-6
            mb-7 sm:mb-9
          "
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
              <SlidersHorizontal size={20} className="text-blue-600" />
            </div>

            <div>
              <h2 className="font-black text-lg">
                Filter Applications
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                Search and organize candidates quickly.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_220px_240px] gap-4">

            {/* Search */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-100 focus-within:bg-white focus-within:border-blue-200 transition">
              <Search size={20} className="text-slate-400" />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search candidate, email or job..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  w-full appearance-none
                  bg-slate-50 rounded-2xl
                  px-4 py-4 pr-11
                  border border-slate-100
                  outline-none
                  text-sm font-bold text-slate-700
                  focus:bg-white focus:border-blue-200
                  transition
                "
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            {/* Job */}
            <div className="relative">
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="
                  w-full appearance-none
                  bg-slate-50 rounded-2xl
                  px-4 py-4 pr-11
                  border border-slate-100
                  outline-none
                  text-sm font-bold text-slate-700
                  focus:bg-white focus:border-blue-200
                  transition
                "
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="grid xl:grid-cols-[minmax(0,1fr)_340px] gap-7 lg:gap-8">

          {/* Applications */}
          <div className="space-y-5">

            {loadingApplications && (
              <LoadingCard />
            )}

            {!loadingApplications && jobs.length === 0 && (
              <EmptyState
                icon={BriefcaseBusiness}
                title="No jobs posted yet"
                description="Post a job first to start receiving applications from candidates."
              />
            )}

            {!loadingApplications &&
              jobs.length > 0 &&
              filteredApplications.length === 0 && (
                <EmptyState
                  icon={Users}
                  title="No applications found"
                  description="Try selecting another job or adjusting your search and filters."
                />
              )}

            {!loadingApplications &&
              filteredApplications.map((application) => {
                const statusInfo = getStatusInfo(application.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <article
                    key={application.id}
                    className="
                      group relative overflow-hidden
                      rounded-[2rem]
                      bg-white/90 backdrop-blur-xl
                      border border-white
                      shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                      p-5 sm:p-6 lg:p-7
                      transition-all duration-300
                      hover:shadow-[0_22px_65px_rgba(37,99,235,0.10)]
                    "
                  >
                    <div className="absolute -top-24 -right-20 w-48 h-48 rounded-full bg-blue-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">

                      {/* Candidate Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                        <div className="flex gap-4 min-w-0">

                          {/* Avatar */}
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-[1.4rem] bg-blue-500/10 rotate-6" />

                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[1.4rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
                              <UserRound
                                size={30}
                                className="text-blue-600"
                              />
                            </div>
                          </div>

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-xl sm:text-2xl font-black tracking-tight truncate">
                                {application.candidate?.name || "Candidate"}
                              </h2>

                              <span
                                className={`
                                  inline-flex items-center gap-2
                                  px-3 py-1.5
                                  rounded-full border
                                  text-[11px] font-black
                                  ${statusInfo.color}
                                `}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}
                                />

                                <StatusIcon size={14} />

                                {statusInfo.label}
                              </span>
                            </div>

                            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-blue-600">
                              <BriefcaseBusiness size={16} />

                              <span className="truncate">
                                Applied for {application.job?.title}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Resume */}
                        <button
                          type="button"
                          onClick={() =>
                            handleViewResume(application.id)
                          }
                          className="
                            group/resume
                            inline-flex items-center justify-center gap-2
                            px-5 py-3
                            rounded-2xl
                            bg-slate-950 text-white
                            text-sm font-black
                            shadow-lg shadow-slate-900/10
                            transition-all duration-300
                            hover:bg-blue-600
                            hover:-translate-y-1
                            shrink-0
                          "
                        >
                          <FileText size={17} />

                          View Resume

                          <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover/resume:translate-x-0.5 group-hover/resume:-translate-y-0.5"
                          />
                        </button>
                      </div>

                      {/* Contact Details */}
                      <div className="mt-6 grid sm:grid-cols-2 gap-3">

                        <InfoChip
                          icon={Mail}
                          value={
                            application.candidate?.email ||
                            "Email not found"
                          }
                        />

                        <InfoChip
                          icon={Phone}
                          value="Phone saved in candidate profile"
                        />

                        <InfoChip
                          icon={MapPin}
                          value={
                            application.currentLocation ||
                            "Location not added"
                          }
                        />

                        <InfoChip
                          icon={Clock3}
                          value={`Applied ${formatDate(
                            application.appliedAt
                          )}`}
                        />
                      </div>

                      {/* Professional Details */}
                      <div className="mt-5 grid sm:grid-cols-3 gap-4">

                        <DetailCard
                          icon={GraduationCap}
                          title="Experience"
                          value={
                            application.experience || "Not added"
                          }
                          iconClass="text-blue-600"
                        />

                        <DetailCard
                          icon={BadgeDollarSign}
                          title="Expected Salary"
                          value={formatSalary(
                            application.expectedSalary
                          )}
                          iconClass="text-green-600"
                        />

                        <DetailCard
                          icon={FileText}
                          title="Resume"
                          value={
                            application.resumeUrl
                              ? "Uploaded"
                              : "Not uploaded"
                          }
                          iconClass="text-orange-600"
                        />
                      </div>

                      {/* Skills */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Layers3
                            size={16}
                            className="text-blue-600"
                          />

                          <p className="text-xs font-black tracking-wide text-slate-500 uppercase">
                            Skills
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {application.skills?.length > 0 ? (
                            application.skills.map(
                              (skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="
                                    px-3 py-1.5
                                    rounded-full
                                    bg-blue-50
                                    border border-blue-100
                                    text-xs font-bold
                                    text-blue-600
                                    transition-transform
                                    hover:-translate-y-0.5
                                  "
                                >
                                  {skill}
                                </span>
                              )
                            )
                          ) : (
                            <span className="text-sm text-slate-500">
                              No skills added.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cover Letter */}
                      {application.coverLetter && (
                        <div className="mt-6 relative overflow-hidden rounded-[1.5rem] bg-slate-50/80 border border-slate-100 p-5">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />

                          <div className="pl-2">
                            <p className="text-sm font-black text-slate-900">
                              Cover Letter
                            </p>

                            <p className="mt-2 text-sm text-slate-600 leading-7">
                              {application.coverLetter}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-6 pt-5 border-t border-slate-100">

                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                          <div>
                            <p className="text-xs font-bold text-slate-400">
                              CURRENT APPLICATION STATUS
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${statusInfo.dot}`}
                              />

                              <span className="text-sm font-black text-slate-700">
                                {application.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:flex gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(
                                  application.id,
                                  "SHORTLISTED"
                                )
                              }
                              disabled={
                                application.status === "SHORTLISTED"
                              }
                              className="
                                inline-flex items-center justify-center gap-2
                                px-4 sm:px-5 py-3
                                rounded-2xl
                                bg-green-600 text-white
                                text-sm font-black
                                transition-all
                                hover:bg-green-700
                                hover:-translate-y-0.5
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                disabled:hover:translate-y-0
                              "
                            >
                              <CheckCircle2 size={17} />

                              Shortlist
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(
                                  application.id,
                                  "REJECTED"
                                )
                              }
                              disabled={
                                application.status === "REJECTED"
                              }
                              className="
                                inline-flex items-center justify-center gap-2
                                px-4 sm:px-5 py-3
                                rounded-2xl
                                bg-red-600 text-white
                                text-sm font-black
                                transition-all
                                hover:bg-red-700
                                hover:-translate-y-0.5
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                disabled:hover:translate-y-0
                              "
                            >
                              <XCircle size={17} />

                              Reject
                            </button>

                            <button
                              type="button"
                              className="
                                col-span-2 sm:col-span-1
                                inline-flex items-center justify-center gap-2
                                px-4 sm:px-5 py-3
                                rounded-2xl
                                bg-white border border-slate-200
                                text-slate-700
                                text-sm font-black
                                transition-all
                                hover:border-blue-200
                                hover:text-blue-600
                                hover:bg-blue-50/40
                              "
                            >
                              <Eye size={17} />

                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden xl:block space-y-6">

            {/* Hiring Overview */}
            <div
              className="
                relative overflow-hidden
                rounded-[2rem]
                bg-white/90 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(37,99,235,0.08)]
                p-6
              "
            >
              <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-blue-500/[0.08] blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">
                    Hiring Overview
                  </h2>

                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Users
                      size={21}
                      className="text-blue-600"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-[1.7rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-5 text-white shadow-xl shadow-blue-500/15">
                  <p className="text-xs font-bold text-blue-100">
                    ACTIVE JOB
                  </p>

                  <h3 className="mt-2 text-lg font-black leading-snug">
                    {selectedJob?.title || "No Job Selected"}
                  </h3>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm text-blue-100">
                      Applications
                    </span>

                    <span className="text-2xl font-black">
                      {applications.length}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <SidebarStat
                    label="Pending Review"
                    value={
                      applications.filter(
                        (app) => app.status === "PENDING"
                      ).length
                    }
                    dot="bg-yellow-500"
                  />

                  <SidebarStat
                    label="Shortlisted"
                    value={
                      applications.filter(
                        (app) => app.status === "SHORTLISTED"
                      ).length
                    }
                    dot="bg-green-500"
                  />

                  <SidebarStat
                    label="Rejected"
                    value={
                      applications.filter(
                        (app) => app.status === "REJECTED"
                      ).length
                    }
                    dot="bg-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Status Guide */}
            <div
              className="
                relative overflow-hidden
                rounded-[2rem]
                bg-slate-950
                text-white
                shadow-xl shadow-slate-300/50
                p-6
              "
            >
              <div className="absolute -top-24 -right-16 w-56 h-56 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <ClipboardCheck size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black">
                      Hiring Pipeline
                    </h2>

                    <p className="text-xs text-slate-400">
                      Application status guide
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">

                  <StatusGuide
                    icon={AlertCircle}
                    iconClass="text-yellow-300 bg-yellow-500/15"
                    title="Pending"
                    description="New application waiting for recruiter review."
                  />

                  <StatusGuide
                    icon={CheckCircle2}
                    iconClass="text-green-300 bg-green-500/15"
                    title="Shortlisted"
                    description="Candidate selected for the next hiring stage."
                  />

                  <StatusGuide
                    icon={XCircle}
                    iconClass="text-red-300 bg-red-500/15"
                    title="Rejected"
                    description="Candidate is not moving forward in the process."
                  />
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div
      className="
        rounded-[2rem]
        bg-white/90 backdrop-blur-xl
        border border-white
        shadow-[0_15px_50px_rgba(37,99,235,0.06)]
        p-10
        text-center
      "
    >
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-blue-500/15 blur-xl animate-pulse" />

        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white animate-pulse">
          <Users size={28} />
        </div>
      </div>

      <h2 className="mt-6 text-xl font-black">
        Loading applications
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Preparing candidate information...
      </p>
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        rounded-[2rem]
        bg-white/90 backdrop-blur-xl
        border border-white
        shadow-[0_15px_50px_rgba(37,99,235,0.06)]
        p-8 sm:p-12
        text-center
      "
    >
      <div className="w-16 h-16 mx-auto rounded-[1.5rem] bg-blue-50 border border-blue-100 flex items-center justify-center">
        <Icon size={30} className="text-blue-600" />
      </div>

      <h2 className="mt-6 text-xl sm:text-2xl font-black">
        {title}
      </h2>

      <p className="mt-3 max-w-md mx-auto text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const InfoChip = ({
  icon: Icon,
  value,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 border border-slate-100 px-4 py-3">
      <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-blue-600" />
      </div>

      <p className="min-w-0 text-xs sm:text-sm font-semibold text-slate-600 break-all">
        {value}
      </p>
    </div>
  );
};

const DetailCard = ({
  icon: Icon,
  title,
  value,
  iconClass,
}) => {
  return (
    <div
      className="
        group rounded-[1.5rem]
        bg-slate-50/80
        border border-slate-100
        p-4
        transition-all duration-300
        hover:bg-white
        hover:border-blue-100
        hover:shadow-lg hover:shadow-blue-500/[0.04]
      "
    >
      <div className="flex items-center gap-2">
        <Icon
          size={17}
          className={iconClass}
        />

        <p className="text-xs font-black text-slate-700">
          {title}
        </p>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-500 break-words">
        {value}
      </p>
    </div>
  );
};

const SidebarStat = ({
  label,
  value,
  dot,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />

        <span className="text-sm font-semibold text-slate-600">
          {label}
        </span>
      </div>

      <span className="text-sm font-black text-slate-900">
        {value}
      </span>
    </div>
  );
};

const StatusGuide = ({
  icon: Icon,
  iconClass,
  title,
  description,
}) => {
  return (
    <div className="flex gap-3">
      <div
        className={`
          w-10 h-10 rounded-xl
          flex items-center justify-center
          shrink-0
          ${iconClass}
        `}
      >
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-black">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ApplicationsManagement;

