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
  ArrowRight,
  TrendingUp,
  IndianRupee,
  ExternalLink,
  CircleUserRound,
  ShieldCheck,
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

  const profileCompletion = () => {
    const fields = [
      profile?.phone,
      profile?.location,
      profile?.title,
      profile?.experience,
      profile?.expectedSalary,
      profile?.resumeUrl,
      profile?.portfolioUrl,
      profile?.linkedinUrl,
      profile?.githubUrl,
    ];

    const completedFields =
      fields.filter((field) => field).length + (skills.length > 0 ? 1 : 0);

    return Math.round((completedFields / 10) * 100);
  };

  const completion = profileCompletion();

  return (
    <div className="relative min-h-screen bg-[#f7faff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Desktop Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden lg:block absolute -top-52 -right-52 w-[40rem] h-[40rem] rounded-full bg-blue-200/25 blur-3xl" />

        <div className="hidden xl:block absolute top-[52rem] -left-48 w-[34rem] h-[34rem] rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="hidden xl:block absolute top-64 right-[4%] w-28 h-28 rounded-[2rem] border border-blue-200/40 rotate-12" />

        <div className="hidden xl:block absolute top-[68rem] left-[3%] w-20 h-20 rounded-3xl border border-indigo-200/40 -rotate-12" />
      </div>

      {loading && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-10 sm:p-14 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl border-4 border-blue-100 border-t-blue-600 animate-spin" />

            <h2 className="mt-5 text-lg font-extrabold">
              Loading your profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we prepare your professional information.
            </p>
          </div>
        </main>
      )}

      {!loading && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          {/* Premium Profile Hero */}
          <section className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/60">

            <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="absolute -bottom-40 left-[20%] w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

                {/* User Details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">

                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">

                    <div className="w-full h-full rounded-[1.7rem] bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                      <UserRound
                        size={42}
                        className="text-blue-300"
                      />
                    </div>

                    <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-emerald-500 border-4 border-slate-950 flex items-center justify-center">
                      <BadgeCheck
                        size={17}
                        className="text-white"
                      />
                    </div>

                  </div>

                  <div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                      <Sparkles
                        size={14}
                        className="text-blue-300"
                      />

                      <span className="text-xs font-bold text-blue-100">
                        Candidate Profile
                      </span>
                    </div>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {userName}
                    </h1>

                    <p className="mt-2 text-sm sm:text-base font-semibold text-blue-300">
                      {displayValue(profile?.title, "Job Seeker")}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">

                      <span className="flex items-center gap-2">
                        <Mail size={15} />
                        {userEmail}
                      </span>

                      {profile?.location && (
                        <span className="flex items-center gap-2">
                          <MapPin size={15} />
                          {profile.location}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* Hero Actions */}
                <div className="flex flex-col sm:flex-row gap-3">

                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-500 active:scale-[0.98] transition"
                    >
                      <Edit3 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditMode(false)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition"
                    >
                      <X size={18} />
                      Cancel Edit
                    </button>
                  )}

                </div>

              </div>

              {/* Mobile Stats */}
              <div className="mt-7 grid grid-cols-3 gap-3 sm:hidden">

                <HeroStat
                  value={skills.length}
                  label="Skills"
                />

                <HeroStat
                  value={`${completion}%`}
                  label="Complete"
                />

                <HeroStat
                  value={profile?.resumeUrl ? "Yes" : "No"}
                  label="Resume"
                />

              </div>

            </div>

          </section>

          {/* Alerts */}
          {error && (
            <div className="mt-6 rounded-[1.4rem] bg-red-50 border border-red-100 px-5 py-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-center gap-3 rounded-[1.4rem] bg-emerald-50 border border-emerald-100 px-5 py-4 text-sm font-semibold text-emerald-700">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* Main Layout */}
          <section className="grid xl:grid-cols-[320px_minmax(0,1fr)] gap-7 lg:gap-8 mt-7 lg:mt-8">

            {/* Desktop Sidebar */}
            <aside className="hidden xl:block space-y-6">

              {/* Profile Completion */}
              <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-bold">
                      Profile Strength
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Complete your profile
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <TrendingUp
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                </div>

                <div className="mt-7 flex items-end justify-between">

                  <span className="text-4xl font-extrabold text-slate-950">
                    {completion}%
                  </span>

                  <span className="text-xs font-bold text-blue-600">
                    Completion
                  </span>

                </div>

                <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden">

                  <div
                    style={{ width: `${completion}%` }}
                    className="h-full rounded-full bg-blue-600 transition-all"
                  />

                </div>

              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <CircleUserRound
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-extrabold">
                      Contact Info
                    </h2>

                    <p className="text-xs text-slate-500">
                      Your details
                    </p>
                  </div>

                </div>

                <div className="space-y-4">

                  <ContactItem
                    icon={Mail}
                    value={userEmail}
                  />

                  <ContactItem
                    icon={Phone}
                    value={displayValue(profile?.phone)}
                  />

                  <ContactItem
                    icon={MapPin}
                    value={displayValue(profile?.location)}
                  />

                </div>

              </div>

              {/* Professional Links */}
              <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6">

                <h2 className="font-extrabold">
                  Professional Links
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your professional presence
                </p>

                <div className="mt-5 space-y-3">

                  <ProfileLink
                    icon={LinkIcon}
                    label="LinkedIn"
                    url={profile?.linkedinUrl}
                  />

                  <ProfileLink
                    icon={Code2}
                    label="GitHub"
                    url={profile?.githubUrl}
                  />

                  <ProfileLink
                    icon={Globe}
                    label="Portfolio"
                    url={profile?.portfolioUrl}
                  />

                </div>

              </div>

            </aside>

            {/* Main Content */}
            <section className="space-y-7">

              {/* Mobile Completion Card */}
              <div className="xl:hidden bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <TrendingUp
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <h2 className="font-extrabold">
                        Profile Strength
                      </h2>

                      <p className="text-xs text-slate-500">
                        Complete more details to improve visibility.
                      </p>
                    </div>

                  </div>

                  <span className="text-2xl font-extrabold text-blue-600">
                    {completion}%
                  </span>

                </div>

                <div className="mt-5 h-2.5 rounded-full bg-slate-100 overflow-hidden">

                  <div
                    style={{ width: `${completion}%` }}
                    className="h-full rounded-full bg-blue-600"
                  />

                </div>

              </div>

              {!editMode ? (
                <>

                  {/* Basic Details */}
                  <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm p-5 sm:p-7">

                    <SectionHeader
                      icon={UserRound}
                      title="Professional Details"
                      description="Your basic information visible in your candidate profile."
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">

                      <ProfileInfo
                        icon={Mail}
                        label="Email Address"
                        value={userEmail}
                      />

                      <ProfileInfo
                        icon={Phone}
                        label="Phone"
                        value={profile?.phone}
                      />

                      <ProfileInfo
                        icon={MapPin}
                        label="Location"
                        value={profile?.location}
                      />

                      <ProfileInfo
                        icon={BriefcaseBusiness}
                        label="Professional Title"
                        value={profile?.title}
                      />

                      <ProfileInfo
                        icon={TrendingUp}
                        label="Experience"
                        value={profile?.experience}
                      />

                      <ProfileInfo
                        icon={IndianRupee}
                        label="Expected Salary"
                        value={
                          profile?.expectedSalary
                            ? `₹${profile.expectedSalary}`
                            : null
                        }
                      />

                    </div>

                  </section>

                  {/* Skills */}
                  <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm p-5 sm:p-7">

                    <SectionHeader
                      icon={Tags}
                      title="Skills & Expertise"
                      description="Skills help recruiters discover you and improve job matching."
                    />

                    {skills.length > 0 ? (
                      <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">

                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-bold text-blue-700 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 transition-all"
                          >
                            <Code2
                              size={15}
                              className="group-hover:text-white"
                            />
                            {skill}
                          </span>
                        ))}

                      </div>
                    ) : (
                      <div className="mt-7 rounded-[1.4rem] bg-slate-50 border border-slate-100 p-7 text-center">

                        <Tags
                          size={24}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-bold text-slate-600">
                          No skills added yet
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Add your technical and professional skills to improve
                          your profile.
                        </p>

                      </div>
                    )}

                  </section>

                  {/* Resume */}
                  <section className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-sm p-5 sm:p-7">

                    <SectionHeader
                      icon={FileText}
                      title="Resume"
                      description="Your resume information from the application process."
                    />

                    <div className="mt-7 relative overflow-hidden rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5 sm:p-6">

                      <div className="absolute -top-12 -right-10 w-32 h-32 rounded-full bg-blue-100/40 blur-2xl" />

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                        <div className="flex items-center gap-4 min-w-0">

                          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                            <FileText
                              size={25}
                              className="text-blue-600"
                            />
                          </div>

                          <div className="min-w-0">

                            <h3 className="font-extrabold text-slate-950 truncate">
                              {profile?.resumeUrl
                                ? profile.resumeUrl
                                : "No resume uploaded"}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              Resume path stored in your profile.
                            </p>

                          </div>

                        </div>

                        <span
                          className={`inline-flex self-start sm:self-center items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold whitespace-nowrap ${
                            profile?.resumeUrl
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                              : "bg-amber-50 border-amber-100 text-amber-700"
                          }`}
                        >
                          <CheckCircle2 size={15} />

                          {profile?.resumeUrl
                            ? "Resume Active"
                            : "Not Added"}
                        </span>

                      </div>

                    </div>

                  </section>

                  {/* Mobile Contact & Links */}
                  <section className="xl:hidden grid sm:grid-cols-2 gap-5">

                    <div className="bg-white rounded-[1.6rem] border border-slate-100 shadow-sm p-5">

                      <h2 className="font-extrabold">
                        Contact Information
                      </h2>

                      <div className="mt-5 space-y-4">

                        <ContactItem
                          icon={Mail}
                          value={userEmail}
                        />

                        <ContactItem
                          icon={Phone}
                          value={displayValue(profile?.phone)}
                        />

                        <ContactItem
                          icon={MapPin}
                          value={displayValue(profile?.location)}
                        />

                      </div>

                    </div>

                    <div className="bg-white rounded-[1.6rem] border border-slate-100 shadow-sm p-5">

                      <h2 className="font-extrabold">
                        Professional Links
                      </h2>

                      <div className="mt-5 space-y-3">

                        <ProfileLink
                          icon={LinkIcon}
                          label="LinkedIn"
                          url={profile?.linkedinUrl}
                        />

                        <ProfileLink
                          icon={Code2}
                          label="GitHub"
                          url={profile?.githubUrl}
                        />

                        <ProfileLink
                          icon={Globe}
                          label="Portfolio"
                          url={profile?.portfolioUrl}
                        />

                      </div>

                    </div>

                  </section>

                </>
              ) : (

                /* Edit Profile */
                <form
                  onSubmit={handleUpdateProfile}
                  className="bg-white rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-100 shadow-xl shadow-blue-100/40 overflow-hidden"
                >

                  {/* Edit Header */}
                  <div className="relative overflow-hidden bg-slate-950 text-white p-6 sm:p-8">

                    <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-blue-600/25 blur-3xl" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                          <Edit3
                            size={22}
                            className="text-blue-300"
                          />
                        </div>

                        <div>
                          <h2 className="text-2xl font-extrabold">
                            Edit Profile
                          </h2>

                          <p className="mt-1 text-sm text-slate-300">
                            Keep your professional information updated.
                          </p>
                        </div>

                      </div>

                      <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-blue-200">
                        <ShieldCheck size={16} />
                        Your information is securely stored
                      </div>

                    </div>

                  </div>

                  <div className="p-5 sm:p-7 lg:p-8">

                    {/* Personal Information */}
                    <div>

                      <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <UserRound
                            size={19}
                            className="text-blue-600"
                          />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg">
                            Basic Information
                          </h3>

                          <p className="text-xs text-slate-500">
                            Your professional and contact details.
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
                          icon={Phone}
                        />

                        <InputField
                          label="Location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Bangalore, India"
                          icon={MapPin}
                        />

                        <InputField
                          label="Professional Title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Full Stack Developer"
                          icon={BriefcaseBusiness}
                        />

                        <InputField
                          label="Experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Fresher"
                          icon={TrendingUp}
                        />

                        <InputField
                          label="Expected Salary"
                          name="expectedSalary"
                          type="number"
                          value={formData.expectedSalary}
                          onChange={handleChange}
                          placeholder="500000"
                          icon={IndianRupee}
                        />

                      </div>

                    </div>

                    {/* Links */}
                    <div className="mt-9 pt-8 border-t border-slate-100">

                      <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                          <Globe
                            size={19}
                            className="text-indigo-600"
                          />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg">
                            Professional Links
                          </h3>

                          <p className="text-xs text-slate-500">
                            Showcase your work and professional profiles.
                          </p>
                        </div>

                      </div>

                      <div className="grid md:grid-cols-2 gap-5">

                        <InputField
                          label="Portfolio URL"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleChange}
                          placeholder="https://portfolio.com"
                          icon={Globe}
                        />

                        <InputField
                          label="LinkedIn URL"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                          icon={LinkIcon}
                        />

                        <InputField
                          label="GitHub URL"
                          name="githubUrl"
                          value={formData.githubUrl}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                          icon={Code2}
                        />

                      </div>

                    </div>

                    {/* Skills */}
                    <div className="mt-9 pt-8 border-t border-slate-100">

                      <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Tags
                            size={19}
                            className="text-blue-600"
                          />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg">
                            Skills
                          </h3>

                          <p className="text-xs text-slate-500">
                            Separate multiple skills using commas.
                          </p>
                        </div>

                      </div>

                      <div>

                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          placeholder="Java, Spring Boot, React, MySQL"
                          rows="5"
                          className="w-full bg-slate-50 rounded-[1.3rem] px-5 py-4 border border-slate-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition"
                        />

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-9 pt-7 border-t border-slate-100 flex flex-col sm:flex-row gap-3">

                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
                      >
                        <Save size={18} />

                        {saving
                          ? "Saving Changes..."
                          : "Save Profile"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
                      >
                        <X size={18} />
                        Cancel
                      </button>

                    </div>

                  </div>

                </form>

              )}

            </section>

          </section>

        </main>
      )}
    </div>
  );
};

