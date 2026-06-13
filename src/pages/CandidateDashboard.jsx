import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  Bookmark,
  Eye,
  Bell,
  MapPin,
  Clock3,
  CalendarDays,
  TrendingUp,
  UserRound,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getMyApplications, getAllJobs } from "../services/jobService";

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [error, setError] = useState("");
  const userName = localStorage.getItem("userName") || "Candidate";
  useEffect(() => {
    fetchApplications();
    fetchRecommendedJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      setError("");

      const data = await getMyApplications();

      setApplications(data || []);
    } catch (err) {
      setError("Failed to load your applications");
    } finally {
      setLoadingApplications(false);
    }
  };

  const fetchRecommendedJobs = async () => {
    try {
      const data = await getAllJobs();

      setRecommendedJobs(data.content?.slice(0, 3) || []);
    } catch (err) {
      console.log("Recommended jobs error:", err);
    }
  };

  const getStatusStyle = (status) => {
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
      return "Recently applied";
    }

    return `Applied on ${new Date(dateValue).toLocaleDateString()}`;
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

  const stats = [
    {
      title: "Applied Jobs",
      value: applications.length,
      icon: BriefcaseBusiness,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Saved Jobs",
      value: "0",
      icon: Bookmark,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      title: "Profile Views",
      value: "0",
      icon: Eye,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Shortlisted",
      value: applications.filter((app) => app.status === "SHORTLISTED").length,
      icon: CalendarDays,
      bg: "bg-green-50",
      color: "text-green-600",
    },
  ];

  const savedJobs = [];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Top Welcome Section */}
        <section className="grid lg:grid-cols-[1fr_340px] gap-8 mb-8">
          <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">
                    Candidate Dashboard
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome , {userName}
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                  Track your applications, manage your profile, and discover new
                  opportunities that match your skills.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm text-center"
                    to="/jobs"
                  >
                    Find New Jobs
                  </Link>

                  <Link
                    className="px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition text-center"
                    to="/candidateProfile"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                <UserRound size={48} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Profile Strength</h2>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <TrendingUp size={22} className="text-blue-600" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500">
                  Completion
                </span>
                <span className="text-3xl font-extrabold text-blue-600">
                  {applications.length > 0 ? "70%" : "20%"}
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`${applications.length > 0 ? "w-[70%]" : "w-[20%]"
                    } h-full bg-blue-600 rounded-full`}
                />
              </div>

              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                Your profile is updated automatically when you apply for a job.
              </p>
            </div>
          </div>
        </section>

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

        <section className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Left Main Area */}
          <div className="space-y-8">
            {/* Recent Applications */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Recent Applications</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Track your latest job application status.
                  </p>
                </div>

                <Link
                  to="/myApplications"
                  className="flex items-center gap-2 text-sm font-bold text-blue-600"
                >
                  View All
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="space-y-4">
                {loadingApplications && (
                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                    Loading your applications...
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center text-red-600 font-semibold">
                    {error}
                  </div>
                )}

                {!loadingApplications &&
                  !error &&
                  applications.length === 0 && (
                    <div className="rounded-2xl bg-slate-50 border border-gray-100 p-6 text-center">
                      <p className="text-slate-600 font-semibold">
                        You have not applied to any jobs yet.
                      </p>

                      <Link
                        to="/jobs"
                        className="mt-4 inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                      >
                        Browse Jobs
                      </Link>
                    </div>
                  )}

                {!loadingApplications &&
                  !error &&
                  applications.slice(0, 3).map((application) => {
                    const job = application.job;
                    const statusInfo = getStatusStyle(application.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <div
                        key={application.id}
                        className="rounded-[1.4rem] border border-gray-100 bg-slate-50/60 p-4 hover:bg-white hover:shadow-lg hover:shadow-blue-100/40 transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                              <Building2
                                size={25}
                                className="text-blue-600"
                              />
                            </div>

                            <div>
                              <h3 className="font-bold text-lg text-slate-950">
                                {job?.title || "Job Title"}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {job?.company || "Company"}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} />
                                  {job?.location || "Location"}
                                </span>

                                <span className="flex items-center gap-1.5">
                                  <Clock3 size={14} />
                                  {formatDate(application.appliedAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${statusInfo.className}`}
                          >
                            <StatusIcon size={15} />
                            {statusInfo.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Recommended Jobs</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest jobs available on SmartJob.
                  </p>
                </div>

                <Link
                  to="/jobs"
                  className="flex items-center gap-2 text-sm font-bold text-blue-600"
                >
                  Explore More
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                      <BriefcaseBusiness size={24} className="text-blue-600" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-950">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {job.company}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-600" />
                        {job.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <IndianRupee size={16} className="text-green-600" />
                        {formatSalary(job)}
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock3 size={16} className="text-orange-600" />
                        {job.jobType || "Not specified"}
                      </p>
                    </div>

                    <Link
                      to={`/jobDetails/${job.id}`}
                      className="mt-5 w-full py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition text-center block"
                    >
                      View Job
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Notifications</h2>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Bell size={20} className="text-blue-600" />
                </div>
              </div>

              <div className="space-y-4">
                {applications.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-sm font-bold text-slate-950">
                      Application submitted
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Your latest application is under review.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100">
                    <p className="text-sm font-bold text-slate-950">
                      Start applying
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Browse jobs and apply to your first opportunity.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Saved Jobs</h2>

                <Bookmark size={21} className="text-blue-600" />
              </div>

              {savedJobs.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 text-sm text-slate-500">
                  No saved jobs yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {savedJobs.map((job, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-slate-50 border border-gray-100"
                    >
                      <h3 className="font-bold text-slate-950">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {job.company}
                      </p>

                      <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <MapPin size={14} />
                        {job.location}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-5 w-full py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition">
                View Saved Jobs
              </button>
            </div>

            {/* Resume Card */}
            <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <FileText size={24} />
              </div>

              <h2 className="text-xl font-bold">Candidate Profile</h2>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Your profile is created automatically when you apply for a job.
                You can update it anytime.
              </p>

              <Link
                to="/candidateProfile"
                className="mt-6 w-full py-3 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition text-center block"
              >
                View Profile
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default CandidateDashboard;