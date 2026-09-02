import {
  Search,
  MapPin,
  SlidersHorizontal,
  BriefcaseBusiness,
  Heart,
  Clock3,
  Building2,
  IndianRupee,
  Filter,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getAllJobs, filterJobs } from "../services/jobService";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    page: 0,
    size: 6,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    fetchJobs(0);
  }, []);

  const sortJobs = (jobsList, selectedSort) => {
    const sortedJobs = [...jobsList];

    if (selectedSort === "newest") {
      sortedJobs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
    }

    if (selectedSort === "oldest") {
      sortedJobs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateA - dateB;
      });
    }

    if (selectedSort === "salaryHigh") {
      sortedJobs.sort((a, b) => {
        return (b.maxSalary || 0) - (a.maxSalary || 0);
      });
    }

    if (selectedSort === "salaryLow") {
      sortedJobs.sort((a, b) => {
        return (a.minSalary || 0) - (b.minSalary || 0);
      });
    }

    return sortedJobs;
  };

  const isFilterApplied = () => {
    return (
      filters.keyword ||
      filters.location ||
      filters.jobType ||
      filters.experience ||
      filters.minSalary ||
      filters.maxSalary
    );
  };

  const fetchJobs = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs(pageNumber, filters.size);

      const jobList = data.content || [];
      const sortedJobList = sortJobs(jobList, sortBy);

      setJobs(sortedJobList);
      setTotalJobs(data.totalElements || jobList.length || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number ?? pageNumber);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobTypeChange = (type) => {
    setFilters({
      ...filters,
      jobType: filters.jobType === type ? "" : type,
    });
  };

  const handleExperienceChange = (level) => {
    setFilters({
      ...filters,
      experience: filters.experience === level ? "" : level,
    });
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;

    setSortBy(selectedSort);

    const sortedJobList = sortJobs(jobs, selectedSort);
    setJobs(sortedJobList);
  };

  const handleApplyFilters = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError("");

      const data = await filterJobs({
        ...filters,
        page: pageNumber,
        size: filters.size,
      });

      const jobList = data.content || [];
      const sortedJobList = sortJobs(jobList, sortBy);

      setJobs(sortedJobList);
      setTotalJobs(data.totalElements || jobList.length || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number ?? pageNumber);
    } catch (err) {
      setError("Failed to filter jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    const emptyFilters = {
      keyword: "",
      location: "",
      jobType: "",
      experience: "",
      minSalary: "",
      maxSalary: "",
      page: 0,
      size: 6,
    };

    setFilters(emptyFilters);
    setSortBy("newest");

    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs(0, 10);

      const jobList = data.content || [];
      const sortedJobList = sortJobs(jobList, "newest");

      setJobs(sortedJobList);
      setTotalJobs(data.totalElements || jobList.length || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number ?? 0);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 0 || pageNumber >= totalPages) {
      return;
    }

    if (isFilterApplied()) {
      handleApplyFilters(pageNumber);
    } else {
      fetchJobs(pageNumber);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
    "Remote",
  ];

  const experienceLevels = [
    "Fresher",
    "1 - 3 Years",
    "3 - 5 Years",
    "5+ Years",
  ];

  const FiltersContent = () => (
    <>
      {/* Job Type */}
      <div className="mt-6">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">
          Job Type
        </h3>

        <div className="flex flex-wrap gap-2 lg:block lg:space-y-2">
          {jobTypes.map((type, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 transition-all ${
                filters.jobType === type
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                checked={filters.jobType === type}
                onChange={() => handleJobTypeChange(type)}
                className="w-4 h-4 accent-blue-600 rounded"
              />

              <span className="text-sm font-medium">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-7 pt-6 border-t border-slate-100">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">
          Experience Level
        </h3>

        <div className="space-y-2">
          {experienceLevels.map((level, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 transition-all ${
                filters.experience === level
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                checked={filters.experience === level}
                onChange={() => handleExperienceChange(level)}
                className="w-4 h-4 accent-blue-600 rounded"
              />

              <span className="text-sm font-medium">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mt-7 pt-6 border-t border-slate-100">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">
          Salary Range
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-3 border border-slate-200 focus-within:bg-white focus-within:border-blue-300 transition">
            <IndianRupee size={15} className="text-slate-400 shrink-0" />

            <input
              type="number"
              name="minSalary"
              value={filters.minSalary}
              onChange={handleFilterChange}
              placeholder="Min"
              className="w-full min-w-0 bg-transparent outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-3 border border-slate-200 focus-within:bg-white focus-within:border-blue-300 transition">
            <IndianRupee size={15} className="text-slate-400 shrink-0" />

            <input
              type="number"
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
              placeholder="Max"
              className="w-full min-w-0 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-7 pt-6 border-t border-slate-100">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">
          Location
        </h3>

        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-3 border border-slate-200 focus-within:bg-white focus-within:border-blue-300 transition">
          <MapPin size={17} className="text-slate-400 shrink-0" />

          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Enter city"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen bg-[#f7faff] text-slate-950 overflow-hidden">
      <Navbar />

      {/* Desktop Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-40 -right-32 w-[32rem] h-[32rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="hidden lg:block absolute top-[30rem] -left-48 w-[30rem] h-[30rem] rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="hidden lg:block absolute top-32 right-[10%] w-40 h-40 border border-blue-200/50 rounded-[2rem] rotate-12" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Hero Header */}
        <section className="relative mb-7 sm:mb-9 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950 text-white p-6 sm:p-9 lg:p-12 shadow-2xl shadow-slate-300/50">

          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles size={16} className="text-blue-300" />

              <span className="text-sm font-semibold text-blue-100">
                Explore new opportunities
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Find work that
              <span className="block text-blue-400">
                moves your career forward.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Discover opportunities that match your skills, experience,
              location, and career goals.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <BriefcaseBusiness size={20} className="text-blue-300" />
              </div>

              <div>
                <p className="text-lg font-extrabold">{totalJobs}</p>
                <p className="text-xs text-slate-300">
                  opportunities available
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Search Panel */}
        <section className="relative mb-7 sm:mb-9">

          <div className="absolute inset-0 bg-blue-200/30 blur-2xl rounded-[2rem]" />

          <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-[1.7rem] sm:rounded-[2rem] shadow-xl shadow-blue-100/60 p-4 sm:p-5">

            <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-3">

              <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                <Search
                  size={20}
                  className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                />

                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  placeholder="Job title, skill or keyword..."
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              <div className="group flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-slate-200 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                <MapPin
                  size={20}
                  className="text-slate-400 group-focus-within:text-blue-600 transition shrink-0"
                />

                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or location..."
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                onClick={() => handleApplyFilters(0)}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                <Search size={18} />
                Search Jobs
              </button>

            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden mt-3 w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-blue-600" />
                More Filters
              </span>

              {showMobileFilters ? (
                <X size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mt-4 rounded-2xl border border-slate-200 bg-white p-4">

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="font-bold text-slate-900">
                    Filters
                  </h2>

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-blue-600"
                  >
                    Clear All
                  </button>
                </div>

                <FiltersContent />

                <button
                  type="button"
                  onClick={() => {
                    handleApplyFilters(0);
                    setShowMobileFilters(false);
                  }}
                  className="mt-7 w-full py-4 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-100"
                >
                  Apply Filters
                </button>

              </div>
            )}

          </div>
        </section>

        <div className="grid lg:grid-cols-[290px_minmax(0,1fr)] gap-7 lg:gap-8">

          {/* Desktop Filters */}
          <aside className="hidden lg:block">

            <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[1.7rem] shadow-xl shadow-blue-100/50 p-5 h-fit sticky top-28">

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Filter size={18} className="text-blue-600" />
                  </div>

                  <h2 className="text-lg font-extrabold">
                    Filters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>

              </div>

              <FiltersContent />

              <button
                type="button"
                onClick={() => handleApplyFilters(0)}
                className="mt-7 w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Apply Filters
              </button>

            </div>

          </aside>

          {/* Jobs Area */}
          <section className="min-w-0">

            {/* Sort Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    All Jobs
                  </h2>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                    {totalJobs}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-2">
                  Page {currentPage + 1} of {totalPages || 1}
                </p>
              </div>

              <div className="flex items-center gap-3">

                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                  Sort by
                </span>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="min-w-0 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 outline-none cursor-pointer hover:border-blue-200 transition"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="salaryHigh">Salary High to Low</option>
                  <option value="salaryLow">Salary Low to High</option>
                </select>

              </div>

            </div>

            {/* Job List */}
            <div className="space-y-5">

              {loading && (
                <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-10 text-center">

                  <div className="mx-auto w-12 h-12 rounded-2xl border-4 border-blue-100 border-t-blue-600 animate-spin" />

                  <p className="mt-4 text-sm font-semibold text-slate-500">
                    Finding the best opportunities for you...
                  </p>

                </div>
              )}

              {error && (
                <div className="bg-red-50 rounded-[1.5rem] border border-red-100 p-8 text-center text-red-600 font-semibold">
                  {error}
                </div>
              )}

              {!loading && !error && jobs.length === 0 && (
                <div className="bg-white rounded-[1.5rem] border border-slate-100 p-10 text-center">

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center">
                    <BriefcaseBusiness
                      size={25}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    No jobs found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                </div>
              )}

              {!loading &&
                !error &&
                jobs.map((job) => {
                  return (
                    <article
                      key={job.id}
                      className="group relative overflow-hidden bg-white rounded-[1.7rem] border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100/70 transition-all duration-300"
                    >

                      {/* Decorative hover gradient */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-5 sm:p-6 lg:p-7">

                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                          {/* Main Job Info */}
                          <div className="flex gap-4 min-w-0">

                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                              <Building2
                                size={26}
                                className="text-blue-600"
                              />
                            </div>

                            <div className="min-w-0">

                              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-blue-600 transition break-words">
                                {job.title}
                              </h3>

                              <p className="mt-1 text-sm font-semibold text-slate-500">
                                {job.company}
                              </p>

                              {/* Job Meta */}
                              <div className="mt-4 flex flex-wrap gap-2">

                                <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-xs font-semibold text-slate-600 border border-slate-100">
                                  <MapPin
                                    size={13}
                                    className="shrink-0"
                                  />
                                  <span className="truncate">
                                    {job.location}
                                  </span>
                                </span>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 border border-blue-100">
                                  <Clock3 size={13} />
                                  {job.jobType}
                                </span>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-xs font-semibold text-slate-600 border border-slate-100">
                                  {job.experience}
                                </span>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 border border-emerald-100">
                                  ₹{job.minSalary} - ₹{job.maxSalary}
                                </span>

                              </div>

                              {/* Skills */}
                              {job.skills?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">

                                  {job.skills
                                    .slice(0, 4)
                                    .map((skill, index) => (
                                      <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-600 border border-slate-100"
                                      >
                                        {skill}
                                      </span>
                                    ))}

                                  {job.skills.length > 4 && (
                                    <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
                                      +{job.skills.length - 4} more
                                    </span>
                                  )}

                                </div>
                              )}

                            </div>

                          </div>

                          {/* Date & Save */}
                          <div className="flex md:flex-col items-center md:items-end justify-between gap-4">

                            <button
                              type="button"
                              disabled
                              title="Save job feature will be added soon"
                              className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 cursor-not-allowed bg-slate-50"
                            >
                              <Heart size={19} />
                            </button>

                            <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                              {job.createdAt
                                ? new Date(
                                    job.createdAt
                                  ).toLocaleDateString()
                                : "Recently"}
                            </span>

                          </div>

                        </div>

                        {/* Bottom Section */}
                        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                            {job.description?.length > 170
                              ? job.description.substring(0, 170) + "..."
                              : job.description}
                          </p>

                          <Link
                            className="w-full sm:w-auto shrink-0 text-center px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-slate-200"
                            to={`/jobDetails/${job.id}`}
                          >
                            View Details
                          </Link>

                        </div>

                      </div>

                    </article>
                  );
                })}

            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-9 flex flex-wrap items-center justify-center gap-2">

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`px-4 h-11 rounded-xl border text-sm font-bold transition ${
                    currentPage === 0
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePageChange(index)}
                    className={`w-11 h-11 rounded-xl text-sm font-bold transition ${
                      currentPage === index
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`px-4 h-11 rounded-xl border text-sm font-bold transition ${
                    currentPage === totalPages - 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100"
                  }`}
                >
                  Next
                </button>

              </div>
            )}

          </section>

        </div>

      </main>
    </div>
  );
};

export default JobListings;

