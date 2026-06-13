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
      <div className="min-h-screen bg-[#f8fbff] text-slate-950">
        <Navbar />
        <main className="max-w-7xl mx-auto px-5 py-10">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 text-center text-slate-500 font-semibold">
            Loading job details...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <Link
            to="/myPostedJobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 mb-5"
          >
            <ArrowLeft size={17} />
            Back to My Posted Jobs
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              Recruiter Panel
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Edit Job
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
            Update job details and keep your posting accurate for candidates.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl bg-green-50 border border-green-100 px-5 py-4 text-sm font-semibold text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <BriefcaseBusiness size={22} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Basic Information</h2>
                <p className="text-sm text-slate-500">
                  Update main job details.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
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
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <ListChecks size={22} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Job Details</h2>
                <p className="text-sm text-slate-500">
                  Update role type, salary, experience, and openings.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <SelectBox
                label="Job Type"
                icon={Clock3}
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                options={["Full Time", "Part Time", "Contract", "Internship", "Remote"]}
              />

              <SelectBox
                label="Experience Required"
                icon={GraduationCap}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                options={["Fresher", "1 - 3 Years", "3 - 5 Years", "5+ Years"]}
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

              <InputBox
                label="Number of Openings"
                icon={Users}
                name="openings"
                type="number"
                value={formData.openings}
                onChange={handleChange}
                placeholder="3"
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <Tags size={22} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Required Skills</h2>
                <p className="text-sm text-slate-500">
                  Write skills separated by comma.
                </p>
              </div>
            </div>

            <InputBox
              label="Skills"
              icon={Tags}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Product Management, Agile, Scrum"
              hideLabel
            />
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText size={22} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Description</h2>
                <p className="text-sm text-slate-500">
                  Update description, responsibilities, and requirements.
                </p>
              </div>
            </div>

            <TextareaBox
              label="Job Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write job description..."
            />

            <TextareaBox
              label="Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Define roadmap, Gather requirements, Work with teams"
            />

            <TextareaBox
              label="Requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Agile knowledge, Communication skills, Data analysis"
            />
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={updating}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {updating ? "Updating..." : "Update Job"}
            </button>

            <Link
              to="/myPostedJobs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
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
    <div className={full ? "md:col-span-2" : ""}>
      {!hideLabel && (
        <label className="block text-sm font-bold text-slate-700 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
        <Icon size={20} className="text-slate-400" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

const SelectBox = ({ label, icon: Icon, name, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <Icon
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
};

const TextareaBox = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="mt-5">
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>

      <textarea
        rows="5"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
      />
    </div>
  );
};

export default EditJob;