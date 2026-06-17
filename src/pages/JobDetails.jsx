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
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      {loading && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-slate-500 font-semibold shadow-sm">
            Loading job details...
          </div>
        </main>
      )}

      {error && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-50 rounded-2xl border border-red-100 p-6 text-center text-red-600 font-semibold">
            {error}
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
        </main>
      )}

      {!loading && !error && job && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Main Content */}
            <section className="space-y-6">
              {/* Job Header Card */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness
                        size={30}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600 mb-3">
                        <ShieldCheck size={14} />
                        {job.status || "ACTIVE"}
                      </div>

                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                        {job.title}
                      </h1>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 size={17} />
                          {job.company}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MapPin size={17} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={17} />
                          Posted {formatDate(job.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-11 h-11 rounded-xl border border-gray-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition shrink-0">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Overview Badges */}
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                      <Clock3 size={20} className="text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400">
                      Job Type
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {job.jobType || "Not specified"}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                      <IndianRupee size={20} className="text-green-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400">
                      Salary
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {formatSalary()}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
                      <GraduationCap size={20} className="text-violet-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400">
                      Experience
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {job.experience || "Not specified"}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                      <Users size={20} className="text-orange-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400">
                      Openings
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {job.openings || 1} Positions
                    </h3>
                  </div>
                </div>

                {/* Action Buttons Mobile/Tablet */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 lg:hidden">
                  <Link
                    to={`/applyJob/${job.id}`}
                    className="flex-1 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition text-center"
                  >
                    Apply Now
                  </Link>

                  <button className="flex-1 py-3.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition">
                    Save Job
                  </button>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Job Description
                </h2>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {job.description || "No description added."}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Key Responsibilities
                </h2>

                <div className="mt-5 space-y-4">
                  {job.responsibilities?.length > 0 ? (
                    job.responsibilities.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle2
                          size={20}
                          className="text-blue-600 shrink-0 mt-0.5"
                        />
                        <p className="text-slate-600 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">
                      No responsibilities added.
                    </p>
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Requirements
                </h2>

                <div className="mt-5 space-y-4">
                  {job.requirements?.length > 0 ? (
                    job.requirements.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle2
                          size={20}
                          className="text-blue-600 shrink-0 mt-0.5"
                        />
                        <p className="text-slate-600 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No requirements added.</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Required Skills
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">
                  {job.skills?.length > 0 ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-500">No skills added.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Right Sidebar */}
            <aside className="space-y-6 sticky top-24">
              {/* Apply Card */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
                <h2 className="text-xl font-bold">Apply for this job</h2>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Submit your application and take the next step in your career.
                </p>

                <Link
                  to={`/applyJob/${job.id}`}
                  className="mt-6 w-full inline-flex items-center justify-center py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition"
                >
                  Apply Now
                </Link>

                <button className="mt-3 w-full py-3.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Save Job
                </button>

                <button
                  type="button"
                  onClick={handleShareJob}
                  className="mt-3 w-full py-3.5 rounded-xl border border-gray-100 bg-white text-slate-700 text-sm font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Job
                </button>
              </div>

              {/* Company Card */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Building2 size={26} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      {job.company || "Company"}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Recruiting Company
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                  This company is hiring for the {job.title} position. Apply now
                  and take the next step in your career.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Globe size={17} className="text-blue-600" />
                    Website not added
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail size={17} className="text-blue-600" />
                    HR contact not added
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin size={17} className="text-blue-600" />
                    {job.location || "Location not specified"}
                  </div>
                </div>

                <button className="mt-6 w-full py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2">
                  View Company
                  <ExternalLink size={16} />
                </button>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-[1.8rem] border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold">Similar Jobs</h2>

                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-gray-100">
                  <h3 className="font-bold text-slate-950">
                    More jobs coming soon
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Similar jobs feature will be connected later.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
};

export default JobDetails;