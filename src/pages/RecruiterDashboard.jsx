import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  Eye,
  UserCheck,
  Plus,
  Building2,
  MapPin,
  Clock3,
  CalendarDays,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText,
  Edit3,
  MoreHorizontal,
  IndianRupee,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyJobs } from "../services/jobService";

const RecruiterDashboard = () => {
  const recruiterName = localStorage.getItem("userName") || "Recruiter";

  const [myJobs, setMyJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoadingJobs(true);
      setError("");

      const data = await getMyJobs();

      setMyJobs(data || []);
    } catch (err) {
      setError("Failed to load recruiter jobs");
    } finally {
      setLoadingJobs(false);
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

  const activeJobs = myJobs.filter((job) => job.status === "ACTIVE").length;

  const stats = [
    {
      title: "Posted Jobs",
      value: myJobs.length,
      icon: BriefcaseBusiness,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Users,
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
      value: "0",
      icon: UserCheck,
      bg: "bg-green-50",
      color: "text-green-600",
    },
  ];

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
                    Recruiter Dashboard
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome , {recruiterName}!
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                  Manage your job posts, review applicants, track hiring
                  progress, and find the best candidates for your company.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                    to="/postJob"
                  >
                    <Plus size={18} />
                    Post New Job
                  </Link>

                  <Link
                    className="px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition text-center"
                    to="/applicationManagement"
                  >
                    View Applicants
                  </Link>

                  <Link
                    className="px-6 py-3 rounded-xl bg-white border border-gray-100 text-slate-700 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition text-center"
                    to="/myPostedJobs"
                  >
                    My Posted Jobs
                  </Link>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                <Building2 size={50} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Hiring Performance */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Hiring Progress</h2>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <TrendingUp size={22} className="text-blue-600" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500">
                  Jobs Published
                </span>
                <span className="text-3xl font-extrabold text-blue-600">
                  {myJobs.length}
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`${myJobs.length > 0 ? "w-[70%]" : "w-[10%]"
                    } h-full bg-blue-600 rounded-full`}
                />
              </div>

              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                Your posted jobs are visible to candidates on the job listings
                page.
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
            {/* Recent Job Posts */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Recent Job Posts</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage your latest published jobs.
                  </p>
                </div>

                <Link
                  to="/myPostedJobs"
                  className="flex items-center gap-2 text-sm font-bold text-blue-600"
                >
                  Manage All
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="space-y-4">
                {loadingJobs && (
                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                    Loading your posted jobs...
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center text-red-600 font-semibold">
                    {error}
                  </div>
                )}

                {!loadingJobs && !error && myJobs.length === 0 && (
                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-6 text-center">
                    <p className="text-slate-600 font-semibold">
                      You have not posted any jobs yet.
                    </p>

                    <Link
                      to="/postJob"
                      className="mt-4 inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                    >
                      Post Your First Job
                    </Link>
                  </div>
                )}

                {!loadingJobs &&
                  !error &&
                  myJobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="rounded-[1.5rem] border border-gray-100 bg-slate-50/60 p-5 hover:bg-white hover:shadow-lg hover:shadow-blue-100/40 transition"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                            <BriefcaseBusiness
                              size={25}
                              className="text-blue-600"
                            />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-bold text-lg text-slate-950">
                                {job.title}
                              </h3>

                              <span className="px-3 py-1 rounded-full border text-xs font-bold bg-green-50 text-green-700 border-green-100">
                                {job.status || "ACTIVE"}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
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
                                <CalendarDays size={14} />
                                {formatDate(job.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            to={`/jobDetails/${job.id}`}
                            className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-blue-600 hover:bg-blue-50 transition"
                          >
                            View Job
                          </Link>

                          <Link
                            to={`/applicationManagement?jobId=${job.id}`}
                            className="px-4 py-2 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                          >
                            View Applicants
                          </Link>

                          <Link
                            to={`/editJob/${job.id}`}
                            className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-500 hover:text-blue-600 transition"
                          >
                            <Edit3 size={17} />
                          </Link>

                          <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-500 hover:text-blue-600 transition">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Latest Applicants Placeholder */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Latest Applicants</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review candidates who applied recently.
                  </p>
                </div>

                <Link
                  to="/applicationManagement"
                  className="flex items-center gap-2 text-sm font-bold text-blue-600"
                >
                  View All
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-gray-100 p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <UserRound size={28} className="text-blue-600" />
                </div>

                <p className="text-slate-600 font-semibold">
                  Applicant data will be shown in Application Management.
                </p>

                <Link
                  to="/applicationManagement"
                  className="mt-4 inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                >
                  Open Applications
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <h2 className="text-xl font-bold">Quick Actions</h2>

              <div className="mt-5 space-y-3">
                <Link
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  to="/postJob"
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <Plus size={18} />
                    Post New Job
                  </span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  to="/myPostedJobs"
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <BriefcaseBusiness size={18} />
                    Manage Posted Jobs
                  </span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  to="/applicationManagement"
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <Users size={18} />
                    View Applications
                  </span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  to="/companyProfile"
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <FileText size={18} />
                    My Company Profile
                  </span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Company Card */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Building2 size={27} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Recruiter Account</h2>
                  <p className="text-sm text-slate-500">
                    {localStorage.getItem("userEmail") || "recruiter@email.com"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-500">
                      Company Profile
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      Basic
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[35%] h-full bg-blue-600 rounded-full" />
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  Company profile and verification will be added in the next
                  advanced phase.
                </p>
              </div>

              <Link
                to="/companyProfile"
                className="mt-6 w-full py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition text-center block"
              >
                Update Company
              </Link>
            </div>

            {/* Hiring Summary */}
            <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <UserCheck size={24} />
              </div>

              <h2 className="text-xl font-bold">Hiring Summary</h2>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                You have posted {myJobs.length} jobs. Applications will be
                managed from the Application Management page.
              </p>

              <Link
                to="/applicationManagement"
                className="mt-6 w-full py-3 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition text-center block"
              >
                View Applications
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default RecruiterDashboard;