import api from "./api";

// =============== AUTH APIs ===============
export const registerUser = async (formData) => {
  const response = await api.post("/api/auth/register", formData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post("/api/auth/login", loginData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/api/auth/getUsers");
  return response.data;
};

export const getHome = async () => {
  const response = await api.get("/api/auth/home");
  return response.data;
};

// ================ JOB APIs ================
export const getAllJobs = async () => {
  const response = await api.get("/api/job/getJob");
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/api/job/${jobId}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post("/api/job/createJob", jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await api.delete(`/api/job/${jobId}`);
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/api/job/${jobId}`, jobData);
  return response.data;
};

export const viewResume = async (applicationId) => {
  const response = await api.get(`/api/application/resume/${applicationId}`, {
    responseType: "blob",
  });

  return response.data;
};

// =============== APPLICATION APIs ================
export const applyJob = async (jobId, formData) => {
  const response = await api.post(`/api/application/apply/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/api/application/myApplications");
  return response.data;
};

export const getApplicantsByJob = async (jobId) => {
  const response = await api.get(`/api/application/appliedApplicants/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(
    `/api/application/updateStatus/${applicationId}/status?status=${status}`
  );

  return response.data;
};
export const getMyJobs = async () => {
  const response = await api.get("/api/job/myJob");
  return response.data;
};

// =============== CANDIDATE APIs ===============
export const getCandidateProfile = async () => {
  const response = await api.get("/api/candidate/profile");
  return response.data;
};

export const updateCandidateProfile = async (profileData) => {
  const response = await api.put("/api/candidate/profile", profileData);
  return response.data;
};

// ============== JOB FILTER ==================
export const filterJobs = async (filters) => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append("keyword", filters.keyword);
  if (filters.location) params.append("location", filters.location);
  if (filters.jobType) params.append("jobType", filters.jobType);
  if (filters.experience) params.append("experience", filters.experience);
  if (filters.minSalary) params.append("minSalary", filters.minSalary);
  if (filters.maxSalary) params.append("maxSalary", filters.maxSalary);

  params.append("page", filters.page || 0);
  params.append("size", filters.size || 10);

  const response = await api.get(`/api/job/filter?${params.toString()}`);
  return response.data;
};

// ================= ADMIN APIs =================

export const getPendingRecruiters = async () => {
  const response = await api.get("/api/admin/recruiters/pending");
  return response.data;
};

export const updateRecruiterStatus = async (companyProfileId, status) => {
  const response = await api.post(
    `/api/admin/updateRecruiterStatus/${companyProfileId}?status=${status}`
  );
  return response.data;
};

export const getAllRecruiters = async () => {
  const response = await api.get("/api/admin/getAllRecruiters");
  return response.data;
};

export const getAllCandidates = async () => {
  const response = await api.get("/api/admin/getAllCandidates");
  return response.data;
};

export const getAllUsersAdmin = async () => {
  const response = await api.get("/api/admin/getAllUsers");
  return response.data;
};

export const getAllJobsAdmin = async () => {
  const response = await api.get("/api/admin/getAllJobs");
  return response.data;
};


//=============== Company Profile =================
export const getMyCompanyProfile = async () => {
  const response = await api.get("/api/company/profile");
  return response.data;
};