const HeroStat = ({ value, label }) => {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-3 text-center">
      <p className="text-lg font-extrabold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-300">
        {label}
      </p>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Icon
          size={21}
          className="text-blue-600"
        />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

const ContactItem = ({
  icon: Icon,
  value,
}) => {
  return (
    <div className="flex items-center gap-3 min-w-0">

      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Icon
          size={18}
          className="text-blue-600"
        />
      </div>

      <p className="text-sm font-medium text-slate-600 truncate">
        {value}
      </p>

    </div>
  );
};

const ProfileLink = ({
  icon: Icon,
  label,
  url,
}) => {
  if (!url) {
    return (
      <div className="w-full flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400">

        <span className="flex items-center gap-3 text-sm font-bold">
          <Icon size={17} />
          {label}
        </span>

        <span className="text-[10px] font-bold">
          Not added
        </span>

      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group w-full flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition"
    >

      <span className="flex items-center gap-3 text-sm font-bold">
        <Icon size={17} />
        {label}
      </span>

      <ExternalLink
        size={16}
        className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition"
      />

    </a>
  );
};

const ProfileInfo = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="group rounded-[1.3rem] bg-slate-50 border border-slate-100 p-4 hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50 transition">

      <div className="flex items-center justify-between gap-3">

        <p className="text-xs font-bold text-slate-400">
          {label}
        </p>

        <Icon
          size={16}
          className="text-slate-300 group-hover:text-blue-600 transition"
        />

      </div>

      <h3 className="mt-3 font-extrabold text-slate-900 break-words">
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
  icon: Icon,
}) => {
  return (
    <div>

      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-slate-50 rounded-xl ${
            Icon ? "pl-11 pr-4" : "px-4"
          } py-3.5 border border-slate-100 outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition`}
        />

      </div>

    </div>
  );
};

export default CandidateProfile;
