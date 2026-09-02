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
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  CircleCheckBig,
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
    <div className="min-h-screen bg-[#f6f9ff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Premium Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-[5%] w-[580px] h-[580px] rounded-full bg-blue-500/[0.08] blur-[170px]" />

        <div className="absolute top-[25%] -right-64 w-[620px] h-[620px] rounded-full bg-indigo-500/[0.08] blur-[180px]" />

        <div className="absolute bottom-[-280px] left-[28%] w-[550px] h-[550px] rounded-full bg-cyan-400/[0.06] blur-[180px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Hero Header */}
        <section
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[2.5rem]
            bg-white/85 backdrop-blur-xl
            border border-white
            shadow-[0_25px_75px_rgba(37,99,235,0.08)]
            p-6 sm:p-8 lg:p-10
            mb-7 sm:mb-9
          "
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-blue-500/[0.08] blur-3xl" />

            <div className="absolute -bottom-32 left-[35%] w-72 h-72 rounded-full bg-indigo-500/[0.07] blur-3xl" />

            <div className="hidden lg:block absolute right-[24%] top-12 w-20 h-20 rounded-[2rem] border border-blue-200/50 rotate-[22deg]" />

            <div className="hidden lg:block absolute right-[38%] bottom-8 w-12 h-12 rounded-2xl bg-indigo-500/[0.06] border border-indigo-200/40 rotate-[28deg]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

            <div className="max-w-2xl">
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-blue-50 border border-blue-100
                "
              >
                <Sparkles size={16} className="text-blue-600" />

                <span className="text-xs sm:text-sm font-black text-blue-600">
                  Recruiter Workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Your company,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  professionally presented.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
                Manage and review your registered company information,
                verification status, and recruiter details from one professional
                workspace.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Building2 size={17} className="text-blue-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Company Profile
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck size={17} className="text-indigo-600" />

                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    Admin Verification
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop 3D Company Visual */}
            <div className="hidden sm:flex relative shrink-0 w-36 h-36 lg:w-44 lg:h-44 items-center justify-center">
              <div className="absolute inset-0 rounded-[2.8rem] bg-blue-500/10 rotate-6 translate-y-3" />

              <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 shadow-2xl shadow-blue-500/25 rotate-[-7deg] transition-transform duration-500 hover:rotate-0" />

              <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-[2rem] bg-white border border-white shadow-xl flex items-center justify-center">
                <Building2 size={45} className="text-blue-600" />

                <div className="absolute -right-3 -bottom-3 w-10 h-10 rounded-2xl bg-slate-950 border-4 border-white flex items-center justify-center">
                  <BriefcaseBusiness size={17} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="relative mt-7 pt-6 border-t border-slate-100 flex justify-start sm:justify-end">
            <button
              type="button"
              onClick={fetchCompanyProfile}
              className="
                group inline-flex items-center justify-center gap-2
                px-5 sm:px-6 py-3
                rounded-2xl
                bg-white border border-slate-200
                text-sm font-black text-slate-700
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:text-blue-600
                hover:shadow-lg
                active:translate-y-0
              "
            >
              <RefreshCcw
                size={18}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
              Refresh Details
            </button>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <section className="max-w-2xl mx-auto">
            <div
              className="
                relative overflow-hidden
                bg-white/85 backdrop-blur-xl
                rounded-[2rem]
                border border-white
                shadow-[0_20px_60px_rgba(37,99,235,0.08)]
                p-8 sm:p-12
                text-center
              "
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-[1.7rem] bg-blue-500/10 blur-xl animate-pulse" />

                <div className="relative w-20 h-20 rounded-[1.7rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 animate-pulse">
                  <Building2 size={34} />
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black tracking-tight">
                Loading company details
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Preparing your company workspace...
              </p>

              <div className="mt-7 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
              </div>
            </div>
          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="
              max-w-2xl mx-auto
              rounded-[2rem]
              bg-red-50/90 backdrop-blur-xl
              border border-red-100
              p-6
              text-red-600
              shadow-sm
            "
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-red-100 flex items-center justify-center shrink-0">
                <AlertCircle size={23} />
              </div>

              <div>
                <h2 className="font-black text-lg">Unable to load profile</h2>

                <p className="mt-1 text-sm font-medium leading-relaxed">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchCompanyProfile}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black hover:underline"
                >
                  <RefreshCcw size={16} />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && companyProfile && (
          <section className="space-y-7 sm:space-y-8">

            {/* Mobile Company Overview */}
            <div className="lg:hidden">
              <CompanyOverview
                companyProfile={companyProfile}
                statusConfig={statusConfig}
                StatusIcon={StatusIcon}
                displayValue={displayValue}
              />
            </div>

            <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] gap-7 lg:gap-8">

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block space-y-6">

                {/* Company Identity */}
                <div
                  className="
                    relative overflow-hidden
                    rounded-[2rem]
                    bg-white/85 backdrop-blur-xl
                    border border-white
                    shadow-[0_18px_55px_rgba(37,99,235,0.08)]
                    p-6
                  "
                >
                  <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-blue-500/[0.08] blur-3xl" />

                  <div className="relative text-center">
                    <div className="relative w-28 h-28 mx-auto">
                      <div className="absolute inset-0 rounded-[2rem] bg-blue-500/10 rotate-6 translate-y-2" />

                      <div className="relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-lg shadow-blue-100/50">
                        <Building2 size={55} className="text-blue-600" />
                      </div>

                      <div
                        className={`
                          absolute -bottom-2 -right-2
                          w-11 h-11 rounded-2xl
                          border-4 border-white
                          flex items-center justify-center
                          shadow-lg
                          ${statusConfig.iconBg}
                        `}
                      >
                        <StatusIcon
                          size={21}
                          className={statusConfig.iconColor}
                        />
                      </div>
                    </div>

                    <h2 className="mt-6 text-2xl font-black tracking-tight">
                      {displayValue(
                        companyProfile.companyName,
                        "Company Name"
                      )}
                    </h2>

                    <div className="mt-3">
                      <span
                        className={`
                          inline-flex items-center gap-2
                          px-3.5 py-2 rounded-full border
                          text-xs font-black
                          ${statusConfig.badge}
                        `}
                      >
                        <StatusIcon size={15} />
                        {statusConfig.label}
                      </span>
                    </div>

                    <p className="mt-5 text-sm text-slate-500 leading-relaxed">
                      {displayValue(
                        companyProfile.companyDescription,
                        "Company description is not added yet."
                      )}
                    </p>
                  </div>
                </div>

                {/* Verification */}
                <StatusCard
                  statusConfig={statusConfig}
                  StatusIcon={StatusIcon}
                />

                {/* Recruiter */}
                <RecruiterCard
                  companyProfile={companyProfile}
                  displayValue={displayValue}
                />
              </aside>

              {/* Main Content */}
              <section className="space-y-7">

                {/* Company Details */}
                <ProfileSection
                  icon={Building2}
                  eyebrow="COMPANY INFORMATION"
                  title="Registered Company"
                  description="These details were submitted during recruiter registration."
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ProfileInfo
                      icon={Building2}
                      label="Company Name"
                      value={companyProfile.companyName}
                    />

                    <ProfileInfo
                      icon={MapPin}
                      label="Company Location"
                      value={companyProfile.location}
                    />

                    <ProfileInfo
                      icon={Globe}
                      label="Company Website"
                      value={companyProfile.website}
                    />

                    <ProfileInfo
                      icon={BadgeCheck}
                      label="Verification Status"
                      value={companyProfile.recruiterStatus}
                    />

                    <ProfileInfo
                      icon={UserRound}
                      label="Recruiter Name"
                      value={companyProfile.recruiter?.name}
                    />

                    <ProfileInfo
                      icon={Mail}
                      label="Recruiter Email"
                      value={companyProfile.recruiter?.email}
                    />
                  </div>
                </ProfileSection>

                {/* About Company */}
                <ProfileSection
                  icon={FileText}
                  eyebrow="COMPANY OVERVIEW"
                  title="About Company"
                  description="Your company information available for the verification process."
                >
                  <div
                    className="
                      relative overflow-hidden
                      rounded-[1.6rem]
                      bg-slate-50/80
                      border border-slate-100
                      p-5 sm:p-6
                    "
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />

                    <p className="pl-2 text-sm sm:text-base text-slate-600 leading-7">
                      {displayValue(
                        companyProfile.description,
                        "No company description added yet."
                      )}
                    </p>
                  </div>
                </ProfileSection>

                {/* Website */}
                <ProfileSection
                  icon={Globe}
                  eyebrow="DIGITAL PRESENCE"
                  title="Company Website"
                  description="The website submitted with your company verification details."
                >
                  {companyProfile.website ? (
                    <a
                      href={companyProfile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group relative overflow-hidden
                        flex flex-col sm:flex-row
                        sm:items-center sm:justify-between
                        gap-5
                        rounded-[1.7rem]
                        bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700
                        text-white
                        p-5 sm:p-6
                        shadow-xl shadow-blue-500/20
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-blue-500/25
                      "
                    >
                      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl" />

                      <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Globe size={23} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-blue-100">
                            OFFICIAL COMPANY WEBSITE
                          </p>

                          <p className="mt-1 font-black text-sm sm:text-base">
                            Visit your company website
                          </p>
                        </div>
                      </div>

                      <div className="relative w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight size={21} />
                      </div>
                    </a>
                  ) : (
                    <div className="rounded-[1.6rem] bg-yellow-50 border border-yellow-100 p-5 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-white border border-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                        <Globe size={21} />
                      </div>

                      <div>
                        <h3 className="font-black text-yellow-800">
                          Website not added
                        </h3>

                        <p className="mt-1 text-sm text-yellow-700 leading-relaxed">
                          Company website information is not available in your
                          profile.
                        </p>
                      </div>
                    </div>
                  )}
                </ProfileSection>

                {/* Admin Verification */}
                <section
                  className="
                    relative overflow-hidden
                    rounded-[2rem]
                    bg-slate-950
                    text-white
                    shadow-2xl shadow-slate-300/50
                    p-6 sm:p-8
                  "
                >
                  <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />

                  <div className="absolute -bottom-32 left-[30%] w-60 h-60 rounded-full bg-indigo-500/15 blur-3xl" />

                  <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">

                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-[1.3rem] bg-blue-500/30 blur-xl" />

                      <div className="relative w-14 h-14 rounded-[1.3rem] bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                        <ShieldCheck size={27} />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-black">
                          Admin Verification
                        </h2>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-black text-blue-200">
                          <CircleCheckBig size={14} />
                          SECURE REVIEW
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-slate-300 leading-7 max-w-2xl">
                        Recruiter company verification is handled by the admin.
                        Once your company is verified, you can post jobs and
                        manage applications on the platform.
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Layers3 size={15} />
                        Verification status is updated by the platform admin.
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const CompanyOverview = ({
  companyProfile,
  statusConfig,
  StatusIcon,
  displayValue,
}) => {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-[2rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_18px_55px_rgba(37,99,235,0.08)]
        p-6
      "
    >
      <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-blue-500/[0.08] blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-[1.5rem] bg-blue-500/10 rotate-6" />

          <div className="relative w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
            <Building2 size={38} className="text-blue-600" />
          </div>

          <div
            className={`
              absolute -bottom-2 -right-2
              w-9 h-9 rounded-xl
              border-4 border-white
              flex items-center justify-center
              ${statusConfig.iconBg}
            `}
          >
            <StatusIcon
              size={17}
              className={statusConfig.iconColor}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-tight truncate">
            {displayValue(
              companyProfile.companyName,
              "Company Name"
            )}
          </h2>

          <div className="mt-2">
            <span
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-full border
                text-[11px] font-black
                ${statusConfig.badge}
              `}
            >
              <StatusIcon size={13} />
              {statusConfig.label}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            {displayValue(
              companyProfile.companyDescription,
              "Company description is not added yet."
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">
        <StatusCard
          statusConfig={statusConfig}
          StatusIcon={StatusIcon}
          compact
        />
      </div>
    </section>
  );
};

const StatusCard = ({
  statusConfig,
  StatusIcon,
  compact = false,
}) => {
  return (
    <div
      className={
        compact
          ? "bg-slate-50/80 rounded-[1.5rem] p-4"
          : "bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm p-6"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            w-11 h-11 rounded-xl
            ${statusConfig.iconBg}
            flex items-center justify-center
            shrink-0
          `}
        >
          <StatusIcon
            size={22}
            className={statusConfig.iconColor}
          />
        </div>

        <div>
          <h2 className="font-black text-slate-900">
            Verification Status
          </h2>

          <p className="text-xs text-slate-500">
            Controlled by admin
          </p>
        </div>
      </div>

      <div
        className={`
          mt-4 rounded-2xl border p-4
          ${statusConfig.badge}
        `}
      >
        <p className="text-sm font-semibold leading-relaxed">
          {statusConfig.message}
        </p>
      </div>
    </div>
  );
};

