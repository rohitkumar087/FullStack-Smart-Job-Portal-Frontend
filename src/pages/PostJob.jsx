import React, { useState } from "react";
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
  CheckCircle2,
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

      const result = await createJob(payload);

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

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              Recruiter Panel
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Post a New Job
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                Create a detailed job post to attract the right candidates for
                your company.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-sm font-semibold text-slate-500">
                Job Status
              </p>
              <p className="mt-1 text-lg font-extrabold text-blue-600">
                Ready to Publish
              </p>
            </div>
          </div>
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

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-[1fr_360px] gap-8"
        >
          {/* Main Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BriefcaseBusiness size={22} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Basic Information</h2>
                  <p className="text-sm text-slate-500">
                    Add the main details about this job.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Job Title
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <BriefcaseBusiness size={20} className="text-slate-400" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Java Backend Developer"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Company Name
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <Building2 size={20} className="text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Tech Solutions Inc."
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Job Location
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <MapPin size={20} className="text-slate-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Bangalore, India"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ListChecks size={22} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Job Details</h2>
                  <p className="text-sm text-slate-500">
                    Add role type, salary, experience, and openings.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Job Type
                  </label>

                  <div className="relative">
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700"
                    >
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                      <option>Remote</option>
                    </select>

                    <Clock3
                      size={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Experience Required
                  </label>

                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700"
                    >
                      <option>Fresher</option>
                      <option>1 - 3 Years</option>
                      <option>3 - 5 Years</option>
                      <option>5+ Years</option>
                    </select>

                    <GraduationCap
                      size={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Minimum Salary
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <IndianRupee size={20} className="text-slate-400" />
                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={handleChange}
                      placeholder="500000"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Maximum Salary
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <IndianRupee size={20} className="text-slate-400" />
                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      placeholder="1000000"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Number of Openings
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                    <Users size={20} className="text-slate-400" />
                    <input
                      type="number"
                      name="openings"
                      value={formData.openings}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Tags size={22} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Required Skills</h2>
                  <p className="text-sm text-slate-500">
                    Add skills required for this position separated by comma.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                <Tags size={20} className="text-slate-400" />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Java, Spring Boot, MySQL"
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {previewSkills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {previewSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText size={22} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Job Description</h2>
                  <p className="text-sm text-slate-500">
                    Explain the role, work, responsibilities, and requirements.
                  </p>
                </div>
              </div>

              <textarea
                rows="7"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a detailed job description..."
                className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
              />

              <div className="mt-5">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Responsibilities
                </label>

                <textarea
                  rows="5"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Build APIs, Work with MySQL, Write clean code"
                  className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Requirements
                </label>

                <textarea
                  rows="5"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Good Java knowledge, Spring Boot basics, SQL understanding"
                  className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {submitting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </div>

          {/* Right Preview Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Job Preview</h2>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BriefcaseBusiness size={20} className="text-blue-600" />
                </div>
              </div>

              <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <BriefcaseBusiness size={26} className="text-blue-600" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-950">
                  {formData.title || "Job Title"}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {formData.company || "Company Name"}
                </p>

                <div className="mt-5 space-y-3">
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-blue-600" />
                    {formData.location || "Location"}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 size={16} className="text-orange-600" />
                    {formData.jobType}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap size={16} className="text-violet-600" />
                    {formData.experience}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <IndianRupee size={16} className="text-green-600" />
                    {formatSalary()}
                  </p>
                </div>

                {previewSkills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {previewSkills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="mt-6 w-full py-3 rounded-xl bg-slate-950 text-white text-sm font-bold"
                >
                  Preview Only
                </button>
              </div>
            </div>

            {/* Posting Tips */}
            <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <CheckCircle2 size={24} />
              </div>

              <h2 className="text-xl font-bold">Posting Tips</h2>

              <div className="mt-4 space-y-3 text-sm text-slate-300 leading-relaxed">
                <p className="flex gap-2">
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                  Use a clear and searchable job title.
                </p>

                <p className="flex gap-2">
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                  Add salary range to attract more candidates.
                </p>

                <p className="flex gap-2">
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                  Mention required skills and experience clearly.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default PostJob;