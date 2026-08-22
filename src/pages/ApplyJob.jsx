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

} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob, getJobById, getCandidateProfile } from "../services/jobService";

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
      console.log("Candidate profile not found yet. First time applying.");
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

    // if (!formData.phone || !formData.currentLocation || !formData.coverLetter) {
    //   setError("Please fill phone, current location, and cover letter.");
    //   return;
    // }

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
console.log("TOKEN AFTER APPLY:", localStorage.getItem("token"));


      setSuccess(result || "Application submitted successfully.");

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

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      {loading && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-slate-500 font-semibold shadow-sm">
            Loading application page...
          </div>
        </main>
      )}

      {!loading && error && !job && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="bg-red-50 rounded-2xl border border-red-100 p-6 text-center text-red-600 font-semibold">
            {error}
          </div>
        </main>
      )}

      {!loading && job && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-600">
                Job Application
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Apply for this Job
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
              Fill in your details carefully before submitting your application.
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

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-[1fr_360px] gap-8"
          >
            {/* Main Form */}
            <div className="space-y-6">
              {/* Candidate Basic Details */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <UserRound size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Candidate Details</h2>
                    <p className="text-sm text-slate-500">
                      These details will be saved in your candidate profile.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* phone */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <Phone size={20} className="text-slate-400" />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* currentLocation */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Current Location
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <MapPinned size={20} className="text-slate-400" />
                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        placeholder="Bangalore, India"
                        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <GraduationCap size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Professional Details
                    </h2>
                    <p className="text-sm text-slate-500">
                      Add your experience and salary expectation.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* experience */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Experience
                    </label>

                    <div className="relative">
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full appearance-none bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700"
                      >
                        <option>Fresher</option>
                        <option>1 - 2 Years</option>
                        <option>2 - 4 Years</option>
                        <option>4 - 6 Years</option>
                        <option>6+ Years</option>
                      </select>

                      <GraduationCap
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* expectedSalary */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Expected Salary
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <BadgeDollarSign
                        size={20}
                        className="text-slate-400"
                      />
                      <input
                        type="number"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        placeholder="500000"
                        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* portfolioUrl */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Portfolio URL
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <LinkIcon size={20} className="text-slate-400" />
                      <input
                        type="text"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://portfolio.com"
                        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* linkedinUrl */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      LinkedIn URL
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <LinkIcon size={20} className="text-slate-400" />
                      <input
                        type="text"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* githubUrl */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      GitHub URL
                    </label>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
                      <LinkIcon size={20} className="text-slate-400" />
                      <input
                        type="text"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
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
                    <h2 className="text-2xl font-bold">Skills</h2>
                    <p className="text-sm text-slate-500">
                      Add skills separated by comma.
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
                    placeholder="Java, Spring Boot, React, MySQL"
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

              {/* Resume and Cover Letter */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Resume & Cover Letter
                    </h2>
                    <p className="text-sm text-slate-500">
                      Upload resume and write a short cover letter.
                    </p>
                  </div>
                </div>

                {/* resume */}
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Upload Resume
                </label>

                <div className="border-2 border-dashed border-blue-100 bg-blue-50/40 rounded-[1.5rem] p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-blue-100 flex items-center justify-center shadow-sm">
                    <Upload size={26} className="text-blue-600" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-950">
                    Upload your resume
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    PDF, DOC, or DOCX file supported
                  </p>

                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="mt-5 block mx-auto text-sm text-slate-500"
                  />

                  {formData.resume && (
                    <p className="mt-3 text-sm font-semibold text-blue-600">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>

                {/* coverLetter */}
                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Cover Letter
                  </label>

                  <textarea
                    rows="7"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Write a short cover letter for this job..."
                    className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>

            {/* Right Job Summary */}
            <aside className="space-y-6">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <BriefcaseBusiness size={26} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold">{job.title}</h2>
                    <p className="text-sm text-slate-500">{job.company}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <Building2 size={18} className="text-blue-600" />
                    {job.company}
                  </p>

                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin size={18} className="text-blue-600" />
                    {job.location}
                  </p>

                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock3 size={18} className="text-orange-600" />
                    {job.jobType || "Not specified"}
                  </p>

                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <IndianRupee size={18} className="text-green-600" />
                    {formatSalary()}
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-sm font-bold text-blue-600">
                    Application Status
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Your application will be marked as{" "}
                    <span className="font-bold">Pending</span> after
                    submission.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <CheckCircle2 size={24} />
                </div>

                <h2 className="text-xl font-bold">Before Applying</h2>

                <div className="mt-4 space-y-3 text-sm text-slate-300 leading-relaxed">
                  <p className="flex gap-2">
                    <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                    Check your resume before uploading.
                  </p>

                  <p className="flex gap-2">
                    <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                    Make sure your phone number is correct.
                  </p>

                  <p className="flex gap-2">
                    <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                    Write a short and clear cover letter.
                  </p>
                </div>
              </div>
            </aside>
          </form>
        </main>
      )}
    </div>
  );
};

export default ApplyJob;