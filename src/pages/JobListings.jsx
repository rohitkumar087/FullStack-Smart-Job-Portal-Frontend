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

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Remote"];

  const experienceLevels = [
    "Fresher",
    "1 - 3 Years",
    "3 - 5 Years",
    "5+ Years",
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
            <BriefcaseBusiness size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              Explore latest opportunities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Find Your Perfect Job
              </h1>

              <p className="mt-2 text-slate-600">
                Search jobs by title, location, experience, salary, and work
                type.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <SlidersHorizontal size={18} className="text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">
                {totalJobs} jobs found
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <section className="bg-white border border-gray-100 rounded-[1.7rem] shadow-xl shadow-blue-100/40 p-4 mb-8">
          <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
              <Search size={20} className="text-slate-400" />

              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleFilterChange}
                placeholder="Search job title, company, keywords..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100">
              <MapPin size={20} className="text-slate-400" />

              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Search location..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={() => handleApplyFilters(0)}
              className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition"
            >
              Search Jobs
            </button>
          </div>
        </section>

        <div className="grid lg:grid-cols-[290px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="bg-white border border-gray-100 rounded-[1.7rem] shadow-xl shadow-blue-100/40 p-5 h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Filter size={19} className="text-blue-600" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-blue-600"
              >
                Clear All
              </button>
            </div>

            {/* Job Type */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Job Type
              </h3>

              <div className="space-y-3">
                {jobTypes.map((type, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.jobType === type}
                      onChange={() => handleJobTypeChange(type)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mt-7 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Experience Level
              </h3>

              <div className="space-y-3">
                {experienceLevels.map((level, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.experience === level}
                      onChange={() => handleExperienceChange(level)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="mt-7 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Salary Range
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-3 border border-gray-100">
                  <IndianRupee size={15} className="text-slate-400" />

                  <input
                    type="number"
                    name="minSalary"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-3 border border-gray-100">
                  <IndianRupee size={15} className="text-slate-400" />

                  <input
                    type="number"
                    name="maxSalary"
                    value={filters.maxSalary}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mt-7 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Location
              </h3>

              <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-3 border border-gray-100">
                <MapPin size={17} className="text-slate-400" />

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

            <button
              type="button"
              onClick={() => handleApplyFilters(0)}
              className="mt-7 w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </aside>

          {/* Job List Area */}
          <section>
            {/* Sort Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-bold">All Jobs</h2>

                <p className="text-sm text-slate-500 mt-1">
                  Page {currentPage + 1} of {totalPages || 1}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Sort by:</span>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-sm font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="salaryHigh">Salary High to Low</option>
                  <option value="salaryLow">Salary Low to High</option>
                </select>
              </div>
            </div>

            {/* Jobs */}
            <div className="space-y-5">
              {loading && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                  Loading jobs...
                </div>
              )}

              {error && (
                <div className="bg-red-50 rounded-2xl border border-red-100 p-6 text-center text-red-600 font-semibold">
                  {error}
                </div>
              )}

              {!loading && !error && jobs.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-slate-500 font-semibold">
                  No jobs found.
                </div>
              )}

              {!loading &&
                !error &&
                jobs.map((job) => {
                  return (
                    <div
                      key={job.id}
                      className="group bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 transition p-5 sm:p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                            <Building2 size={25} className="text-blue-600" />
                          </div>

                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-blue-600 transition">
                              {job.title}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-slate-500">
                              {job.company}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-xs font-semibold text-slate-600 border border-gray-100">
                                <MapPin size={14} />
                                {job.location}
                              </span>

                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-600 border border-blue-100">
                                <Clock3 size={14} />
                                {job.jobType}
                              </span>

                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-xs font-semibold text-slate-600 border border-gray-100">
                                {job.experience}
                              </span>

                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-xs font-semibold text-green-700 border border-green-100">
                                ₹{job.minSalary} - ₹{job.maxSalary}
                              </span>
                            </div>

                            {job.skills?.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {job.skills.slice(0, 4).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-600 border border-blue-100"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
                          <button
                            type="button"
                            disabled
                            title="Save job feature will be added soon"
                            className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-slate-300 cursor-not-allowed bg-slate-50"
                          >
                            <Heart size={19} />
                          </button>

                          <span className="text-xs font-medium text-slate-400">
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString()
                              : "Recently"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                          {job.description?.length > 160
                            ? job.description.substring(0, 160) + "..."
                            : job.description}
                        </p>

                        <Link
                          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
                          to={`/jobDetails/${job.id}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`px-4 h-10 rounded-xl border text-sm font-bold transition ${
                    currentPage === 0
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-gray-100"
                      : "bg-white text-slate-600 border-gray-100 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePageChange(index)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                      currentPage === index
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-gray-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`px-4 h-10 rounded-xl border text-sm font-bold transition ${
                    currentPage === totalPages - 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-gray-100"
                      : "bg-white text-slate-600 border-gray-100 hover:bg-blue-50 hover:text-blue-600"
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