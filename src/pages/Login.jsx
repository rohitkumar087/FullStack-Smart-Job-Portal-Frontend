import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";

import {
  BriefcaseBusiness,
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Search,
  FileCheck2,
  Building2,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Background */}

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

      {/* Main Container */}

      <div className="relative z-10 w-full max-w-6xl">
        {/* Desktop 3D layers */}

        <div className="hidden lg:block absolute inset-0 rounded-[2.5rem] bg-blue-100/60 rotate-[1.2deg] translate-y-3 translate-x-2" />

        <div className="hidden lg:block absolute inset-0 rounded-[2.5rem] bg-indigo-100/50 -rotate-[0.8deg] translate-y-2 -translate-x-2" />

        {/* Mobile 3D layers */}

        <div className="lg:hidden absolute inset-0 rounded-[2.5rem] bg-blue-100/70 rotate-[2deg] translate-y-3 translate-x-2" />

        <div className="lg:hidden absolute inset-0 rounded-[2.5rem] bg-indigo-100/60 -rotate-[1.5deg] translate-y-2 -translate-x-2" />

        <div
          className="
            relative
            overflow-hidden
            rounded-[2.5rem]
            bg-white
            border border-white
            shadow-[0_30px_80px_rgba(15,23,42,0.12)]
            lg:grid
            lg:grid-cols-[1fr_1fr]
            lg:min-h-[650px]
          "
        >
          {/* ================= DESKTOP BRANDING SECTION ================= */}

          <div
            className="
              relative
              hidden
              lg:flex
              overflow-hidden
              flex-col
              justify-between
              p-10
              xl:p-12
              text-white
              bg-gradient-to-br
              from-slate-950
              via-slate-900
              to-indigo-950
            "
          >
            {/* Subtle background glow */}

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-blue-500/15 blur-[100px]" />

            <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-[120px]" />

            <div
              className="
                absolute inset-0 opacity-[0.04]
                bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
                bg-[size:45px_45px]
              "
            />

            {/* Decorative 3D shapes */}

            <div className="absolute top-24 right-16 w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] rotate-[20deg] shadow-2xl" />

            <div className="absolute bottom-32 right-20 w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-300/10 rotate-[35deg]" />

            {/* Top Logo */}

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
                    flex
                    items-center
                    justify-center
                    shadow-xl
                    shadow-blue-950/40
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

            {/* Main text */}

            <div className="relative z-10 my-auto pt-10">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3.5
                  py-2
                  rounded-full
                  bg-white/[0.06]
                  border
                  border-white/10
                  backdrop-blur-md
                "
              >
                <Sparkles size={15} className="text-blue-300" />

                <span className="text-xs font-bold text-blue-100">
                  Smart opportunities. Better careers.
                </span>
              </div>

              <h2
                className="
                  mt-7
                  max-w-md
                  text-5xl
                  xl:text-[3.5rem]
                  leading-[1.08]
                  font-black
                  tracking-tight
                "
              >
                Build your career.

                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Move forward.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                Discover meaningful opportunities, connect with companies,
                and manage your professional journey from one simple platform.
              </p>

              {/* Feature List */}

              <div className="mt-9 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <Search size={17} className="text-blue-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Discover the right opportunities
                    </p>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Find jobs that match your skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <FileCheck2 size={17} className="text-indigo-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Track your applications
                    </p>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Stay updated throughout your journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center">
                    <Building2 size={17} className="text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Connect with companies
                    </p>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Explore opportunities from recruiters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom trust */}

            <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-blue-400" />

              <span>Secure access to your professional workspace</span>
            </div>
          </div>

          {/* ================= LOGIN SECTION ================= */}

          <div
            className="
              relative
              flex
              items-center
              px-6
              py-8
              sm:px-10
              sm:py-10
              lg:px-10
              xl:px-14
              bg-white
            "
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />

            <div className="absolute -bottom-32 -left-24 w-64 h-64 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md mx-auto">
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
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        shadow-blue-500/20
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

              {/* Header */}

              <div className="mt-10 lg:mt-0">
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3.5
                    py-2
                    rounded-full
                    bg-blue-50
                    border
                    border-blue-100
                  "
                >
                  <Sparkles size={14} className="text-blue-600" />

                  <span className="text-xs font-bold text-blue-700">
                    Welcome back
                  </span>
                </div>

                <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                  Login to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your details to continue your professional journey.
                </p>
              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="
                    mt-7
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    bg-red-50
                    border
                    border-red-100
                    px-4
                    py-4
                  "
                >
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertCircle size={18} className="text-red-600" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-red-700">
                      Login failed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-500">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* FORM */}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* EMAIL */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Email Address
                  </label>

                  <div
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      transition-all
                      duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div
                      className="
                        w-10 h-10 shrink-0 rounded-xl
                        bg-white border border-slate-100
                        flex items-center justify-center
                        shadow-sm
                        transition-all duration-300
                        group-focus-within:bg-blue-600
                        group-focus-within:border-blue-600
                      "
                    >
                      <Mail
                        size={18}
                        className="
                          text-slate-400
                          transition-colors duration-300
                          group-focus-within:text-white
                        "
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        outline-none
                        text-sm
                        font-medium
                        text-slate-700
                        placeholder:text-slate-400
                      "
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="block mb-2.5 text-sm font-bold text-slate-700">
                    Password
                  </label>

                  <div
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      transition-all
                      duration-300
                      focus-within:bg-white
                      focus-within:border-blue-400
                      focus-within:ring-4
                      focus-within:ring-blue-50
                    "
                  >
                    <div
                      className="
                        w-10 h-10 shrink-0 rounded-xl
                        bg-white border border-slate-100
                        flex items-center justify-center
                        shadow-sm
                        transition-all duration-300
                        group-focus-within:bg-indigo-600
                        group-focus-within:border-indigo-600
                      "
                    >
                      <LockKeyhole
                        size={18}
                        className="
                          text-slate-400
                          transition-colors duration-300
                          group-focus-within:text-white
                        "
                      />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        outline-none
                        text-sm
                        font-medium
                        text-slate-700
                        placeholder:text-slate-400
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        w-10 h-10 shrink-0
                        rounded-xl
                        flex items-center justify-center
                        text-slate-400
                        hover:bg-blue-50
                        hover:text-blue-600
                        transition-all duration-300
                      "
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

                {/* LOGIN BUTTON */}

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
                    {loading ? "Logging in..." : "Login to your account"}

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
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="
                      font-black
                      text-blue-600
                      transition
                      hover:text-indigo-600
                    "
                  >
                    Create account
                  </Link>
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck size={14} className="text-blue-500" />

                  <span>Secure and protected access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;