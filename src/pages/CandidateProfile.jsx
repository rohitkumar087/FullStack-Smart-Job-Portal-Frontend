import React, { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  Edit3,
  Download,
  Sparkles,
  BadgeCheck,
  Tags,
  Code2,
  Link as LinkIcon,
  Globe,
  CheckCircle2,
  Save,
  X,
  Eye,
} from "lucide-react";
import Navbar from "../components/Navbar";
import {
  getCandidateProfile,
  updateCandidateProfile,
} from "../services/jobService";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    title: "",
    experience: "",
    expectedSalary: "",
    resumeUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const userName = localStorage.getItem("userName") || "Candidate";
const userEmail = localStorage.getItem("userEmail") || "Not added";
  useEffect(() => {
    fetchCandidateProfile();
  }, []);

  const fetchCandidateProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCandidateProfile();

      setProfile(data);

      setFormData({
        phone: data.phone || "",
        location: data.location || "",
        title: data.title || "",
        experience: data.experience || "",
        expectedSalary: data.expectedSalary || "",
        resumeUrl: data.resumeUrl || "",
        portfolioUrl: data.portfolioUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        githubUrl: data.githubUrl || "",
        skills: data.skills?.join(", ") || "",
      });
    } catch (err) {
      setError(
        err.response?.data ||
          "Profile not found. Apply for a job first or create your profile."
      );
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const payload = {
        phone: formData.phone,
        location: formData.location,
        title: formData.title,
        experience: formData.experience,
        expectedSalary: formData.expectedSalary
          ? Number(formData.expectedSalary)
          : null,
        resumeUrl: formData.resumeUrl,
        portfolioUrl: formData.portfolioUrl,
        linkedinUrl: formData.linkedinUrl,
        githubUrl: formData.githubUrl,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      };

      const updatedProfile = await updateCandidateProfile(payload);

      setProfile(updatedProfile);
      setSuccess("Profile updated successfully.");
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };



  const skills = profile?.skills || [];

  const displayValue = (value, fallback = "Not added") => {
    return value ? value : fallback;
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      {loading && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-slate-500 font-semibold shadow-sm">
            Loading candidate profile...
          </div>
        </main>
      )}

      {!loading && (
        <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <section className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-600">
                Candidate Profile
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  My Profile
                </h1>

                <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                  Manage your profile details, skills, resume, and professional
                  information.
                </p>
              </div>

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition shadow-sm"
                >
                  <X size={18} />
                  Cancel Edit
                </button>
              )}
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

          <section className="grid lg:grid-cols-[360px_1fr] gap-8">
            {/* Left Sidebar */}
            <aside className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 text-center">
                <div className="relative w-28 h-28 mx-auto">
                  <div className="w-28 h-28 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <UserRound size={56} className="text-blue-600" />
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <BadgeCheck size={22} className="text-green-600" />
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-extrabold">
                  {userName}
                </h2>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {displayValue(profile?.title, "Job Seeker")}
                </p>

                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {displayValue(
                    profile?.experience,
                    "Complete your profile to help recruiters understand your background."
                  )}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <h3 className="text-2xl font-extrabold text-blue-600">
                      {skills.length}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Skills
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
                    <h3 className="text-2xl font-extrabold text-blue-600">
                      {profile?.resumeUrl ? "Yes" : "No"}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Resume
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-5">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    {userEmail}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-blue-600" />
                    </div>
                    {displayValue(profile?.phone)}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-blue-600" />
                    </div>
                    {displayValue(profile?.location)}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-5">Links</h2>

                <div className="space-y-3">
                  <a
                    href={profile?.linkedinUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-3 text-sm font-bold">
                      <LinkIcon size={18} />
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href={profile?.githubUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-3 text-sm font-bold">
                      <Code2 size={18} />
                      GitHub
                    </span>
                  </a>

                  <a
                    href={profile?.portfolioUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-3 text-sm font-bold">
                      <Globe size={18} />
                      Portfolio
                    </span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="space-y-6">
              {!editMode ? (
                <>
                  {/* Basic Details */}
                  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                        <UserRound size={22} className="text-blue-600" />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">Basic Details</h2>
                        <p className="text-sm text-slate-500">
                          Share you basic details here.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <ProfileInfo label="Email" value={userEmail} />
                      <ProfileInfo label="Phone" value={profile?.phone} />
                      <ProfileInfo label="Location" value={profile?.location} />
                      <ProfileInfo label="Title" value={profile?.title} />
                      <ProfileInfo
                        label="Experience"
                        value={profile?.experience}
                      />
                      <ProfileInfo
                        label="Expected Salary"
                        value={
                          profile?.expectedSalary
                            ? `₹${profile.expectedSalary}`
                            : null
                        }
                      />
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
                          Skills used for job matching and recruiter search.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
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

                  {/* Resume */}
                  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                          <FileText size={22} className="text-blue-600" />
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold">Resume</h2>
                          <p className="text-sm text-slate-500">
                            Resume uploaded while applying for a job.
                          </p>
                        </div>
                      </div>

                      {/* {profile?.resumeUrl && (
                        <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition">
                          <Eye size={17} />
                          View Resume
                        </button>
                      )} */}
                    </div>

                    <div className="mt-6 p-5 rounded-[1.5rem] bg-slate-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center">
                          <FileText size={23} className="text-blue-600" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-950">
                            {profile?.resumeUrl
                              ? profile.resumeUrl
                              : "No resume uploaded"}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Resume path stored from backend.
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${
                          profile?.resumeUrl
                            ? "bg-green-50 border-green-100 text-green-700"
                            : "bg-yellow-50 border-yellow-100 text-yellow-700"
                        }`}
                      >
                        <CheckCircle2 size={15} />
                        {profile?.resumeUrl ? "Active" : "Not Added"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <form
                  onSubmit={handleUpdateProfile}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Edit3 size={22} className="text-blue-600" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">Edit Profile</h2>
                      <p className="text-sm text-slate-500">
                        Update candidate profile fields.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                    />

                    <InputField
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Bangalore, India"
                    />

                    <InputField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Full Stack Developer"
                    />

                    <InputField
                      label="Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Fresher"
                    />

                    <InputField
                      label="Expected Salary"
                      name="expectedSalary"
                      type="number"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      placeholder="500000"
                    />

                    {/* <InputField
                      label="Resume URL"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      placeholder="uploads/resume.pdf"
                    /> */}

                    <InputField
                      label="Portfolio URL"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://portfolio.com"
                    />

                    <InputField
                      label="LinkedIn URL"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />

                    <InputField
                      label="GitHub URL"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                    />

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Skills
                      </label>

                      <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Java, Spring Boot, React, MySQL"
                        rows="4"
                        className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition disabled:opacity-60"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Profile"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Work Experience Placeholder */}
              {/* <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BriefcaseBusiness size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Work Experience</h2>
                    <p className="text-sm text-slate-500">
                      Detailed experience history can be added later as a
                      separate backend feature.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-slate-50 border border-gray-100 p-5">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Current experience:{" "}
                    <span className="font-bold">
                      {displayValue(profile?.experience)}
                    </span>
                  </p>
                </div>
              </div> */}

              {/* Education Placeholder */}
              {/* <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <GraduationCap size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Education</h2>
                    <p className="text-sm text-slate-500">
                      Education module can be added later.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-slate-50 border border-gray-100 p-5">
                  <p className="text-sm text-slate-600">
                    Education details are not connected in backend yet.
                  </p>
                </div>
              </div> */}
            </section>
          </section>
        </main>
      )}
    </div>
  );
};

const ProfileInfo = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4">
      <p className="text-xs font-bold text-slate-400">{label}</p>
      <h3 className="mt-1 font-bold text-slate-900">
        {value || "Not added"}
      </h3>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 outline-none text-sm text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
};

export default CandidateProfile;