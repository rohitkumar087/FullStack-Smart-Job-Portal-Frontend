
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Code2,
  Palette,
  BarChart3,
  BadgeDollarSign,
  Building2,
  Users,
  ShieldCheck,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
  Clock3,
  IndianRupee,
  UserRound,
  FileText,
  Send,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs } from "../services/jobService";

const Home = () => {
  const navigate = useNavigate();

  const [latestJobs, setLatestJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const data = await getAllJobs();
      setLatestJobs(data.content?.slice(0, 3) || []);
    } catch (error) {
      console.log("Latest jobs fetch error:", error);
    }
  };

  const handleSearch = () => {
    navigate("/jobs", {
      state: {
        keyword,
        location,
      },
    });
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

  const categories = [
    {
      title: "Development",
      jobs: "Backend, Frontend, Full Stack",
      icon: Code2,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Design",
      jobs: "UI/UX, Product Design",
      icon: Palette,
      bg: "bg-rose-50",
      color: "text-rose-600",
    },
    {
      title: "Marketing",
      jobs: "SEO, Growth, Digital",
      icon: BarChart3,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      title: "Sales",
      jobs: "B2B, Inside Sales, Revenue",
      icon: BadgeDollarSign,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Job Openings",
    },
    {
      number: "5K+",
      label: "Companies",
    },
    {
      number: "20K+",
      label: "Candidates",
    },
    {
      number: "100%",
      label: "Trusted Platform",
    },
  ];

  const steps = [
    {
      title: "Create Profile",
      description:
        "Candidates can build a profile once and use it while applying for multiple jobs.",
      icon: UserRound,
    },
    {
      title: "Apply Smartly",
      description:
        "Search jobs with filters and apply using resume, skills, and cover letter.",
      icon: Send,
    },
    {
      title: "Track Status",
      description:
        "Track application status like Pending, Shortlisted, and Rejected from dashboard.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fbff] text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-32 -right-32 hidden sm:block w-[520px] h-[520px] bg-blue-100/60 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 -left-40 hidden lg:block w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 border border-blue-100 shadow-sm mb-5 sm:mb-7">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  Find jobs faster with SmartJob
                </span>
              </div>

              <h1 className="text-[2.45rem] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight">
                Find Your Dream Job
                <span className="block mt-1 sm:mt-2">
                  With <span className="text-blue-600">SmartJob</span>
                </span>
              </h1>

              <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-lg text-slate-600 leading-relaxed">
                Discover thousands of job opportunities with the information you
                need. Build your future today with a smart and trusted job
                portal.
              </p>

              {/* Search Box */}
              <div className="mt-7 sm:mt-9 bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-100/50 border border-slate-100 p-2.5 sm:p-3">

                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-2.5 sm:gap-3">

                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-transparent focus-within:border-blue-100 focus-within:bg-white transition">
                    <Search size={19} className="text-slate-400 shrink-0" />

                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Job title, keywords..."
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-transparent focus-within:border-blue-100 focus-within:bg-white transition">
                    <MapPin size={19} className="text-slate-400 shrink-0" />

                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location..."
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full md:w-auto px-7 py-3.5 rounded-xl sm:rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition"
                  >
                    Search Jobs
                  </button>

                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:flex gap-3">

                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 active:scale-[0.98] transition"
                >
                  Browse Jobs
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98] transition"
                >
                  Join SmartJob
                </Link>

              </div>

              {/* Stats */}
              <div className="mt-7 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">

                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-100 px-4 py-4 sm:p-5 shadow-sm"
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-blue-600">
                      {item.number}
                    </h3>

                    <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            {/* Right Hero Image */}
            <div className="relative hidden lg:flex w-full justify-end">

              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full blur-2xl" />

              <div className="relative w-full max-w-[620px] h-[520px] bg-white rounded-[3rem] border border-white shadow-2xl shadow-blue-200/50 overflow-hidden">

                <img
                  src="/hero-image-2.jpg"
                  alt="Job search illustration"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-100/20" />

                <div className="absolute top-7 right-7 w-16 h-16 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white flex items-center justify-center">
                  <Search size={28} className="text-blue-600" />
                </div>

                <div className="absolute left-7 bottom-7 bg-white/95 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-4 w-64">
                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <BriefcaseBusiness size={21} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        Smart Hiring
                      </p>

                      <p className="text-xs text-slate-500">
                        Apply, track, and grow
                      </p>
                    </div>

                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-green-700">
                    <CheckCircle2 size={15} />
                    Role based job portal
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Popular Job Categories
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Explore jobs from the most active categories.
            </p>
          </div>

          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            Explore more
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                to="/jobs"
                key={index}
                className="group bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-300"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 sm:mb-5`}
                >
                  <Icon size={22} className={item.color} />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.jobs}
                </p>
              </Link>
            );
          })}

        </div>

        <Link
          to="/jobs"
          className="mt-5 sm:hidden w-full inline-flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm"
        >
          Explore more
          <ArrowRight size={17} />
        </Link>

      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Jobs
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Latest opportunities posted by recruiters.
            </p>
          </div>

          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            View all jobs
            <ArrowRight size={18} />
          </Link>

        </div>

        {latestJobs.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 p-8 text-center text-slate-500 font-semibold">
            No jobs available right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

            {latestJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 p-5 sm:p-6"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Building2 size={24} className="text-blue-600" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] sm:text-xs font-bold">
                    {job.status || "ACTIVE"}
                  </span>

                </div>

                <h3 className="mt-5 text-lg sm:text-xl font-extrabold text-slate-950 line-clamp-1">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                  {job.company}
                </p>

                <div className="mt-5 space-y-2.5 text-sm text-slate-600">

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={16} className="text-orange-600 shrink-0" />
                    {job.jobType || "Not specified"}
                  </p>

                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-green-600 shrink-0" />
                    {formatSalary(job)}
                  </p>

                </div>

                {job.skills?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/jobDetails/${job.id}`}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 active:scale-[0.98] transition"
                >
                  View Details
                  <ArrowRight size={17} />
                </Link>

              </div>
            ))}

          </div>
        )}

        <Link
          to="/jobs"
          className="mt-6 sm:hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-blue-100 bg-white text-blue-600 text-sm font-bold"
        >
          View all jobs
          <ArrowRight size={17} />
        </Link>

      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-lg shadow-blue-100/30 p-5 sm:p-8 lg:p-10">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <Sparkles size={15} className="text-blue-600" />

              <span className="text-xs sm:text-sm font-bold text-blue-600">
                Simple Process
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How SmartJob Works
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A clean flow for candidates and recruiters to manage the complete
              hiring process.
            </p>

          </div>

          <div className="mt-6 sm:mt-8 grid md:grid-cols-3 gap-3 sm:gap-5">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl sm:rounded-[2rem] bg-slate-50 border border-slate-100 p-5 sm:p-6"
                >

                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 sm:mb-5">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="bg-white rounded-3xl sm:rounded-[2rem] border border-slate-100 shadow-lg shadow-blue-100/30 p-5 sm:p-8 lg:p-10">

          <div className="grid md:grid-cols-3 gap-6">

            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Building2 className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-bold text-slate-950">
                  Top Companies
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Connect with trusted companies hiring actively.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-bold text-slate-950">
                  Smart Candidates
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Candidates can apply and track applications easily.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-bold text-slate-950">
                  Secure Platform
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Role-based access for candidates and recruiters.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Recruiter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-slate-950 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-slate-200">

          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-center">

            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center mb-4 sm:mb-5">
                <BriefcaseBusiness size={25} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Hiring for your company?
              </h2>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                Easily post jobs, track applicants, shortlist candidates, and
                connect with the right talent—all from one powerful hiring
                dashboard.
              </p>
            </div>

            <Link
              to="/register"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl sm:rounded-2xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 active:scale-[0.98] transition"
            >
              Start Hiring
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h2 className="text-lg font-extrabold text-slate-950">
              SmartJob Portal
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A full-stack job portal for candidates and recruiters.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm font-semibold text-slate-500">
            <Link to="/jobs" className="hover:text-blue-600 transition">
              Jobs
            </Link>

            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-blue-600 transition">
              Register
            </Link>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;

