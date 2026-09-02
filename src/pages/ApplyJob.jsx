import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  IndianRupee,
  Clock3,
  UserRound,
  Phone,
  FileText,
  Upload,
  GraduationCap,
  MapPinned,
  BadgeDollarSign,
  Tags,
  Send,
  Sparkles,
  CheckCircle2,
  Link as LinkIcon,
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  applyJob,
  getJobById,
  getCandidateProfile,
} from "../services/jobService";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    currentLocation: "",
    experience: "Fresher",
    expectedSalary: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    skills: "",
    coverLetter: "",
    resume: null,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJobDetails();
    fetchCandidateProfile();
  }, [jobId]);

  const fetchCandidateProfile = async () => {
    try {
      const profile = await getCandidateProfile();

      setFormData((prev) => ({
        ...prev,
        phone: profile.phone || "",
        currentLocation: profile.location || "",
        experience: profile.experience || "",
        expectedSalary: profile.expectedSalary || "",
        portfolioUrl: profile.portfolioUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        githubUrl: profile.githubUrl || "",
        skills: profile.skills ? profile.skills.join(", ") : "",
      }));
    } catch (err) {
      console.log(
        "Candidate profile not found yet. First time applying."
      );
    }
  };

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setFormData({
        ...formData,
        resume: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!localStorage.getItem("token")) {
      setError("Please login first to apply for this job.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("phone", formData.phone);
      data.append("currentLocation", formData.currentLocation);
      data.append("experience", formData.experience);
      data.append("expectedSalary", formData.expectedSalary);
      data.append("coverLetter", formData.coverLetter);
      data.append("portfolioUrl", formData.portfolioUrl);
      data.append("linkedinUrl", formData.linkedinUrl);
      data.append("githubUrl", formData.githubUrl);

      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      skillsArray.forEach((skill) => {
        data.append("skills", skill);
      });

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const result = await applyJob(jobId, data);

      console.log("APPLICATION SUCCESS:", result);
      console.log(
        "TOKEN AFTER APPLY:",
        localStorage.getItem("token")
      );

      setSuccess(
        result || "Application submitted successfully."
      );

      setTimeout(() => {
        console.log("Navigating to candidate dashboard");
        navigate("/candidateDashboard");
      }, 1200);
    } catch (err) {
      console.log("Apply error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while applying."
      );
    } finally {
      setSubmitting(false);
    }
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

  const previewSkills = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);

  const InputWrapper = ({ icon: Icon, children }) => (
    <div className="group flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3.5 transition-all focus-within:bg-white focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50">
      <Icon
        size={19}
        className="shrink-0 text-slate-400 group-focus-within:text-blue-600 transition"
      />
      {children}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#f7faff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Decorative Desktop Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-48 -right-48 w-[38rem] h-[38rem] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="hidden lg:block absolute top-[42rem] -left-56 w-[34rem] h-[34rem] rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="hidden xl:block absolute top-44 right-[8%] w-32 h-32 rounded-[2rem] border border-blue-200/40 rotate-12" />
      </div>

      {/* Loading */}
      {loading && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-[1.8rem] border border-slate-100 p-10 text-center shadow-xl shadow-blue-100/50">

            <div className="w-12 h-12 mx-auto rounded-2xl border-4 border-blue-100 border-t-blue-600 animate-spin" />

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Preparing your application...
            </p>

          </div>
        </main>
      )}

      {/* Error */}
      {!loading && error && !job && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-[1.8rem] bg-red-50 border border-red-100 p-8 text-center text-red-600 font-semibold">
            {error}
          </div>

          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
        </main>
      )}

      {!loading && job && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 mb-6 text-sm font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <span className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition">
              <ArrowLeft
                size={17}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </span>

            Back
          </button>

          {/* Header */}
          <section className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/60 p-6 sm:p-8 lg:p-10 mb-7 lg:mb-9">

            <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                <Sparkles size={16} className="text-blue-300" />

                <span className="text-sm font-bold text-blue-100">
                  Job Application
                </span>
              </div>

              <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Complete your application
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                    Review your details carefully and submit your application
                    for this opportunity.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheck
                      size={20}
                      className="text-blue-300"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Secure Application
                    </p>

                    <p className="text-xs text-slate-300">
                      Your details are safely submitted
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* Mobile Job Summary */}
          <section className="lg:hidden mb-6">

            <div className="bg-white rounded-[1.6rem] border border-slate-100 shadow-lg shadow-blue-100/40 p-5">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness
                    size={23}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-extrabold truncate">
                    {job.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 truncate">
                    {job.company}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-600">
                      <MapPin size={13} />
                      {job.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-xs font-semibold text-blue-700">
                      <Clock3 size={13} />
                      {job.jobType || "Not specified"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 px-5 py-4 text-sm font-semibold text-emerald-700 flex items-center gap-3">
              <CheckCircle2 size={20} />
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] gap-7 lg:gap-8"
          >

            {/* Main Form */}
            <div className="space-y-6">

              {/* Candidate Details */}
              <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-start gap-3 sm:gap-4 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <UserRound
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Candidate Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Basic information for your application.
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <InputWrapper icon={Phone}>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Current Location
                    </label>

                    <InputWrapper icon={MapPinned}>
                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        placeholder="Bangalore, India"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                </div>

              </section>

              {/* Professional Details */}
              <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-start gap-3 sm:gap-4 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <GraduationCap
                      size={21}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Professional Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your experience and professional profile.
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Experience
                    </label>

                    <div className="relative">

                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 outline-none text-sm text-slate-700 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition"
                      >
                        <option>Fresher</option>
                        <option>1 - 2 Years</option>
                        <option>2 - 4 Years</option>
                        <option>4 - 6 Years</option>
                        <option>6+ Years</option>
                      </select>

                      <GraduationCap
                        size={19}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />

                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Expected Salary
                    </label>

                    <InputWrapper icon={BadgeDollarSign}>
                      <input
                        type="number"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        placeholder="500000"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Portfolio URL
                    </label>

                    <InputWrapper icon={LinkIcon}>
                      <input
                        type="text"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://portfolio.com"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      LinkedIn URL
                    </label>

                    <InputWrapper icon={LinkIcon}>
                      <input
                        type="text"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      GitHub URL
                    </label>

                    <InputWrapper icon={LinkIcon}>
                      <input
                        type="text"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </InputWrapper>
                  </div>

                </div>

              </section>

              {/* Skills */}
              <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-start gap-3 sm:gap-4 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Tags
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Skills
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Separate each skill using a comma.
                    </p>
                  </div>

                </div>

                <InputWrapper icon={Tags}>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Java, Spring Boot, React, MySQL"
                    className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  />
                </InputWrapper>

                {previewSkills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2.5">

                    {previewSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm font-bold text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>
                )}

              </section>

              {/* Resume & Cover Letter */}
              <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-7 lg:p-8">

                <div className="flex items-start gap-3 sm:gap-4 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                    <FileText
                      size={21}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Resume & Cover Letter
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Add your resume and a short introduction.
                    </p>
                  </div>

                </div>

                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Upload Resume
                </label>

                <div className="relative overflow-hidden border-2 border-dashed border-blue-100 bg-blue-50/40 rounded-[1.5rem] sm:rounded-[1.8rem] p-6 sm:p-8 text-center">

                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />

                  <div className="relative z-10">

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-blue-100 flex items-center justify-center shadow-sm">
                      {formData.resume ? (
                        <FileCheck2
                          size={26}
                          className="text-emerald-600"
                        />
                      ) : (
                        <Upload
                          size={26}
                          className="text-blue-600"
                        />
                      )}
                    </div>

                    <h3 className="mt-4 text-base sm:text-lg font-extrabold text-slate-950">
                      {formData.resume
                        ? "Resume selected"
                        : "Upload your resume"}
                    </h3>

                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                      PDF, DOC, or DOCX file supported
                    </p>

                    <input
                      type="file"
                      name="resume"
                      onChange={handleChange}
                      className="mt-5 block max-w-full mx-auto text-sm text-slate-500"
                    />

                    {formData.resume && (
                      <div className="mt-4 inline-flex max-w-full items-center gap-2 px-3 py-2 rounded-xl bg-white border border-emerald-100 text-sm font-semibold text-emerald-700">

                        <FileCheck2
                          size={16}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {formData.resume.name}
                        </span>

                      </div>
                    )}

                  </div>

                </div>

                <div className="mt-7">

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Cover Letter
                  </label>

                  <textarea
                    rows="7"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Write a short cover letter for this job..."
                    className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition"
                  />

                  <div className="mt-2 flex justify-between gap-3 text-xs text-slate-400">
                    <span>
                      Explain why you are a good fit for this role.
                    </span>

                    <span className="shrink-0">
                      {formData.coverLetter.length} characters
                    </span>
                  </div>

                </div>

              </section>

              {/* Mobile Submit */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={18} />

                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              </div>

            </div>

            {/* Desktop Job Summary */}
            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-6">

                {/* Job Summary */}
                <div className="relative overflow-hidden bg-white rounded-[1.8rem] border border-slate-100 shadow-xl shadow-blue-100/50 p-6">

                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-100/40 rounded-full blur-3xl" />

                  <div className="relative z-10">

                    <div className="flex gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <BriefcaseBusiness
                          size={25}
                          className="text-blue-600"
                        />
                      </div>

                      <div className="min-w-0">

                        <h2 className="text-xl font-extrabold leading-tight">
                          {job.title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {job.company}
                        </p>

                      </div>

                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">

                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <Building2
                          size={18}
                          className="text-blue-600 shrink-0"
                        />

                        <span>{job.company}</span>
                      </p>

                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <MapPin
                          size={18}
                          className="text-blue-600 shrink-0"
                        />

                        <span>{job.location}</span>
                      </p>

                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <Clock3
                          size={18}
                          className="text-orange-500 shrink-0"
                        />

                        <span>
                          {job.jobType || "Not specified"}
                        </span>
                      </p>

                      <p className="flex items-start gap-3 text-sm text-slate-600">
                        <IndianRupee
                          size={18}
                          className="text-emerald-600 shrink-0"
                        />

                        <span>{formatSalary()}</span>
                      </p>

                    </div>

                    <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4">

                      <div className="flex items-center gap-2">
                        <ShieldCheck
                          size={17}
                          className="text-blue-600"
                        />

                        <p className="text-sm font-bold text-blue-700">
                          Application Status
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Your application will be marked as{" "}
                        <span className="font-bold text-slate-800">
                          Pending
                        </span>{" "}
                        after submission.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Before Applying */}
                <div className="relative overflow-hidden bg-slate-950 rounded-[1.8rem] shadow-xl shadow-slate-200 p-6 text-white">

                  <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-600/25 rounded-full blur-3xl" />

                  <div className="relative z-10">

                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <CheckCircle2
                        size={23}
                        className="text-blue-300"
                      />
                    </div>

                    <h2 className="mt-5 text-xl font-extrabold">
                      Before Applying
                    </h2>

                    <div className="mt-5 space-y-4 text-sm text-slate-300 leading-relaxed">

                      <p className="flex gap-3">
                        <CheckCircle2
                          size={17}
                          className="shrink-0 mt-0.5 text-blue-300"
                        />

                        Check your resume before uploading.
                      </p>

                      <p className="flex gap-3">
                        <CheckCircle2
                          size={17}
                          className="shrink-0 mt-0.5 text-blue-300"
                        />

                        Make sure your phone number is correct.
                      </p>

                      <p className="flex gap-3">
                        <CheckCircle2
                          size={17}
                          className="shrink-0 mt-0.5 text-blue-300"
                        />

                        Write a short and clear cover letter.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Desktop Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={18} />

                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>

              </div>

            </aside>

          </form>

        </main>
      )}
    </div>
  );
};

export default ApplyJob;

