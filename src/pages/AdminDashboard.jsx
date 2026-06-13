import React, { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock3,
  Activity,
  AlertCircle,
  UserCheck,
  UserX,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getPendingRecruiters,
  getAllRecruiters,
  getAllCandidates,
  getAllUsersAdmin,
  getAllJobsAdmin,
} from "../services/jobService";

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const usersData = await getAllUsersAdmin();
      const candidatesData = await getAllCandidates();
      const recruitersData = await getAllRecruiters();
      const pendingRecruitersData = await getPendingRecruiters();
      const jobsData = await getAllJobsAdmin();

      setAllUsers(usersData || []);
      setCandidates(candidatesData || []);
      setRecruiters(recruitersData || []);
      setPendingRecruiters(pendingRecruitersData || []);
      setJobs(jobsData || []);
    } catch (error) {
      setError("Failed to load admin dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const verifiedRecruiters = recruiters.filter(
    (item) => item.recruiterStatus === "VERIFIED"
  ).length;

  const rejectedRecruiters = recruiters.filter(
    (item) => item.recruiterStatus === "REJECTED"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: allUsers.length,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
      link: "/admin/users",
    },
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseBusiness,
      bg: "bg-violet-50",
      color: "text-violet-600",
      link: "/admin/jobs",
    },
    {
      title: "Recruiters",
      value: recruiters.length,
      icon: Building2,
      bg: "bg-orange-50",
      color: "text-orange-600",
      link: "/admin/recruiters",
    },
    {
      title: "Pending Reviews",
      value: pendingRecruiters.length,
      icon: Clock3,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      link: "/admin/recruiters/pending",
    },
  ];

  const managementCards = [
    {
      title: "Manage Users",
      desc: "View all candidates, recruiters, and admin accounts.",
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
      link: "/admin/users",
      button: "Open Users",
    },
    {
      title: "Manage Recruiters",
      desc: "View recruiter companies and their verification status.",
      icon: Building2,
      bg: "bg-orange-50",
      color: "text-orange-600",
      link: "/admin/recruiters",
      button: "Open Recruiters",
    },
    {
      title: "Pending Recruiters",
      desc: "Verify or reject companies waiting for approval.",
      icon: Clock3,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      link: "/admin/recruiters/pending",
      button: "Review Requests",
    },
    {
      title: "Monitor Jobs",
      desc: "View all jobs posted by recruiters on the platform.",
      icon: BriefcaseBusiness,
      bg: "bg-violet-50",
      color: "text-violet-600",
      link: "/admin/jobs",
      button: "Open Jobs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="grid lg:grid-cols-[1fr_340px] gap-8 mb-8">
          <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-50 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">
                    Admin Dashboard
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome back, Admin!
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                  Monitor platform activity, verify recruiters, and navigate to
                  admin management sections from one clean overview.
                </p>

                {loading && (
                  <p className="mt-4 text-sm font-semibold text-blue-600">
                    Loading dashboard data...
                  </p>
                )}

                {error && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600">
                    <AlertCircle size={17} />
                    {error}
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/admin/recruiters/pending"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                  >
                    <ShieldCheck size={18} />
                    Review Recruiters
                  </Link>

                  <Link
                    to="/admin/users"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                  >
                    <Users size={18} />
                    View Users
                  </Link>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck size={52} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Platform Summary */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Platform Summary</h2>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <TrendingUp size={22} className="text-blue-600" />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Candidates
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {candidates.length}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${
                        allUsers.length
                          ? Math.min(
                              (candidates.length / allUsers.length) * 100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Verified Recruiters
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {verifiedRecruiters}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{
                      width: `${
                        recruiters.length
                          ? Math.min(
                              (verifiedRecruiters / recruiters.length) * 100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Pending Recruiters
                  </span>
                  <span className="text-sm font-bold text-yellow-600">
                    {pendingRecruiters.length}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{
                      width: `${
                        recruiters.length
                          ? Math.min(
                              (pendingRecruiters.length / recruiters.length) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.link}
                key={index}
                className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6 group"
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
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition`}
                  >
                    <Icon size={26} className={item.color} />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Management Sections */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          {managementCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.link}
                key={index}
                className="group bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 hover:-translate-y-1 transition"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={26} className={item.color} />
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold">{item.title}</h2>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={22}
                    className="text-slate-400 group-hover:text-blue-600 transition"
                  />
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                  {item.button}
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Bottom Overview */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
              <UserCheck size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-extrabold">Verified Recruiters</h3>
            <p className="mt-2 text-3xl font-extrabold text-green-600">
              {verifiedRecruiters}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Companies approved to post jobs.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center mb-5">
              <Clock3 size={24} className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-extrabold">Pending Reviews</h3>
            <p className="mt-2 text-3xl font-extrabold text-yellow-600">
              {pendingRecruiters.length}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Recruiters waiting for verification.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
              <UserX size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-extrabold">Rejected Recruiters</h3>
            <p className="mt-2 text-3xl font-extrabold text-red-600">
              {rejectedRecruiters}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Companies rejected by admin.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;