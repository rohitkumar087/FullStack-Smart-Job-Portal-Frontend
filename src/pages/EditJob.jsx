import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  IndianRupee,
  GraduationCap,
  FileText,
  ListChecks,
  Sparkles,
  Send,
  Tags,
  Users,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Save,
  Layers3,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";

const EditJob = () => {
  const { jobId } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const convertListToText = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.join(", ");
    return value;
  };

  const convertTextToList = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const job = await getJobById(jobId);

      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        jobType: job.jobType || "Full Time",
        experience: job.experience || "Fresher",
        minSalary: job.minSalary || "",
        maxSalary: job.maxSalary || "",
        openings: job.openings || "",
        skills: convertListToText(job.skills),
        description: job.description || "",
        responsibilities: convertListToText(job.responsibilities),
        requirements: convertListToText(job.requirements),
      });
    } catch (err) {
      console.log("Fetch job error:", err);
      setError("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title || !formData.company || !formData.location) {
      setError("Please fill title, company, and location.");
      return;
    }

    try {
      setUpdating(true);

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
        skills: convertTextToList(formData.skills),
        responsibilities: convertTextToList(formData.responsibilities),
        requirements: convertTextToList(formData.requirements),
      };

      await updateJob(jobId, payload);

      setSuccess("Job updated successfully.");

      setTimeout(() => {
        navigate("/myPostedJobs");
      }, 1000);
    } catch (err) {
      console.log("Update job error:", err);
      setError(err.response?.data || "Failed to update job.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9ff] text-slate-950">
        <Navbar />

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-52 left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
          <div className="absolute bottom-[-200px] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />
        </div>

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_25px_70px_rgba(37,99,235,0.08)] p-8 sm:p-12 text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-[1.7rem] bg-blue-500/10 blur-xl animate-pulse" />

              <div className="relative w-20 h-20 rounded-[1.7rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 animate-pulse">
                <BriefcaseBusiness size={34} />
              </div>
            </div>

            <h2 className="mt-7 text-2xl font-black tracking-tight">
              Loading job details
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your job editing workspace...
            </p>

            <div className="mt-7 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-[5%] w-[560px] h-[560px] rounded-full bg-blue-500/[0.08] blur-[160px]" />

        <div className="absolute top-[30%] -right-56 w-[560px] h-[560px] rounded-full bg-indigo-500/[0.08] blur-[160px]" />

        <div className="absolute bottom-[-250px] left-[25%] w-[500px] h-[500px] rounded-full bg-cyan-400/[0.06] blur-[160px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Header */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_70px_rgba(37,99,235,0.08)]
            p-6 sm:p-8 lg:p-10
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-blue-500/[0.08] blur-3xl" />

            <div className="absolute -bottom-32 left-[40%] w-72 h-72 rounded-full bg-indigo-500/[0.08] blur-3xl" />

            <div className="hidden lg:block absolute right-[18%] top-9 w-20 h-20 rounded-[2rem] border border-blue-200/50 rotate-[20deg]" />

            <div className="hidden lg:block absolute right-[31%] bottom-8 w-12 h-12 rounded-2xl bg-indigo-500/[0.05] border border-indigo-200/30 rotate-[28deg]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

            <div className="max-w-2xl">
              <Link
                to="/myPostedJobs"
                className="
                  inline-flex items-center gap-2
                  text-sm font-bold text-slate-500
                  transition-all duration-300
                  hover:text-blue-600
                  hover:-translate-x-1
                "
              >
                <ArrowLeft size={17} />
                Back to My Posted Jobs
              </Link>

              <div
                className="
                  mt-6 inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-blue-50 border border-blue-100
                "
              >
                <Sparkles size={16} className="text-blue-600" />

                <span className="text-xs sm:text-sm font-black text-blue-600">
                  Recruiter Workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Edit your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  job opportunity.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                Keep your job posting accurate and attractive for the right
                candidates. Update the important details and publish your
                changes when you're ready.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Layers3 size={17} className="text-blue-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Professional Job Editor
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 size={17} className="text-emerald-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Changes saved securely
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Visual - Hidden on Small Mobile */}
            <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">
              <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

              <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl shadow-blue-500/25 rotate-[-7deg] transition-transform duration-500 hover:rotate-0" />

              <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-[2rem] bg-white border border-white shadow-xl flex items-center justify-center">
                <EditIcon />
              </div>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 sm:mb-8 flex items-start gap-3 rounded-[1.5rem] bg-red-50/90 border border-red-100 px-5 py-4 text-sm font-semibold text-red-600 shadow-sm">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 sm:mb-8 flex items-start gap-3 rounded-[1.5rem] bg-emerald-50/90 border border-emerald-100 px-5 py-4 text-sm font-semibold text-emerald-700 shadow-sm">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6 sm:space-y-7">

          {/* Basic Information */}
          <FormSection
            icon={BriefcaseBusiness}
            eyebrow="STEP 01"
            title="Basic Information"
            description="The core information candidates see first."
          >
            <div className="grid lg:grid-cols-2 gap-5">
              <InputBox
                label="Job Title"
                icon={BriefcaseBusiness}
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Product Manager"
                full
              />

              <InputBox
                label="Company Name"
                icon={Building2}
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="TechVision Solutions"
              />

              <InputBox
                label="Job Location"
                icon={MapPin}
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore, India"
              />
            </div>
          </FormSection>

          {/* Job Details */}
          <FormSection
            icon={ListChecks}
            eyebrow="STEP 02"
            title="Job Details"
            description="Define the role, experience, compensation, and openings."
          >
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              <SelectBox
                label="Job Type"
                icon={Clock3}
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                options={[
                  "Full Time",
                  "Part Time",
                  "Contract",
                  "Internship",
                  "Remote",
                ]}
              />

              <SelectBox
                label="Experience Required"
                icon={GraduationCap}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                options={[
                  "Fresher",
                  "1 - 3 Years",
                  "3 - 5 Years",
                  "5+ Years",
                ]}
              />

              <InputBox
                label="Number of Openings"
                icon={Users}
                name="openings"
                type="number"
                value={formData.openings}
                onChange={handleChange}
                placeholder="3"
              />

              <InputBox
                label="Minimum Salary"
                icon={IndianRupee}
                name="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="600000"
              />

              <InputBox
                label="Maximum Salary"
                icon={IndianRupee}
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="1200000"
              />
            </div>
          </FormSection>

          {/* Skills */}
          <FormSection
            icon={Tags}
            eyebrow="STEP 03"
            title="Required Skills"
            description="Separate each skill with a comma so candidates can quickly understand the role."
          >
            <InputBox
              label="Skills"
              icon={Tags}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Spring Boot, Java, SQL, REST API"
              hideLabel
            />

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles size={14} className="text-blue-500" />
              Example: React, JavaScript, Spring Boot, MySQL
            </div>
          </FormSection>

          {/* Description */}
          <FormSection
            icon={FileText}
            eyebrow="STEP 04"
            title="Job Description"
            description="Provide enough information to help candidates understand the opportunity."
          >
            <div className="space-y-5">
              <TextareaBox
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a clear description about the job..."
              />

              <TextareaBox
                label="Responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Define roadmap, gather requirements, collaborate with teams..."
              />

              <TextareaBox
                label="Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Technical knowledge, communication skills, relevant experience..."
              />
            </div>
          </FormSection>

          {/* Actions */}
          <div
            className="
              relative overflow-hidden
              rounded-[2rem]
              bg-white/85 backdrop-blur-xl
              border border-white
              shadow-[0_18px_55px_rgba(15,23,42,0.07)]
              p-5 sm:p-6
            "
          >
            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-blue-500/[0.06] blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div>
                <p className="text-sm font-black text-slate-800">
                  Ready to publish your changes?
                </p>

                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Your updated job information will replace the current posting.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <Link
                  to="/myPostedJobs"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5 rounded-2xl
                    bg-slate-100 border border-slate-200
                    text-slate-700 text-sm font-black
                    transition-all duration-300
                    hover:bg-slate-200
                    hover:-translate-y-0.5
                  "
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={updating}
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-7 py-3.5 rounded-2xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
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
                  <Save
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  {updating ? "Updating..." : "Update Job"}

                  {!updating && (
                    <Send
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

const EditIcon = () => {
  return (
    <div className="relative">
      <BriefcaseBusiness size={42} className="text-blue-600" />
      <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-xl bg-slate-950 border-4 border-white flex items-center justify-center">
        <Save size={14} className="text-white" />
      </div>
    </div>
  );
};

const FormSection = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}) => {
  return (
    <section
      className="
        group relative overflow-hidden
        rounded-[2rem] sm:rounded-[2.2rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_15px_45px_rgba(15,23,42,0.06)]
        p-5 sm:p-7 lg:p-8
        transition-all duration-500
        hover:shadow-[0_22px_60px_rgba(37,99,235,0.09)]
      "
    >
      <div className="absolute -top-24 -right-20 w-48 h-48 rounded-full bg-blue-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">

        <div className="flex items-start gap-4 mb-7">

          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-[1.3rem] bg-blue-500/10 blur-lg" />

            <div
              className="
                relative w-12 h-12 sm:w-14 sm:h-14
                rounded-[1.25rem]
                bg-gradient-to-br from-blue-500 to-indigo-700
                text-white
                shadow-lg shadow-blue-500/15
                flex items-center justify-center
                transition-transform duration-500
                group-hover:rotate-[-5deg]
                group-hover:scale-105
              "
            >
              <Icon size={23} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-black tracking-[0.16em] text-blue-600">
              {eyebrow}
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight">
              {title}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
};

const InputBox = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  full = false,
  hideLabel = false,
}) => {
  return (
    <div className={full ? "lg:col-span-2" : ""}>
      {!hideLabel && (
        <label className="block text-sm font-bold text-slate-700 mb-2.5">
          {label}
        </label>
      )}

      <div
        className="
          group flex items-center gap-3
          bg-slate-50/80
          rounded-2xl px-4 py-4
          border border-slate-100
          transition-all duration-300
          focus-within:bg-white
          focus-within:border-blue-300
          focus-within:ring-4
          focus-within:ring-blue-500/[0.06]
          hover:border-blue-200
        "
      >
        <div
          className="
            w-9 h-9 shrink-0 rounded-xl
            bg-white border border-slate-100
            flex items-center justify-center
            transition-all duration-300
            group-focus-within:bg-blue-50
            group-focus-within:border-blue-100
          "
        >
          <Icon
            size={18}
            className="
              text-slate-400
              transition-colors duration-300
              group-focus-within:text-blue-600
            "
          />
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full bg-transparent outline-none
            text-sm font-medium text-slate-700
            placeholder:text-slate-400
          "
        />
      </div>
    </div>
  );
};

