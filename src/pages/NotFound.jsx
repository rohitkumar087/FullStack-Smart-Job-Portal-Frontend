import React from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Home,
  Search,
  ArrowLeft,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <section className="relative bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-blue-100/50 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/70 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/70 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-600">
                  Page Not Found
                </span>
              </div>

              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-blue-600">
                404
              </h1>

              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Oops! This page does not exist.
              </h2>

              <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">
                The page you are looking for may have been removed, renamed, or
                the URL might be incorrect. You can go back home or explore job
                listings.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  <Home size={18} />
                  Go to Home
                </Link>

                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                >
                  <Search size={18} />
                  Browse Jobs
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-100 text-slate-700 text-sm font-bold hover:bg-slate-50 transition"
                >
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </div>
            </div>

            {/* Right Illustration Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-5 bg-blue-100/80 rounded-[3rem] rotate-3 shadow-xl shadow-blue-100 hidden sm:block" />

              <div className="relative w-full max-w-[430px] bg-white rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-100/70 p-8">
                <div className="w-20 h-20 rounded-[1.7rem] bg-red-50 border border-red-100 flex items-center justify-center mb-8">
                  <AlertTriangle size={42} className="text-red-500" />
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-48 bg-slate-200 rounded-full" />
                  <div className="h-4 w-64 bg-slate-100 rounded-full" />
                  <div className="h-4 w-52 bg-slate-100 rounded-full" />
                </div>

                <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <BriefcaseBusiness size={24} className="text-white" />
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-950">
                        SmartJob
                      </h3>
                      <p className="text-sm text-slate-500">
                        Find the right page again.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-2xl bg-slate-50 border border-gray-100" />
                  <div className="h-20 rounded-2xl bg-blue-50 border border-blue-100" />
                  <div className="h-20 rounded-2xl bg-slate-50 border border-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;