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
} from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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
    <div className="min-h-screen bg-[#f8fbff] text-slate-950 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-blue-100/60 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Branding Section */}
          <div className="relative bg-slate-950 text-white p-8 sm:p-10 lg:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 h-full flex flex-col justify-between gap-12">
              <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                    <BriefcaseBusiness size={24} />
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight">
                    Smart<span className="text-blue-400">Job</span>
                  </h1>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                  <Sparkles size={16} className="text-blue-300" />
                  <span className="text-sm font-bold text-blue-100">
                    Welcome back
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  Login to manage your career journey.
                </h2>

                <p className="mt-5 text-slate-300 leading-relaxed max-w-md">
                  Access jobs, applications, dashboards, and recruiter tools from
                  one clean Smart Job Portal.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <Users size={24} className="text-blue-300" />
                  <h3 className="mt-3 font-bold">Candidates</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Apply and track jobs
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <Building2 size={24} className="text-blue-300" />
                  <h3 className="mt-3 font-bold">Recruiters</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Manage hiring
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <ShieldCheck size={24} className="text-blue-300" />
                  <h3 className="mt-3 font-bold">Secure</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Role based access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <LockKeyhole size={27} className="text-blue-600" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Login
                </h2>

                <p className="mt-2 text-slate-500">
                  Enter your credentials to access your account.
                </p>
              </div>
              {error && (
                <div className="mb-5 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <Mail size={20} className="text-slate-400" />
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

                {/* password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      {/* Forgot Password? */}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <LockKeyhole size={20} className="text-slate-400" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Remember
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    Remember me
                  </label>
                </div> */}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Login
                  <ArrowRight size={18} />
                </button>
              </form>

               <p className="mt-8 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link className="font-bold text-blue-600 hover:text-blue-700"
                  to="/register">
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