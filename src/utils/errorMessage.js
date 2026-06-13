export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (error?.response?.status === 401) {
    return "Your session has expired. Please login again.";
  }

  if (error?.response?.status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (error?.message === "Network Error") {
    return "Backend server is not reachable. Please start the backend and try again.";
  }

  return fallback;
};