const SelectBox = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2.5">
        {label}
      </label>

      <div className="relative group">

        <div
          className="
            absolute left-4 top-1/2 -translate-y-1/2
            w-9 h-9 rounded-xl
            bg-white border border-slate-100
            flex items-center justify-center
            pointer-events-none
            transition-all duration-300
            group-focus-within:bg-blue-50
            group-focus-within:border-blue-100
          "
        >
          <Icon
            size={18}
            className="
              text-slate-400
              transition-colors duration-300
              group-focus-within:text-blue-600
            "
          />
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="
            w-full appearance-none
            bg-slate-50/80
            rounded-2xl
            pl-16 pr-12 py-4
            border border-slate-100
            outline-none
            text-sm font-medium text-slate-700
            transition-all duration-300
            hover:border-blue-200
            focus:bg-white
            focus:border-blue-300
            focus:ring-4
            focus:ring-blue-500/[0.06]
          "
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-slate-400 pointer-events-none
          "
        />
      </div>
    </div>
  );
};

const TextareaBox = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2.5">
        {label}
      </label>

      <div
        className="
          group rounded-2xl
          bg-slate-50/80
          border border-slate-100
          transition-all duration-300
          hover:border-blue-200
          focus-within:bg-white
          focus-within:border-blue-300
          focus-within:ring-4
          focus-within:ring-blue-500/[0.06]
          overflow-hidden
        "
      >
        <textarea
          rows="5"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full bg-transparent
            px-4 py-4
            outline-none
            text-sm font-medium text-slate-700
            placeholder:text-slate-400
            resize-y
            min-h-[130px]
          "
        />

        <div className="flex justify-end px-4 pb-3">
          <span className="text-[10px] font-bold text-slate-300">
            {value?.length || 0} characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditJob;