const RecruiterCard = ({
  companyProfile,
  displayValue,
}) => {
  return (
    <div
      className="
        bg-white/85 backdrop-blur-xl
        rounded-[2rem]
        border border-white
        shadow-sm
        p-6
      "
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
          <UserRound size={21} className="text-blue-600" />
        </div>

        <div>
          <h2 className="font-black text-slate-900">
            Recruiter Details
          </h2>

          <p className="text-xs text-slate-500">
            Registered account information
          </p>
        </div>
      </div>

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
  );
};

const ProfileSection = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}) => {
  return (
    <section
      className="
        group relative overflow-hidden
        rounded-[2rem]
        bg-white/85 backdrop-blur-xl
        border border-white
        shadow-[0_15px_50px_rgba(15,23,42,0.06)]
        p-5 sm:p-7 lg:p-8
        transition-all duration-500
        hover:shadow-[0_22px_65px_rgba(37,99,235,0.09)]
      "
    >
      <div className="absolute -top-24 -right-20 w-48 h-48 rounded-full bg-blue-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-7">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-[1.3rem] bg-blue-500/10 blur-lg" />

            <div
              className="
                relative w-12 h-12 sm:w-14 sm:h-14
                rounded-[1.25rem]
                bg-gradient-to-br from-blue-500 to-indigo-700
                text-white
                shadow-lg shadow-blue-500/15
                flex items-center justify-center
                transition-transform duration-500
                group-hover:rotate-[-5deg]
                group-hover:scale-105
              "
            >
              <Icon size={23} />
            </div>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs font-black tracking-[0.16em] text-blue-600">
              {eyebrow}
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight">
              {title}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
};

const InfoRow = ({ icon: Icon, value }) => {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl
        bg-slate-50/70
        border border-slate-100
        p-3
      "
    >
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-blue-600" />
      </div>

      <p className="min-w-0 text-sm font-semibold text-slate-600 break-all">
        {value}
      </p>
    </div>
  );
};

const ProfileInfo = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[1.5rem]
        bg-slate-50/80
        border border-slate-100
        p-4 sm:p-5
        transition-all duration-300
        hover:bg-white
        hover:border-blue-100
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-blue-500/[0.04]
      "
    >
      <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-500/[0.03] blur-2xl" />

      <div className="relative flex items-start gap-3">
        <div
          className="
            w-10 h-10 shrink-0
            rounded-xl
            bg-white border border-slate-100
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-blue-50
            group-hover:border-blue-100
          "
        >
          <Icon
            size={18}
            className="
              text-slate-400
              transition-colors duration-300
              group-hover:text-blue-600
            "
          />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-black tracking-wide text-slate-400 uppercase">
            {label}
          </p>

          <h3 className="mt-1 text-sm font-black text-slate-800 break-words">
            {value || "Not added"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

