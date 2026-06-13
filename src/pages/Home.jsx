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
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Find jobs faster with SmartJob
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Find Your Dream Job <br />
                With <span className="text-blue-600">SmartJob</span>
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Discover thousands of job opportunities with the information you
                need. Build your future today with a smart and trusted job
                portal.
              </p>

              {/* Search Box */}
              <div className="mt-8 bg-white rounded-2xl shadow-xl shadow-blue-100/60 border border-gray-100 p-3">
                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50">
                    <Search size={20} className="text-slate-400" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Job title, keywords..."
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50">
                    <MapPin size={20} className="text-slate-400" />
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
                    className="px-7 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
                  >
                    Search Job
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                >
                  Browse Jobs
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-100 text-slate-700 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Join SmartJob
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                  >
                    <h3 className="text-2xl font-bold text-blue-600">
                      {item.number}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px] h-[430px] sm:h-[500px] bg-white rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-100/60 overflow-hidden">
                {/* Main Image */}
                <img
                  src="/hero-image-2.jpg"
                  alt="Job search illustration"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Light Overlay for Premium Look */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-50/20" />

                {/* Search Icon */}
                <div className="absolute top-7 right-7 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center z-20">
                  <Search size={30} className="text-slate-950" />
                </div>

                {/* Floating Card */}
                {/* <div className="absolute left-6 bottom-6 right-6 sm:right-auto sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl p-5 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <BriefcaseBusiness size={22} className="text-blue-600" />
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

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-700">
                    <CheckCircle2 size={15} />
                    Role based job portal
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Popular Job Categories
            </h2>
            <p className="mt-2 text-slate-600">
              Explore jobs from the most active categories.
            </p>
          </div>

          <Link
            to="/jobs"
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm"
          >
            Explore more
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                to="/jobs"
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 transition"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}
                >
                  <Icon size={24} className={item.color} />
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{item.jobs}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Featured Jobs
            </h2>
            <p className="mt-2 text-slate-600">
              Latest opportunities posted by recruiters.
            </p>
          </div>

          <Link
            to="/jobs"
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm"
          >
            View all jobs
            <ArrowRight size={18} />
          </Link>
        </div>

        {latestJobs.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 text-center text-slate-500 font-semibold">
            No jobs available right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {latestJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Building2 size={26} className="text-blue-600" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-xs font-bold">
                    {job.status || "ACTIVE"}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{job.company}</p>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    {job.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={16} className="text-orange-600" />
                    {job.jobType || "Not specified"}
                  </p>

                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-green-600" />
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
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                >
                  View Details
                  <ArrowRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-8 lg:p-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-600">
                Simple Process
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              How SmartJob Works
            </h2>

            <p className="mt-2 text-slate-600">
              A clean flow for candidates and recruiters to manage the complete
              hiring process.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="rounded-[2rem] bg-slate-50 border border-gray-100 p-6"
                >
                  <div className="w-13 h-13 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-950">
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
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-8 lg:p-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-950">Top Companies</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Connect with trusted companies hiring actively.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-950">Smart Candidates</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Candidates can apply and track applications easily.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-950">Secure Platform</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Role-based access for candidates and recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 lg:p-10 text-white shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <BriefcaseBusiness size={28} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Hiring for your company?
              </h2>

              <p className="mt-3 max-w-2xl text-slate-300 leading-relaxed">
               Easily post jobs, track applicants, shortlist candidates, and connect with the right talent—all from one powerful hiring dashboard.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition"
            >
              Start Hiring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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