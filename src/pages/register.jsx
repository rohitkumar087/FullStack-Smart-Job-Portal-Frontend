import { useState } from "react";
import { registerUser } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Eye,
  EyeOff,
  UserPlus,
  BadgeCheck,
  MapPin,
  Globe,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // phone: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      const result = await registerUser(payload);

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
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-950 flex items-center justify-center px-4 sm:px-6 py-5 sm:py-10">

      <div className="w-full max-w-6xl bg-white sm:rounded-[2rem] lg:rounded-[2.5rem] sm:border sm:border-slate-100 sm:shadow-2xl sm:shadow-blue-100/60 overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* Left Branding Section - Desktop Only */}
          <div className="relative hidden lg:block bg-slate-950 text-white p-12 overflow-hidden">

            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 h-full flex flex-col justify-between gap-16">

              <div>

                {/* Logo */}
                <div className="flex items-center gap-3 mb-14">

                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
                    <BriefcaseBusiness size={25} />
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight">
                    Smart<span className="text-blue-400">Job</span>
                  </h1>

                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-7">

                  <Sparkles size={16} className="text-blue-300" />

                  <span className="text-sm font-semibold text-blue-100">
                    Create your account
                  </span>

                </div>

                <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight max-w-lg">
                  Start your journey
                  <span className="block text-blue-400 mt-2">
                    with SmartJob.
                  </span>
                </h2>

                <p className="mt-6 text-slate-300 leading-relaxed max-w-md">
                  Register as a candidate to discover opportunities or as a
                  recruiter to post jobs and manage applications.
                </p>

              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Users size={21} className="text-blue-300" />
                  </div>

                  <h3 className="mt-4 font-bold text-sm">
                    Candidate
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Find and apply for jobs
                  </p>

                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Building2 size={21} className="text-blue-300" />
                  </div>

                  <h3 className="mt-4 font-bold text-sm">
                    Recruiter
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Post jobs and hire talent
                  </p>

                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <ShieldCheck size={21} className="text-blue-300" />
                  </div>

                  <h3 className="mt-4 font-bold text-sm">
                    Secure
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Role based access
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right Register Form */}
          <div className="relative p-0 sm:p-8 lg:p-12">

            {/* Mobile Background Decoration */}
            <div className="absolute top-0 right-0 lg:hidden w-52 h-52 bg-blue-100/60 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 max-w-md mx-auto py-5 sm:py-4 lg:py-8">

              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center gap-3 mb-9">

                <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                  <BriefcaseBusiness size={22} />
                </div>

                <h1 className="text-xl font-extrabold tracking-tight">
                  Smart<span className="text-blue-600">Job</span>
                </h1>

              </div>

              {/* Form Heading */}
              <div className="mb-7 sm:mb-9">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  <UserPlus size={25} className="text-blue-600" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Create account
                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
                  {isRecruiter
                    ? "Create your recruiter account and add your company details."
                    : "Create your account and start exploring new opportunities."}
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-3.5 text-sm font-semibold text-red-600">

                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />

                  <span>{error}</span>

                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-3.5 text-sm font-semibold text-green-700">

                  <BadgeCheck
                    size={19}
                    className="text-green-600 shrink-0 mt-0.5"
                  />

                  <span>{success}</span>

                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Role */}
                <div>

                  <div className="flex items-center justify-between mb-3">

                    <label className="block text-sm font-bold text-slate-700">
                      Register As
                    </label>

                    <span className="text-[11px] font-semibold text-slate-400">
                      Choose your account type
                    </span>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition-all duration-200 ${
                        formData.role === "CANDIDATE"
                          ? "bg-blue-50 border-blue-300 ring-4 ring-blue-50"
                          : "bg-slate-50 border-slate-200 hover:border-blue-100"
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
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          formData.role === "CANDIDATE"
                            ? "bg-blue-600 text-white"
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

                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition-all duration-200 ${
                        formData.role === "RECRUITER"
                          ? "bg-blue-50 border-blue-300 ring-4 ring-blue-50"
                          : "bg-slate-50 border-slate-200 hover:border-blue-100"
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
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          formData.role === "RECRUITER"
                            ? "bg-blue-600 text-white"
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
                          Post jobs and hire
                        </p>

                      </div>

                      {formData.role === "RECRUITER" && (
                        <BadgeCheck
                          size={18}
                          className="absolute top-3 right-3 text-blue-600"
                        />
                      )}

                    </label>

                  </div>

                </div>

                {/* Full Name */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">

                    <UserRound
                      size={20}
                      className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                  </div>

                </div>

                {/* Email */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">

                    <Mail
                      size={20}
                      className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                  </div>

                </div>

                {/* Recruiter Company Details */}
                {isRecruiter && (
                  <div className="space-y-5 rounded-3xl bg-blue-50/60 border border-blue-100 p-4 sm:p-5">

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Building2 size={19} />
                      </div>

                      <div>

                        <h3 className="text-sm font-extrabold text-slate-900">
                          Company Details
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          Add your company information to complete the recruiter
                          profile.
                        </p>

                      </div>

                    </div>

                    {/* Company Name */}
                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Name
                      </label>

                      <div className="group flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">

                        <Building2
                          size={20}
                          className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />

                      </div>

                    </div>

                    {/* Company Website */}
                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Website
                      </label>

                      <div className="group flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">

                        <Globe
                          size={20}
                          className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={handleChange}
                          placeholder="https://company.com"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />

                      </div>

                    </div>

                    {/* Company Location */}
                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Location
                      </label>

                      <div className="group flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">

                        <MapPin
                          size={20}
                          className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                        />

                        <input
                          type="text"
                          name="companyLocation"
                          value={formData.companyLocation}
                          onChange={handleChange}
                          placeholder="Pune, India"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />

                      </div>

                    </div>

                    {/* Company Description */}
                    <div>

                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Description
                      </label>

                      <div className="group flex items-start gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">

                        <FileText
                          size={20}
                          className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0 mt-0.5"
                        />

                        <textarea
                          name="companyDescription"
                          value={formData.companyDescription}
                          onChange={handleChange}
                          placeholder="Write a short company description"
                          rows="4"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                        />

                      </div>

                    </div>

                  </div>
                )}

                {/* Password */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">

                    <LockKeyhole
                      size={20}
                      className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-blue-600 transition shrink-0"
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

                {/* Confirm Password */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">

                    <LockKeyhole
                      size={20}
                      className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-400 hover:text-blue-600 transition shrink-0"
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

                {/* Terms */}
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
                      className="font-bold text-blue-600 hover:text-blue-700 transition"
                    >
                      Terms & Conditions
                    </button>{" "}

                    and{" "}

                    <button
                      type="button"
                      className="font-bold text-blue-600 hover:text-blue-700 transition"
                    >
                      Privacy Policy
                    </button>

                    .

                  </span>

                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
                >
                  Create Account
                  <ArrowRight size={18} />
                </button>

              </form>

              <p className="mt-8 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  className="font-bold text-blue-600 hover:text-blue-700 transition"
                  to="/login"
                >
                  Login now
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;

