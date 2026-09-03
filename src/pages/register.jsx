import { useState } from "react";
import { registerUser } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import { useNavigate, Link } from "react-router-dom";

import {
  BriefcaseBusiness,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  UserPlus,
  BadgeCheck,
  MapPin,
  Globe,
  FileText,
  Building2,
  Search,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "CANDIDATE",
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyDescription: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const isRecruiter = formData.role === "RECRUITER";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Please accept Terms & Conditions");
      return;
    }

    if (isRecruiter) {
      if (
        !formData.companyName.trim() ||
        !formData.companyLocation.trim() ||
        !formData.companyDescription.trim()
      ) {
        setError(
          "Please fill company name, company location, and company description."
        );
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyName: isRecruiter ? formData.companyName : null,
        companyWebsite: isRecruiter ? formData.companyWebsite : null,
        companyLocation: isRecruiter ? formData.companyLocation : null,
        companyDescription: isRecruiter
          ? formData.companyDescription
          : null,
      };

      await registerUser(payload);

      setSuccess("Account created successfully. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Email already exists");
      } else {
        setError(getErrorMessage(err, "Registration failed"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-blue-400/10 blur-[120px]" />

        <div className="absolute top-[10%] -right-40 w-[450px] h-[450px] rounded-full bg-indigo-400/10 blur-[130px]" />

        <div className="absolute -bottom-48 left-[25%] w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[140px]" />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            bg-[linear-gradient(rgba(15,23,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.7)_1px,transparent_1px)]
            bg-[size:42px_42px]
          "
        />

        <div className="hidden lg:block absolute top-[15%] left-[7%] w-16 h-16 rounded-2xl border border-blue-200/70 rotate-[25deg]" />

        <div className="hidden lg:block absolute bottom-[14%] right-[8%] w-20 h-20 rounded-full border border-indigo-200/70" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}

      <div className="relative z-10 w-full max-w-6xl">
        {/* Desktop 3D layers */}

        <div className="hidden lg:block absolute inset-0 rounded-[2.5rem] bg-blue-100/60 rotate-[1.2deg] translate-y-3 translate-x-2" />

        <div className="hidden lg:block absolute inset-0 rounded-[2.5rem] bg-indigo-100/50 -rotate-[0.8deg] translate-y-2 -translate-x-2" />

        {/* Mobile 3D layers */}

        <div className="lg:hidden absolute inset-0 rounded-[2.5rem] bg-blue-100/70 rotate-[2deg] translate-y-3 translate-x-2" />

        <div className="lg:hidden absolute inset-0 rounded-[2.5rem] bg-indigo-100/60 -rotate-[1.5deg] translate-y-2 -translate-x-2" />

        <div
          className="
            relative overflow-hidden
            rounded-[2.5rem]
            bg-white
            border border-white
            shadow-[0_30px_80px_rgba(15,23,42,0.12)]
            lg:grid lg:grid-cols-[0.95fr_1.05fr]
          "
        >
          {/* ================= DESKTOP BRANDING ================= */}

          <div
            className="
              relative hidden lg:flex
              overflow-hidden
              flex-col
              justify-between
              p-10 xl:p-12
              text-white
              bg-gradient-to-br
              from-slate-950
              via-slate-900
              to-indigo-950
            "
          >
            {/* Background effects */}

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-blue-500/15 blur-[100px]" />

            <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-[120px]" />

            <div
              className="
                absolute inset-0 opacity-[0.04]
                bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
                bg-[size:45px_45px]
              "
            />

            {/* Decorative elements */}

            <div className="absolute top-24 right-16 w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] rotate-[20deg] shadow-2xl" />

            <div className="absolute bottom-32 right-20 w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-300/10 rotate-[35deg]" />

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 translate-y-1.5 translate-x-1 rounded-2xl bg-black/40" />

                <div
                  className="
                    relative
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    flex items-center justify-center
                    shadow-xl shadow-blue-950/40
                  "
                >
                  <BriefcaseBusiness size={27} />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  Smart<span className="text-blue-400">Job</span>
                </h1>

                <p className="text-xs text-slate-400 mt-0.5">
                  Your career starts here
                </p>
              </div>
            </div>

            {/* Main content */}

            <div className="relative z-10 my-auto py-12">
              <div
                className="
                  inline-flex items-center gap-2
                  px-3.5 py-2
                  rounded-full
                  bg-white/[0.06]
                  border border-white/10
                  backdrop-blur-md
                "
              >
                <Sparkles size={15} className="text-blue-300" />

                <span className="text-xs font-bold text-blue-100">
                  Start your professional journey
                </span>
              </div>

              <h2
                className="
                  mt-7
                  max-w-md
                  text-5xl
                  xl:text-[3.4rem]
                  leading-[1.08]
                  font-black
                  tracking-tight
                "
              >
                Create your future.

                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Start today.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                Create your SmartJob account to discover opportunities, build
                your professional presence, or connect with the right talent.
              </p>

              {/* Features */}

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <Search size={18} className="text-blue-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Explore new opportunities
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Discover jobs that match your skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <FileCheck2 size={18} className="text-indigo-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Build your professional journey
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Manage your opportunities in one place.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Simple and secure access
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Your account is ready when you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}

            <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-blue-400" />

              <span>Secure access to your SmartJob workspace</span>
            </div>
          </div>

          {/* ================= REGISTER FORM ================= */}

          <div className="relative bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-10 xl:px-14">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />

            <div className="absolute -bottom-32 -left-24 w-64 h-64 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg mx-auto">
              {/* MOBILE LOGO */}

              <div className="flex lg:hidden justify-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 translate-y-1.5 rounded-2xl bg-blue-200" />

                    <div
                      className="
                        relative
                        w-14 h-14
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500
                        to-indigo-600
                        text-white
                        flex items-center justify-center
                        shadow-lg shadow-blue-500/20
                      "
                    >
                      <BriefcaseBusiness size={27} />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-950">
                      Smart<span className="text-blue-600">Job</span>
                    </h1>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Your career starts here
                    </p>
                  </div>
                </div>
              </div>

              {/* HEADING */}

              <div className="mt-10 lg:mt-0">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3.5 py-2
                    rounded-full
                    bg-blue-50
                    border border-blue-100
                  "
                >
                  <UserPlus size={14} className="text-blue-600" />

                  <span className="text-xs font-bold text-blue-700">
                    Create your SmartJob account
                  </span>
                </div>

                <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                  Create account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {isRecruiter
                    ? "Create your recruiter account and tell us about your company."
                    : "Create your account and start exploring new opportunities."}
                </p>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-7 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-4">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertCircle size={18} className="text-red-600" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-red-700">
                      Registration failed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-500">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mt-7 flex items-start gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-4">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-green-100 flex items-center justify-center">
                    <BadgeCheck size={18} className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-green-700">
                      Success
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-600">
                      {success}
                    </p>
                  </div>
                </div>
              )}

              {/* ================= FORM ================= */}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* ROLE */}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-700">
                      Register as
                    </label>

                    <span className="text-[11px] font-semibold text-slate-400">
                      Choose account type
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Candidate */}

                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition-all duration-300 ${
                        formData.role === "CANDIDATE"
                          ? "bg-blue-50 border-blue-300 ring-4 ring-blue-50 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="CANDIDATE"
                        checked={formData.role === "CANDIDATE"}
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div
                        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all ${
                          formData.role === "CANDIDATE"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-white text-slate-500 border border-slate-100"
                        }`}
                      >
                        <UserRound size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Candidate
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Find and apply for jobs
                        </p>
                      </div>

                      {formData.role === "CANDIDATE" && (
                        <BadgeCheck
                          size={18}
                          className="absolute top-3 right-3 text-blue-600"
                        />
                      )}
                    </label>

                    {/* Recruiter */}

                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition-all duration-300 ${
                        formData.role === "RECRUITER"
                          ? "bg-indigo-50 border-indigo-300 ring-4 ring-indigo-50 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:border-indigo-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="RECRUITER"
                        checked={formData.role === "RECRUITER"}
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div
                        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all ${
                          formData.role === "RECRUITER"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                            : "bg-white text-slate-500 border border-slate-100"
                        }`}
                      >
                        <Building2 size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Recruiter
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Post jobs and hire talent
                        </p>
                      </div>

                      {formData.role === "RECRUITER" && (
                        <BadgeCheck
                          size={18}
                          className="absolute top-3 right-3 text-indigo-600"
                        />
                      )}
                    </label>
                  </div>
                </div>

                {/* FULL NAME */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Full Name
                  </label>

                  <div
                    className="
                      group flex items-center gap-3
                      rounded-2xl border border-slate-200
                      bg-slate-50 px-4 py-3.5
                      transition-all duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-all group-focus-within:bg-blue-600 group-focus-within:border-blue-600">
                      <UserRound
                        size={18}
                        className="text-slate-400 group-focus-within:text-white transition-colors"
                      />
                    </div>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Email Address
                  </label>

                  <div
                    className="
                      group flex items-center gap-3
                      rounded-2xl border border-slate-200
                      bg-slate-50 px-4 py-3.5
                      transition-all duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-all group-focus-within:bg-blue-600 group-focus-within:border-blue-600">
                      <Mail
                        size={18}
                        className="text-slate-400 group-focus-within:text-white transition-colors"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* ================= RECRUITER COMPANY DETAILS ================= */}

                {isRecruiter && (
                  <div className="space-y-5 rounded-[1.5rem] bg-slate-50 border border-slate-200 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-sm">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900">
                          Company Details
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Add your company information to complete your
                          recruiter profile.
                        </p>
                      </div>
                    </div>

                    {/* Company Name */}

                    <div>
                      <label className="block mb-2.5 text-sm font-bold text-slate-700">
                        Company Name
                      </label>

                      <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                        <Building2
                          size={18}
                          className="text-slate-400 group-focus-within:text-indigo-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Company Website */}

                    <div>
                      <label className="block mb-2.5 text-sm font-bold text-slate-700">
                        Company Website{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>

                      <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                        <Globe
                          size={18}
                          className="text-slate-400 group-focus-within:text-indigo-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={handleChange}
                          placeholder="https://company.com"
                          className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Company Location */}

                    <div>
                      <label className="block mb-2.5 text-sm font-bold text-slate-700">
                        Company Location
                      </label>

                      <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                        <MapPin
                          size={18}
                          className="text-slate-400 group-focus-within:text-indigo-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyLocation"
                          value={formData.companyLocation}
                          onChange={handleChange}
                          placeholder="Pune, India"
                          className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Company Description */}

                    <div>
                      <label className="block mb-2.5 text-sm font-bold text-slate-700">
                        Company Description
                      </label>

                      <div className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                        <FileText
                          size={18}
                          className="text-slate-400 group-focus-within:text-indigo-600 transition shrink-0 mt-0.5"
                        />

                        <textarea
                          name="companyDescription"
                          value={formData.companyDescription}
                          onChange={handleChange}
                          placeholder="Write a short company description"
                          rows="4"
                          className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PASSWORD */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Password
                  </label>

                  <div
                    className="
                      group flex items-center gap-3
                      rounded-2xl border border-slate-200
                      bg-slate-50 px-4 py-3.5
                      transition-all duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-all group-focus-within:bg-blue-600 group-focus-within:border-blue-600">
                      <LockKeyhole
                        size={18}
                        className="text-slate-400 group-focus-within:text-white transition-colors"
                      />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                      className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Confirm Password
                  </label>

                  <div
                    className="
                      group flex items-center gap-3
                      rounded-2xl border border-slate-200
                      bg-slate-50 px-4 py-3.5
                      transition-all duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-all group-focus-within:bg-blue-600 group-focus-within:border-blue-600">
                      <LockKeyhole
                        size={18}
                        className="text-slate-400 group-focus-within:text-white transition-colors"
                      />
                    </div>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      className="min-w-0 flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS */}

                <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600 rounded mt-0.5 shrink-0"
                  />

                  <span className="leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-bold text-blue-600 hover:text-indigo-600 transition"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-bold text-blue-600 hover:text-indigo-600 transition"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-slate-950
                    py-4
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    shadow-slate-950/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-600
                    hover:shadow-xl
                    hover:shadow-blue-500/20
                    active:scale-[0.99]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    disabled:hover:translate-y-0
                  "
                >
                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? "Creating account..." : "Create your account"}

                    {!loading && (
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </span>
                </button>
              </form>

              {/* FOOTER */}

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-black text-blue-600 hover:text-indigo-600 transition"
                  >
                    Login now
                  </Link>
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck size={14} className="text-blue-500" />

                  <span>Secure and protected registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;