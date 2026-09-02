import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import {
  BriefcaseBusiness,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/adminDashboard");
      } else if (data.role === "RECRUITER") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(getErrorMessage(err, "Invalid email or password"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-950 flex items-center justify-center px-4 sm:px-6 py-5 sm:py-10">

      <div className="w-full max-w-6xl bg-white sm:rounded-[2rem] lg:rounded-[2.5rem] sm:border sm:border-slate-100 sm:shadow-2xl sm:shadow-blue-100/60 overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* Left Branding Section - Desktop Only */}
          <div className="relative hidden lg:block bg-slate-950 text-white p-12 overflow-hidden">

            {/* Background Effects */}
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
                    Welcome back
                  </span>

                </div>

                <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight max-w-lg">
                  Login to manage your
                  <span className="block text-blue-400 mt-2">
                    career journey.
                  </span>
                </h2>

                <p className="mt-6 text-slate-300 leading-relaxed max-w-md">
                  Access jobs, applications, dashboards, and recruiter tools
                  from one clean and secure SmartJob Portal.
                </p>

              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Users size={21} className="text-blue-300" />
                  </div>

                  <h3 className="mt-4 font-bold text-sm">
                    Candidates
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Apply and track jobs
                  </p>

                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Building2 size={21} className="text-blue-300" />
                  </div>

                  <h3 className="mt-4 font-bold text-sm">
                    Recruiters
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Manage hiring easily
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

          {/* Right Login Form */}
          <div className="relative p-0 sm:p-8 lg:p-12">

            {/* Mobile Background Decoration */}
            <div className="absolute top-0 right-0 lg:hidden w-52 h-52 bg-blue-100/60 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 max-w-md mx-auto py-5 sm:py-4 lg:py-8">

              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center gap-3 mb-10">

                <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                  <BriefcaseBusiness size={22} />
                </div>

                <h1 className="text-xl font-extrabold tracking-tight">
                  Smart<span className="text-blue-600">Job</span>
                </h1>

              </div>

              {/* Form Heading */}
              <div className="mb-8 sm:mb-10">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  <LockKeyhole size={25} className="text-blue-600" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
                  Enter your credentials to access your SmartJob account.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-3.5 text-sm font-semibold text-red-600">

                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />

                  <span>{error}</span>

                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Email */}
                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">

                    <Mail
                      size={20}
                      className="text-slate-400 group-focus-within:text-blue-600 transition"
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

                {/* Password */}
                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label className="block text-sm font-bold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                    >
                      {/* Forgot Password? */}
                    </button>

                  </div>

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
                      placeholder="Enter your password"
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
                >
                  Login
                  <ArrowRight size={18} />
                </button>

              </form>

              {/* Register */}
              <p className="mt-8 text-center text-sm text-slate-500">

                Don&apos;t have an account?{" "}

                <Link
                  className="font-bold text-blue-600 hover:text-blue-700 transition"
                  to="/register"
                >
                  Register now
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
