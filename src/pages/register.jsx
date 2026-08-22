

// function Register() {

//     const [formData, setFormData] = useState({

//         name: "",
//         email: "",
//         password: "",
//         role: "CANDIDATE"
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await registerUser(formData);
//             console.log(response)
//             alert("Registration Successful")
//             navigate("/login")

//         } catch (error) {
//             console.log(error)
//         }
//     }


//     return (

//         <div>

//             <h1>Register</h1>

//             <form onSubmit={handleSubmit}>

//                 <input
//                     type="text"
//                     placeholder="Enter Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="email"
//                     placeholder="Enter Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <input
//                     type="password"
//                     placeholder="Enter Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />

//                 <br /><br />

//                 <select 
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                 >

//                     <option value="CANDIDATE">
//                         Candidate
//                     </option>

//                     <option value="RECRUITER">
//                         Recruiter
//                     </option>

//                 </select>

//                 <br /><br />

//                 <button type="submit">
//                     Register
//                 </button>

//             </form>
//             <p>
//     Already have an account?

//     <Link to="/login">
//         Login
//     </Link>
// </p>
//         </div>
//     );
// }

// export default Register;

import { useState } from "react";
import { registerUser } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Eye,
  UserPlus,
  BadgeCheck,
  MapPin,
  Globe,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // phone: "",
    role: "CANDIDATE",
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyDescription: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const isRecruiter = formData.role === "RECRUITER";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Please accept Terms & Conditions");
      return;
    }

    if (isRecruiter) {
      if (
        !formData.companyName.trim() ||
        !formData.companyLocation.trim() ||
        !formData.companyDescription.trim()
      ) {
        setError("Please fill company name, company location, and company description.");
        return;
      }
    }

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyName: isRecruiter ? formData.companyName : null,
        companyWebsite: isRecruiter ? formData.companyWebsite : null,
        companyLocation: isRecruiter ? formData.companyLocation : null,
        companyDescription: isRecruiter ? formData.companyDescription : null,
      };

      const result = await registerUser(payload);

      setSuccess("Account created successfully. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Email already exists");
      } else {
        setError(getErrorMessage(err, "Registration failed"));
      }
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
                    Create your account
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  Start your journey with SmartJob.
                </h2>

                <p className="mt-5 text-slate-300 leading-relaxed max-w-md">
                  Register as a candidate to apply for jobs or as a recruiter to
                  post jobs and manage applications.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <Users size={24} className="text-blue-300" />
                  <h3 className="mt-3 font-bold">Candidate</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Find and apply jobs
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                  <Building2 size={24} className="text-blue-300" />
                  <h3 className="mt-3 font-bold">Recruiter</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Post and hire talent
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

          {/* Right Register Form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <UserPlus size={27} className="text-blue-600" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Register
                </h2>

                <p className="mt-2 text-slate-500">
                  {isRecruiter
                    ? "Create recruiter account with company details."
                    : "Create candidate account using basic details."}
                </p>
              </div>
              {error && (
                <div className="mb-5 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-2xl bg-green-50 border border-green-100 px-4 py-3 text-sm font-semibold text-green-600">
                  {success}
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* role */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Register As
                  </label>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition ${formData.role === "CANDIDATE"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-slate-50 border-gray-100"
                        }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="CANDIDATE"
                        checked={formData.role === "CANDIDATE"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-blue-600"
                      />

                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                        <UserRound size={20} className="text-blue-600" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Candidate
                        </p>
                        <p className="text-xs text-slate-500">Apply jobs</p>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center gap-3 rounded-2xl px-4 py-4 cursor-pointer border transition ${formData.role === "RECRUITER"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-slate-50 border-gray-100"
                        }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="RECRUITER"
                        checked={formData.role === "RECRUITER"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-blue-600"
                      />

                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                        <Building2 size={20} className="text-blue-600" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Recruiter
                        </p>
                        <p className="text-xs text-slate-500">Post jobs</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* fullName */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <UserRound size={20} className="text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

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

                {/* phone */}
                {/* <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <Phone size={20} className="text-slate-400" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div> */}

                {/* Recruiter Company Details */}
                {isRecruiter && (
                  <div className="space-y-5 rounded-3xl bg-blue-50/60 border border-blue-100 p-5">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Company Details
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        These fields are required only for recruiter account.
                      </p>
                    </div>

                    {/* companyName */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Name
                      </label>

                      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 transition">
                        <Building2 size={20} className="text-slate-400" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* companyWebsite */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Website
                      </label>

                      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 transition">
                        <Globe size={20} className="text-slate-400" />
                        <input
                          type="text"
                          name="companyWebsite"
                          value={formData.companyWebsite}
                          onChange={handleChange}
                          placeholder="https://company.com"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* companyLocation */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Location
                      </label>

                      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 transition">
                        <MapPin size={20} className="text-slate-400" />
                        <input
                          type="text"
                          name="companyLocation"
                          value={formData.companyLocation}
                          onChange={handleChange}
                          placeholder="Pune, India"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* companyDescription */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Description
                      </label>

                      <div className="flex items-start gap-3 bg-white rounded-2xl px-4 py-4 border border-blue-100 focus-within:border-blue-300 transition">
                        <FileText size={20} className="text-slate-400 mt-0.5" />
                        <textarea
                          name="companyDescription"
                          value={formData.companyDescription}
                          onChange={handleChange}
                          placeholder="Write short company description"
                          rows="4"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* password */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <LockKeyhole size={20} className="text-slate-400" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                    <Eye size={19} className="text-slate-400" />
                  </div>
                </div>

                {/* confirmPassword */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition">
                    <LockKeyhole size={20} className="text-slate-400" />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                    />

                    <Eye size={19} className="text-slate-400" />
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-600 rounded mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-bold text-blue-600 hover:text-blue-700"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-bold text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Create Account
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  className="font-bold text-blue-600 hover:text-blue-700"
                  to="/login"
                >
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;