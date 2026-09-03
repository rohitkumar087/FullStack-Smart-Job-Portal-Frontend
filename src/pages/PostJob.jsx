import React, { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  IndianRupee,
  GraduationCap,
  FileText,
  Sparkles,
  Send,
  Tags,
  Users,
  CheckCircle2,
  ArrowRight,
  Eye,
  Layers3,
  CircleDollarSign,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full Time",
    experience: "Fresher",
    minSalary: "",
    maxSalary: "",
    openings: "",
    skills: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const convertToList = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!localStorage.getItem("token")) {
      setError("Please login as recruiter first.");
      return;
    }

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.description
    ) {
      setError("Please fill title, company, location, and description.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        jobType: formData.jobType,
        experience: formData.experience,
        minSalary: formData.minSalary ? Number(formData.minSalary) : null,
        maxSalary: formData.maxSalary ? Number(formData.maxSalary) : null,
        openings: formData.openings ? Number(formData.openings) : null,
        description: formData.description,
        skills: convertToList(formData.skills),
        responsibilities: convertToList(formData.responsibilities),
        requirements: convertToList(formData.requirements),
      };

      await createJob(payload);

      setSuccess("Job posted successfully.");

      setTimeout(() => {
        navigate("/recruiterDashboard");
      }, 1200);
    } catch (err) {
      setError(err.response?.data || "Failed to post job");
    } finally {
      setSubmitting(false);
    }
  };

  const previewSkills = convertToList(formData.skills);

  const formatSalary = () => {
    if (formData.minSalary && formData.maxSalary) {
      return `₹${formData.minSalary} - ₹${formData.maxSalary}`;
    }

    if (formData.minSalary) {
      return `₹${formData.minSalary}+`;
    }

    if (formData.maxSalary) {
      return `Up to ₹${formData.maxSalary}`;
    }

    return "Not disclosed";
  };

  const inputClass =
    "w-full min-w-0 bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 text-sm sm:text-base text-slate-700 placeholder:text-slate-400";

  const selectClass =
    "w-full min-w-0 h-full appearance-none bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 text-sm sm:text-base text-slate-700 pl-12 pr-12 py-3.5 cursor-pointer";

  const textareaClass =
    "w-full min-w-0 resize-y rounded-2xl bg-slate-50/80 border border-slate-100 px-4 py-4 outline-none ring-0 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-300 focus:bg-white transition-all duration-300 text-sm sm:text-base text-slate-700 placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute top-[25%] -right-52 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />

        <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[140px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <section
          className="
            relative overflow-hidden
            mb-7 sm:mb-9
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/80 backdrop-blur-xl
            border border-white
            shadow-[0_25px_70px_rgba(37,99,235,0.08)]
          "
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-28 left-[40%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="hidden lg:block absolute right-[12%] top-8 w-20 h-20 border border-blue-300/20 rounded-[2rem] rotate-[20deg]" />

            <div className="hidden lg:block absolute right-[28%] bottom-6 w-12 h-12 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl rotate-[25deg]" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
              <div className="max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-blue-50 border border-blue-100
                    shadow-sm
                  "
                >
                  <Sparkles size={16} className="text-blue-600" />

                  <span className="text-xs sm:text-sm font-extrabold text-blue-600">
                    Recruiter Workspace
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Create your next

                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    great opportunity.
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                  Create a detailed job post and reach candidates who match
                  your role, skills, and hiring requirements.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <BriefcaseBusiness size={17} className="text-blue-600" />

                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Professional Job Post
                    </span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <Users size={17} className="text-indigo-600" />

                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Reach the right candidates
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Visual */}
              <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">
                <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

                <div
                  className="
                    absolute inset-2
                    rounded-[2.5rem]
                    bg-gradient-to-br from-blue-500 to-indigo-700
                    shadow-2xl shadow-blue-500/25
                    rotate-[-6deg]
                    transition-transform duration-500
                    hover:rotate-0
                  "
                />

                <div
                  className="
                    relative w-24 h-24 lg:w-28 lg:h-28
                    rounded-[2rem]
                    bg-white
                    border border-white
                    shadow-xl
                    flex items-center justify-center
                  "
                >
                  <Send size={46} className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Messages */}
        {error && (
          <div
            className="
              mb-6 flex items-start gap-3
              rounded-[1.5rem]
              bg-red-50/90 border border-red-100
              px-5 py-4
              text-sm font-semibold text-red-600
              shadow-sm
            "
          >
            <div className="w-8 h-8 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
              !
            </div>

            <span className="pt-1">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="
              mb-6 flex items-center gap-3
              rounded-[1.5rem]
              bg-emerald-50/90 border border-emerald-100
              px-5 py-4
              text-sm font-semibold text-emerald-700
              shadow-sm
            "
          >
            <div className="w-9 h-9 shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={19} />
            </div>

            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-7 sm:gap-8"
        >
          <div className="space-y-6 sm:space-y-7">
            {/* Basic Information */}
            <section
              className="
                rounded-[2rem] sm:rounded-[2.3rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-5 sm:p-7 lg:p-8
              "
            >
              <SectionHeader
                icon={BriefcaseBusiness}
                title="Basic Information"
                description="Add the main details candidates will see first."
                gradient="from-blue-500 to-indigo-600"
              />

              <div className="grid md:grid-cols-2 gap-5 mt-7">
                <div className="md:col-span-2">
                  <InputField label="Job Title" icon={BriefcaseBusiness}>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Java Backend Developer"
                      className={inputClass}
                    />
                  </InputField>
                </div>

                <InputField label="Company Name" icon={Building2}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Tech Solutions Inc."
                    className={inputClass}
                  />
                </InputField>

                <InputField label="Job Location" icon={MapPin}>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Bangalore, India"
                    className={inputClass}
                  />
                </InputField>
              </div>
            </section>

            {/* Job Details */}
            <section
              className="
                rounded-[2rem] sm:rounded-[2.3rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-5 sm:p-7 lg:p-8
              "
            >
              <SectionHeader
                icon={Layers3}
                title="Job Details"
                description="Define the work type, experience, salary, and openings."
                gradient="from-violet-500 to-purple-600"
              />

              <div className="grid md:grid-cols-2 gap-5 mt-7">
                <SelectField label="Job Type" icon={Clock3}>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Remote</option>
                  </select>
                </SelectField>

                <SelectField
                  label="Experience Required"
                  icon={GraduationCap}
                >
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option>Fresher</option>
                    <option>1 - 3 Years</option>
                    <option>3 - 5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </SelectField>

                <InputField label="Minimum Salary" icon={IndianRupee}>
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="500000"
                    className={inputClass}
                  />
                </InputField>

                <InputField label="Maximum Salary" icon={IndianRupee}>
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="1000000"
                    className={inputClass}
                  />
                </InputField>

                <InputField label="Number of Openings" icon={Users}>
                  <input
                    type="number"
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    placeholder="5"
                    className={inputClass}
                  />
                </InputField>
              </div>
            </section>

            {/* Skills */}
            <section
              className="
                rounded-[2rem] sm:rounded-[2.3rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-5 sm:p-7 lg:p-8
              "
            >
              <SectionHeader
                icon={Tags}
                title="Required Skills"
                description="Separate multiple skills using commas."
                gradient="from-cyan-500 to-blue-600"
              />

              <div className="mt-7">
                <InputField label="Skills" icon={Tags}>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Java, Spring Boot, MySQL"
                    className={inputClass}
                  />
                </InputField>
              </div>

              {previewSkills.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
                    Skill Preview
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {previewSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          px-4 py-2 rounded-full
                          bg-blue-50 border border-blue-100
                          text-sm font-bold text-blue-600
                          shadow-sm
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:shadow-md
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Job Description */}
            <section
              className="
                rounded-[2rem] sm:rounded-[2.3rem]
                bg-white/85 backdrop-blur-xl
                border border-white
                shadow-[0_18px_55px_rgba(15,23,42,0.06)]
                p-5 sm:p-7 lg:p-8
              "
            >
              <SectionHeader
                icon={FileText}
                title="Job Description"
                description="Help candidates understand the role and expectations."
                gradient="from-orange-500 to-rose-500"
              />

              <div className="mt-7 space-y-6">
                <TextAreaField label="Job Description">
                  <textarea
                    rows="7"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write a detailed job description..."
                    className={textareaClass}
                  />
                </TextAreaField>

                <TextAreaField
                  label="Responsibilities"
                  hint="Separate responsibilities using commas if required."
                >
                  <textarea
                    rows="5"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    placeholder="Build APIs, Work with MySQL, Write clean code"
                    className={textareaClass}
                  />
                </TextAreaField>

                <TextAreaField
                  label="Requirements"
                  hint="Mention skills, qualifications, and other expectations."
                >
                  <textarea
                    rows="5"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Good Java knowledge, Spring Boot basics, SQL understanding"
                    className={textareaClass}
                  />
                </TextAreaField>
              </div>
            </section>

            {/* Mobile Preview */}
            <section className="xl:hidden">
              <JobPreview
                formData={formData}
                previewSkills={previewSkills}
                formatSalary={formatSalary}
              />
            </section>

            {/* Submit */}
            <section
              className="
                relative overflow-hidden
                rounded-[2rem]
                bg-slate-950
                shadow-2xl shadow-slate-950/10
                p-5 sm:p-6
              "
            >
              <div className="absolute -top-20 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Ready to publish?
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Your job will be available to candidates after publishing.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    group w-full sm:w-auto
                    inline-flex items-center justify-center gap-2
                    px-7 py-4 rounded-2xl
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    text-white text-sm font-black
                    shadow-xl shadow-blue-500/20
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl hover:shadow-blue-500/30
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    disabled:hover:translate-y-0
                  "
                >
                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                  {submitting ? "Posting..." : "Publish Job"}
                </button>
              </div>
            </section>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden xl:block space-y-6">
            <div className="sticky top-24">
              <JobPreview
                formData={formData}
                previewSkills={previewSkills}
                formatSalary={formatSalary}
              />

              {/* Posting Tips */}
              <div
                className="
                  relative overflow-hidden
                  mt-6
                  rounded-[2rem]
                  bg-slate-950 text-white
                  shadow-2xl shadow-slate-950/10
                  p-6
                "
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

                <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl" />

                <div className="relative">
                  <div
                    className="
                      w-12 h-12 rounded-2xl
                      bg-white/10 border border-white/10
                      flex items-center justify-center
                      backdrop-blur-md
                    "
                  >
                    <CheckCircle2
                      size={24}
                      className="text-blue-300"
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-black">
                    Posting Tips
                  </h2>

                  <div className="mt-5 space-y-4">
                    <Tip text="Use a clear and searchable job title." />

                    <Tip text="Add a salary range to attract more candidates." />

                    <Tip text="Mention skills and experience requirements clearly." />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  gradient,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <div
          className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-br ${gradient}
            opacity-20 blur-lg
          `}
        />

        <div
          className={`
            relative w-11 h-11 sm:w-12 sm:h-12
            rounded-2xl
            bg-gradient-to-br ${gradient}
            text-white
            flex items-center justify-center
            shadow-lg
          `}
        >
          <Icon size={22} />
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-black">
          {title}
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  icon: Icon,
  children,
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2.5">
        {label}
      </label>

      <div
        className="
          group flex items-center gap-3
          w-full
          bg-slate-50/80
          rounded-2xl
          px-4 py-3.5
          border border-slate-100
          transition-all duration-300
          focus-within:bg-white
          focus-within:border-blue-300
          focus-within:ring-4
          focus-within:ring-blue-500/5
          hover:border-blue-100
        "
      >
        <Icon
          size={19}
          className="
            shrink-0 text-slate-400
            transition-all duration-300
            group-focus-within:text-blue-600
            group-focus-within:scale-110
          "
        />

        {children}
      </div>
    </div>
  );
};

const SelectField = ({
  label,
  icon: Icon,
  children,
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2.5">
        {label}
      </label>

      <div
        className="
          group relative
          w-full overflow-hidden
          bg-slate-50/80
          rounded-2xl
          border border-slate-100
          transition-all duration-300
          focus-within:bg-white
          focus-within:border-blue-300
          focus-within:ring-4
          focus-within:ring-blue-500/5
          hover:border-blue-100
        "
      >
        {/* Left Icon */}
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Icon
            size={19}
            className="
              text-slate-400
              transition-all duration-300
              group-focus-within:text-blue-600
              group-focus-within:scale-110
            "
          />
        </div>

        {children}

        {/* Right Arrow */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <ArrowRight
            size={16}
            className="rotate-90 text-slate-400 transition-transform duration-300 group-focus-within:translate-y-0.5"
          />
        </div>
      </div>
    </div>
  );
};

const TextAreaField = ({
  label,
  hint,
  children,
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2.5">
        <label className="text-sm font-bold text-slate-700">
          {label}
        </label>

        {hint && (
          <span className="text-xs text-slate-400">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
};

const JobPreview = ({
  formData,
  previewSkills,
  formatSalary,
}) => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[2rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        p-5 sm:p-6
      "
    >
      <div className="absolute -top-20 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
            Live Preview
          </p>

          <h2 className="mt-1 text-xl font-black">
            Job Preview
          </h2>
        </div>

        <div
          className="
            w-11 h-11 rounded-2xl
            bg-blue-50 border border-blue-100
            flex items-center justify-center
          "
        >
          <Eye size={20} className="text-blue-600" />
        </div>
      </div>

      <div
        className="
          relative overflow-hidden
          rounded-[1.7rem]
          bg-gradient-to-br from-slate-50 to-blue-50/50
          border border-slate-100
          p-5
        "
      >
        <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-blue-500/5" />

        <div
          className="
            relative w-14 h-14
            rounded-2xl
            bg-gradient-to-br from-blue-500 to-indigo-700
            text-white
            shadow-lg shadow-blue-500/20
            flex items-center justify-center
          "
        >
          <BriefcaseBusiness size={26} />
        </div>

        <h3 className="relative mt-5 text-xl font-black text-slate-950 break-words">
          {formData.title || "Job Title"}
        </h3>

        <p className="relative mt-1 text-sm font-semibold text-slate-500">
          {formData.company || "Company Name"}
        </p>

        <div className="relative mt-6 space-y-3">
          <PreviewRow
            icon={MapPin}
            color="text-blue-600"
            text={formData.location || "Location"}
          />

          <PreviewRow
            icon={Clock3}
            color="text-indigo-600"
            text={formData.jobType}
          />

          <PreviewRow
            icon={GraduationCap}
            color="text-violet-600"
            text={formData.experience}
          />

          <PreviewRow
            icon={CircleDollarSign}
            color="text-emerald-600"
            text={formatSalary()}
          />
        </div>

        {previewSkills.length > 0 && (
          <div className="relative mt-6">
            <p className="text-xs font-bold text-slate-400 mb-3">
              KEY SKILLS
            </p>

            <div className="flex flex-wrap gap-2">
              {previewSkills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="
                    px-3 py-1.5 rounded-full
                    bg-white border border-blue-100
                    text-blue-600 text-xs font-bold
                    shadow-sm
                  "
                >
                  {skill}
                </span>
              ))}

              {previewSkills.length > 4 && (
                <span
                  className="
                    px-3 py-1.5 rounded-full
                    bg-slate-100
                    text-slate-500 text-xs font-bold
                  "
                >
                  +{previewSkills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <div
          className="
            relative mt-6
            flex items-center justify-center gap-2
            w-full py-3.5
            rounded-2xl
            bg-slate-950 text-white
            text-sm font-bold
          "
        >
          <Send size={16} />
          Ready to Publish
        </div>
      </div>
    </div>
  );
};

const PreviewRow = ({
  icon: Icon,
  color,
  text,
}) => {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <div
        className="
          w-8 h-8 shrink-0 rounded-xl
          bg-white border border-slate-100
          flex items-center justify-center
        "
      >
        <Icon size={15} className={color} />
      </div>

      <span className="font-medium break-words">
        {text}
      </span>
    </div>
  );
};

const Tip = ({ text }) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          mt-0.5 w-7 h-7 shrink-0
          rounded-lg bg-white/10
          flex items-center justify-center
        "
      >
        <CheckCircle2
          size={15}
          className="text-blue-300"
        />
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default PostJob;