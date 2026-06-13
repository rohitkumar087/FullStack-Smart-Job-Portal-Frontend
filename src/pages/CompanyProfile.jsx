import React, { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  BadgeCheck,
  FileText,
  Clock3,
  UserRound,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { getMyCompanyProfile } from "../services/jobService";

const CompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCompanyProfile();
      setCompanyProfile(data);
    } catch (err) {
      setError(
        err.response?.data ||
          "Unable to load company details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const getStatusConfig = (status) => {
    if (status === "VERIFIED") {
      return {
        label: "Verified",
        message:
          "Your company is verified by admin. You can post jobs on the platform.",
        badge: "bg-green-50 text-green-700 border-green-100",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        Icon: CheckCircle2,
      };
    }

    if (status === "REJECTED") {
      return {
        label: "Rejected",
        message:
          "Your company verification was rejected. Please contact admin or update company details later.",
        badge: "bg-red-50 text-red-700 border-red-100",
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        Icon: XCircle,
      };
    }

    return {
      label: "Pending Review",
      message:
        "Your company profile is under admin review. You can post jobs after verification.",
      badge: "bg-yellow-50 text-yellow-700 border-yellow-100",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      Icon: Clock3,
    };
  };

  const displayValue = (value, fallback = "Not added") => {
    return value ? value : fallback;
  };

  const statusConfig = getStatusConfig(companyProfile?.recruiterStatus);
  const StatusIcon = statusConfig.Icon;

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-600">
              My Company Details
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Company Details
              </h1>

              <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
                View your registered company information and verification status.
                Company approval is managed by admin.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchCompanyProfile}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </section>

        {loading && (
          <div className="bg-white rounded-[2rem] border border-gray-100 p-6 text-center text-slate-500 font-semibold shadow-sm">
            Loading company details...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 rounded-[2rem] border border-red-100 p-6 text-red-600 font-semibold flex items-center gap-3">
            <AlertCircle size={22} />
            {error}
          </div>
        )}

        {!loading && !error && companyProfile && (
          <section className="grid lg:grid-cols-[360px_1fr] gap-8">
            {/* Left Sidebar */}
            <aside className="space-y-6">
              {/* Company Card */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 text-center">
                <div className="relative w-28 h-28 mx-auto">
                  <div className="w-28 h-28 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Building2 size={56} className="text-blue-600" />
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl border flex items-center justify-center ${statusConfig.iconBg}`}
                  >
                    <StatusIcon size={22} className={statusConfig.iconColor} />
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-extrabold">
                  {displayValue(companyProfile.companyName, "Company Name")}
                </h2>

                <p className="mt-2">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${statusConfig.badge}`}
                  >
                    <StatusIcon size={15} />
                    {statusConfig.label}
                  </span>
                </p>

                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  {displayValue(
                    companyProfile.companyDescription,
                    "Company description is not added yet."
                  )}
                </p>
              </div>

              {/* Verification Status */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl ${statusConfig.iconBg} flex items-center justify-center`}
                  >
                    <StatusIcon size={22} className={statusConfig.iconColor} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">Verification Status</h2>
                    <p className="text-sm text-slate-500">
                      Controlled by admin
                    </p>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${statusConfig.badge}`}>
                  <p className="text-sm font-semibold leading-relaxed">
                    {statusConfig.message}
                  </p>
                </div>
              </div>

              {/* Recruiter Contact */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-5">Recruiter Details</h2>

                <div className="space-y-4">
                  <InfoRow
                    icon={UserRound}
                    value={displayValue(companyProfile.recruiter?.name)}
                  />

                  <InfoRow
                    icon={Mail}
                    value={displayValue(companyProfile.recruiter?.email)}
                  />

                  <InfoRow
                    icon={MapPin}
                    value={displayValue(companyProfile.location)}
                  />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="space-y-6">
              {/* Company Details */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Building2 size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Registered Company</h2>
                    <p className="text-sm text-slate-500">
                      These details were submitted during recruiter registration.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <ProfileInfo
                    label="Company Name"
                    value={companyProfile.companyName}
                  />

                  <ProfileInfo
                    label="Company Location"
                    value={companyProfile.location}
                  />

                  <ProfileInfo
                    label="Company Website"
                    value={companyProfile.website}
                  />

                  <ProfileInfo
                    label="Verification Status"
                    value={companyProfile.recruiterStatus}
                  />

                  <ProfileInfo
                    label="Recruiter Name"
                    value={companyProfile.recruiter?.name}
                  />

                  <ProfileInfo
                    label="Recruiter Email"
                    value={companyProfile.recruiter?.email}
                  />
                </div>
              </div>

              {/* About Company */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">About Company</h2>
                    <p className="text-sm text-slate-500">
                      Company description visible to admin for verification.
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {displayValue(
                    companyProfile.description,
                    "No company description added yet."
                  )}
                </p>
              </div>

              {/* Company Website */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Globe size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Company Website</h2>
                    <p className="text-sm text-slate-500">
                      Website submitted for company verification.
                    </p>
                  </div>
                </div>

                {companyProfile.website ? (
                  <a
                    href={companyProfile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                  >
                    <Globe size={18} />
                    Visit Website
                  </a>
                ) : (
                  <div className="rounded-2xl bg-yellow-50 border border-yellow-100 px-5 py-4 text-sm font-semibold text-yellow-700">
                    Company website is not added.
                  </div>
                )}
              </div>

              {/* Admin Note */}
              <div className="bg-slate-950 rounded-[2rem] shadow-xl shadow-slate-200 p-6 sm:p-8 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">Admin Verification</h2>

                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      Recruiter company verification is handled by admin. If
                      your company is pending, please wait for admin approval.
                      Once verified, you can post jobs and manage applications.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}
      </main>
    </div>
  );
};

const InfoRow = ({ icon: Icon, value }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-blue-600" />
      </div>
      {value}
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

export default CompanyProfile;