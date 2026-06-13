import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllUsersAdmin } from "../../services/jobService";
import { getErrorMessage } from "../../utils/errorMessage";
import {
  Users,
  UserRound,
  Search,
  ShieldCheck,
  Building2,
  GraduationCap,
  Mail,
  Sparkles,
  Filter,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllUsersAdmin();
      setUsers(data || []);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to load users."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole = selectedRole === "ALL" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, search, selectedRole]);

  const totalCandidates = users.filter((user) => user.role === "CANDIDATE").length;
  const totalRecruiters = users.filter((user) => user.role === "RECRUITER").length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  const getRoleIcon = (role) => {
    if (role === "ADMIN") return ShieldCheck;
    if (role === "RECRUITER") return Building2;
    return GraduationCap;
  };

  const getRoleStyle = (role) => {
    if (role === "ADMIN") {
      return {
        badge: "bg-purple-50 text-purple-700 border-purple-100",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
      };
    }

    if (role === "RECRUITER") {
      return {
        badge: "bg-orange-50 text-orange-700 border-orange-100",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
      };
    }

    return {
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    };
  };

  const statCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Candidates",
      value: totalCandidates,
      icon: GraduationCap,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Recruiters",
      value: totalRecruiters,
      icon: Building2,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: ShieldCheck,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6 sm:p-8 overflow-hidden mb-8">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-50 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-600">
                  Admin User Management
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Manage Platform Users
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
                View candidates, recruiters, and admins in one clean place.
                Search users and filter them by role.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-blue-600 transition"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </section>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-[1.7rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon size={26} className={item.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-5 sm:p-6 mb-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-semibold"
              />
            </div>

            <div className="relative">
              <Filter
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-100 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-sm font-bold appearance-none"
              >
                <option value="ALL">All Roles</option>
                <option value="CANDIDATE">Candidates</option>
                <option value="RECRUITER">Recruiters</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
          </div>
        </section>

        {/* Users List */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-100/40 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold">All Users</h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {loading && (
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                Loading...
              </span>
            )}
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                <Users size={34} className="text-slate-400" />
              </div>

              <h3 className="text-xl font-bold">No users found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try changing search keyword or selected role.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                const style = getRoleStyle(user.role);

                return (
                  <div
                    key={user.id}
                    className="group rounded-[1.7rem] border border-gray-100 bg-slate-50/70 p-5 hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${style.iconBg} flex items-center justify-center`}
                        >
                          <RoleIcon size={25} className={style.iconColor} />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-slate-950">
                            {user.name}
                          </h3>

                          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                            <Mail size={14} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-bold ${style.badge}`}
                      >
                        {user.role}
                      </span>

                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition">
                        <UserRound size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminUsers;