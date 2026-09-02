import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  IndianRupee,
  CalendarDays,
  GraduationCap,
  Users,
  Heart,
  Share2,
  CheckCircle2,
  ExternalLink,
  Mail,
  Globe,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobById(jobId);

      setJob(data);
    } catch (err) {
      setError("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently";
    }

    return new Date(dateValue).toLocaleDateString();
  };

  const formatSalary = () => {
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

  const handleShareJob = async () => {
    const jobUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `Check this job: ${job.title} at ${job.company}`,
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(jobUrl);
        alert("Job link copied to clipboard!");
      }
    } catch (error) {
      await navigator.clipboard.writeText(jobUrl);
      alert("Job link copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7faff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-48 -right-48 w-[36rem] h-[36rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="hidden lg:block absolute top-[45rem] -left-56 w-[34rem] h-[34rem] rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="hidden xl:block absolute top-40 right-[8%] w-40 h-40 rounded-[2.5rem] border border-blue-200/40 rotate-12" />
        <div className="hidden xl:block absolute top-[38rem] left-[6%] w-28 h-28 rounded-3xl border border-indigo-200/40 -rotate-12" />
      </div>

      {/* Loading */}
      {loading && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-[1.8rem] border border-slate-100 p-10 text-center shadow-xl shadow-blue-100/40">
            <div className="mx-auto w-12 h-12 rounded-2xl border-4 border-blue-100 border-t-blue-600 animate-spin" />

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Loading job details...
            </p>
          </div>
        </main>
      )}

      {/* Error */}
      {error && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-50 rounded-[1.8rem] border border-red-100 p-8 text-center text-red-600 font-semibold shadow-sm">
            {error}
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
        </main>
      )}

      {!loading && !error && job && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-28 lg:pb-10">

          {/* Back Button */}
          <button
            onClick={() => navigate("/jobs")}
            className="group inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition mb-6"
          >
            <span className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition">
              <ArrowLeft
                size={17}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </span>

            Back to Jobs
          </button>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] gap-7 lg:gap-8">

            {/* Main Content */}
            <section className="min-w-0 space-y-6">

              {/* Job Hero */}
              <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/60">

                {/* Depth Background */}
                <div className="absolute -top-32 -right-28 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
                <div className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative z-10 p-5 sm:p-7 lg:p-9">

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    <div className="flex gap-4 sm:gap-5 min-w-0">

                      {/* Company Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-lg">
                        <BriefcaseBusiness
                          size={28}
                          className="text-blue-300"
                        />
                      </div>

                      <div className="min-w-0">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-xs font-bold text-blue-200 mb-4">
                          <ShieldCheck size={14} />

                          {job.status || "ACTIVE"}
                        </div>

                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight break-words">
                          {job.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm text-slate-300">

                          <span className="flex items-center gap-1.5">
                            <Building2 size={16} className="text-blue-300" />
                            {job.company}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-blue-300" />
                            {job.location}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays
                              size={16}
                              className="text-blue-300"
                            />
                            Posted {formatDate(job.createdAt)}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-white/15 transition"
                      >
                        <Heart size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={handleShareJob}
                        className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-300 hover:bg-white/15 transition"
                      >
                        <Share2 size={19} />
                      </button>

                    </div>

                  </div>

                  {/* Overview Cards */}
                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                    <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/[0.14] transition">
                      <Clock3 size={19} className="text-blue-300" />

                      <p className="mt-4 text-[11px] sm:text-xs font-semibold text-slate-400">
                        JOB TYPE
                      </p>

                      <h3 className="mt-1 text-sm sm:text-base font-bold text-white break-words">
                        {job.jobType || "Not specified"}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/[0.14] transition">
                      <IndianRupee
                        size={19}
                        className="text-emerald-300"
                      />

                      <p className="mt-4 text-[11px] sm:text-xs font-semibold text-slate-400">
                        SALARY
                      </p>

                      <h3 className="mt-1 text-sm sm:text-base font-bold text-white break-words">
                        {formatSalary()}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/[0.14] transition">
                      <GraduationCap
                        size={19}
                        className="text-violet-300"
                      />

                      <p className="mt-4 text-[11px] sm:text-xs font-semibold text-slate-400">
                        EXPERIENCE
                      </p>

                      <h3 className="mt-1 text-sm sm:text-base font-bold text-white break-words">
                        {job.experience || "Not specified"}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/[0.14] transition">
                      <Users size={19} className="text-orange-300" />

                      <p className="mt-4 text-[11px] sm:text-xs font-semibold text-slate-400">
                        OPENINGS
                      </p>

                      <h3 className="mt-1 text-sm sm:text-base font-bold text-white">
                        {job.openings || 1} Positions
                      </h3>
                    </div>

                  </div>

                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-[1.6rem] sm:rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BriefcaseBusiness
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Job Description
                  </h2>
                </div>

                <p className="mt-6 text-sm sm:text-base text-slate-600 leading-7 sm:leading-8 whitespace-pre-line">
                  {job.description || "No description added."}
                </p>

              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-[1.6rem] sm:rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <CheckCircle2
                      size={19}
                      className="text-indigo-600"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Key Responsibilities
                  </h2>
                </div>

                <div className="mt-6 space-y-4">

                  {job.responsibilities?.length > 0 ? (
                    job.responsibilities.map((item, index) => (
                      <div
                        key={index}
                        className="group flex gap-3 sm:gap-4 rounded-2xl bg-slate-50/70 border border-transparent hover:border-blue-100 hover:bg-blue-50/40 p-3 sm:p-4 transition"
                      >
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <CheckCircle2
                            size={16}
                            className="text-blue-600"
                          />
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-7">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No responsibilities added.
                    </p>
                  )}

                </div>

              </div>

              {/* Requirements */}
              <div className="bg-white rounded-[1.6rem] sm:rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <GraduationCap
                      size={19}
                      className="text-violet-600"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Requirements
                  </h2>
                </div>

                <div className="mt-6 space-y-4">

                  {job.requirements?.length > 0 ? (
                    job.requirements.map((item, index) => (
                      <div
                        key={index}
                        className="group flex gap-3 sm:gap-4 rounded-2xl bg-slate-50/70 border border-transparent hover:border-violet-100 hover:bg-violet-50/40 p-3 sm:p-4 transition"
                      >
                        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                          <CheckCircle2
                            size={16}
                            className="text-violet-600"
                          />
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-7">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No requirements added.
                    </p>
                  )}

                </div>

              </div>

              {/* Skills */}
              <div className="bg-white rounded-[1.6rem] sm:rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Sparkles size={19} className="text-blue-600" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Required Skills
                  </h2>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">

                  {job.skills?.length > 0 ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3.5 sm:px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm font-bold text-blue-700 hover:-translate-y-0.5 hover:shadow-md transition"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No skills added.
                    </p>
                  )}

                </div>

              </div>

            </section>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block min-w-0">
              <div className="sticky top-24 space-y-6">

                {/* Apply Card */}
                <div className="relative overflow-hidden bg-slate-950 text-white rounded-[1.8rem] shadow-2xl shadow-slate-300/60 p-6">

                  <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-blue-600/30 blur-3xl" />

                  <div className="relative z-10">

                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <BriefcaseBusiness
                        size={21}
                        className="text-blue-300"
                      />
                    </div>

                    <h2 className="mt-5 text-xl font-extrabold">
                      Ready for your next move?
                    </h2>

                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      Submit your application and take the next step in your
                      career.
                    </p>

                    <Link
                      to={`/applyJob/${job.id}`}
                      className="mt-6 w-full inline-flex items-center justify-center py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-500 active:scale-[0.98] transition"
                    >
                      Apply Now
                    </Link>

                    <button
                      type="button"
                      className="mt-3 w-full py-3.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white/15 transition flex items-center justify-center gap-2"
                    >
                      <Heart size={18} />
                      Save Job
                    </button>

                    <button
                      type="button"
                      onClick={handleShareJob}
                      className="mt-3 w-full py-3.5 rounded-xl border border-white/10 bg-white text-slate-800 text-sm font-bold hover:bg-slate-100 transition flex items-center justify-center gap-2"
                    >
                      <Share2 size={18} />
                      Share Job
                    </button>

                  </div>

                </div>

                {/* Company Card */}
                <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
                      <Building2
                        size={25}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-extrabold truncate">
                        {job.company || "Company"}
                      </h2>

                      <p className="text-sm text-slate-500">
                        Recruiting Company
                      </p>
                    </div>

                  </div>

                  <p className="mt-5 text-sm text-slate-600 leading-6">
                    This company is hiring for the {job.title} position. Apply
                    now and take the next step in your career.
                  </p>

                  <div className="mt-5 space-y-3 pt-5 border-t border-slate-100">

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Globe size={17} className="text-blue-600 shrink-0" />
                      Website not added
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail size={17} className="text-blue-600 shrink-0" />
                      HR contact not added
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <MapPin size={17} className="text-blue-600 shrink-0" />

                      <span className="break-words">
                        {job.location || "Location not specified"}
                      </span>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2"
                  >
                    View Company
                    <ExternalLink size={16} />
                  </button>

                </div>

                {/* Similar Jobs */}
                <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                  <h2 className="text-lg font-extrabold">
                    Similar Jobs
                  </h2>

                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">

                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                      <BriefcaseBusiness
                        size={18}
                        className="text-blue-600"
                      />
                    </div>

                    <h3 className="mt-4 font-bold text-slate-950">
                      More jobs coming soon
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      Similar jobs feature will be connected later.
                    </p>

                  </div>

                </div>

              </div>
            </aside>

          </div>

          {/* Mobile / Tablet Action Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-3 safe-area-bottom shadow-[0_-10px_30px_rgba(15,23,42,0.08)]">

            <div className="max-w-2xl mx-auto flex items-center gap-3">

              <button
                type="button"
                onClick={handleShareJob}
                className="w-12 h-12 shrink-0 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center"
              >
                <Share2 size={19} />
              </button>

              <Link
                to={`/applyJob/${job.id}`}
                className="flex-1 h-12 inline-flex items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition"
              >
                Apply Now
              </Link>

              <button
                type="button"
                className="w-12 h-12 shrink-0 rounded-xl border border-slate-200 bg-white text-slate-500 flex items-center justify-center"
              >
                <Heart size={19} />
              </button>

            </div>

          </div>

        </main>
      )}
    </div>
  );
};

export default JobDetails;

