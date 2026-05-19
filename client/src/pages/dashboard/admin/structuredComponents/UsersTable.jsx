import { Ban, Eye, Plus, Search, Unlock, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAdminUserRole, updateAdminUserStatus } from "../../../../Api/adminApi";

const availableRoles = ["admin", "donor", "seeker", "bloodbank"];

const roleStyles = {
  admin: "bg-purple-50 text-purple-700 ring-purple-100",
  donor: "bg-red-50 text-red-700 ring-red-100",
  seeker: "bg-sky-50 text-sky-700 ring-sky-100",
  bloodbank: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

const UsersTable = ({ users = [], onRefresh }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [updatingId, setUpdatingId] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const roles = user.roles?.length ? user.roles : [user.role];
      const isAdminUser = roles.includes("admin");

      if (isAdminUser) {
        return false;
      }

      const matchesSearch = [user.fullName, user.email, user.city, user.bloodGroup]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole = role === "all" || roles.includes(role);

      return matchesSearch && matchesRole;
    });
  }, [role, search, users]);

  const handleStatus = async (user, isBlocked) => {
    if (!user?._id || user._id.startsWith("demo-")) {
      return;
    }

    try {
      setUpdatingId(user._id);
      await updateAdminUserStatus(user._id, { isBlocked });
      onRefresh?.();
    } finally {
      setUpdatingId("");
    }
  };

  const handleRoles = async (user, roles) => {
    if (!user?._id || user._id.startsWith("demo-")) {
      return;
    }

    const nextRoles = [...new Set(roles)].filter(Boolean);

    if (!nextRoles.length) {
      return;
    }

    try {
      setUpdatingId(user._id);
      await updateAdminUserRole(user._id, { roles: nextRoles });
      onRefresh?.();
    } finally {
      setUpdatingId("");
    }
  };

  const addRole = (user) => {
    const currentRoles = user.roles?.length ? user.roles : [user.role];
    const selectedRole = selectedRoles[user._id] || "";

    if (!selectedRole || currentRoles.includes(selectedRole)) {
      return;
    }

    handleRoles(user, [...currentRoles, selectedRole]);
  };

  const removeRole = (user, roleToRemove) => {
    const currentRoles = user.roles?.length ? user.roles : [user.role];

    if (currentRoles.length <= 1) {
      return;
    }

    handleRoles(
      user,
      currentRoles.filter((currentRole) => currentRole !== roleToRemove),
    );
  };

  return (
    <section id="users" className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-red-600">User Management</p>
          <h2 className="mt-1 text-xl font-bold text-gray-950">
            Platform Users
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </label>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="h-11 rounded-2xl border border-gray-100 bg-gray-50 px-4 text-sm font-semibold text-gray-600 outline-none"
          >
            <option value="all">All roles</option>
            <option value="donor">Donor</option>
            <option value="seeker">Recipient</option>
            <option value="bloodbank">Blood Bank</option>
          </select>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto lg:overflow-x-visible">
        <table className="w-full table-fixed border-separate border-spacing-y-2">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[22%]" />
            <col className="w-[10%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[18%]" />
          </colgroup>
          <thead>
            <tr className="text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
              <th className="px-2">Name</th>
              <th className="px-2">Roles</th>
              <th className="px-2">Blood</th>
              <th className="px-2">City</th>
              <th className="px-2">Status</th>
              <th className="px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const userRoles = user.roles?.length ? user.roles : [user.role];
              const isAdminUser = userRoles.includes("admin");
              const addableRoles = availableRoles.filter(
                (availableRole) => !userRoles.includes(availableRole),
              );

              return (
              <tr
                key={user._id || user.email}
                className="rounded-2xl bg-gray-50 text-xs text-gray-600 transition hover:bg-red-50/60"
              >
                <td className="rounded-l-2xl px-2 py-3 font-bold text-gray-950">
                  <span className="block truncate">{user.fullName || "N/A"}</span>
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {userRoles.map((userRole) => (
                      <span
                        key={userRole}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ring-1 ${
                          roleStyles[userRole] ||
                          "bg-gray-100 text-gray-600 ring-gray-200"
                        }`}
                      >
                        {userRole === "seeker" ? "recipient" : userRole}
                        {userRoles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRole(user, userRole)}
                            disabled={updatingId === user._id || isAdminUser}
                            className="rounded-full transition hover:bg-white/70 disabled:opacity-50"
                            aria-label={`Remove ${userRole} role`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-3 font-bold text-red-600">
                  {user.bloodGroup || "N/A"}
                </td>
                <td className="px-2 py-3">
                  <span className="block truncate">{user.city || "N/A"}</span>
                </td>
                <td className="px-2 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="rounded-r-2xl px-2 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/dashboard/admin/users/${user._id}`, {
                          state: { user },
                        })
                      }
                      className="rounded-lg bg-white p-1.5 text-gray-500 shadow-sm transition hover:text-red-600"
                      aria-label="View user"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatus(user, !user.isBlocked)}
                      disabled={updatingId === user._id || isAdminUser}
                      className="rounded-lg bg-white p-1.5 text-gray-500 shadow-sm transition hover:text-red-600 disabled:opacity-50"
                      aria-label={user.isBlocked ? "Unblock user" : "Block user"}
                    >
                      {user.isBlocked ? (
                        <Unlock className="h-4 w-4" />
                      ) : (
                        <Ban className="h-4 w-4" />
                      )}
                    </button>
                    <select
                      value={selectedRoles[user._id] || ""}
                      onChange={(event) =>
                        setSelectedRoles((previous) => ({
                          ...previous,
                          [user._id]: event.target.value,
                        }))
                      }
                      disabled={addableRoles.length === 0 || isAdminUser}
                      className="h-8 max-w-24 rounded-lg border border-gray-100 bg-white px-1.5 text-[10px] font-semibold text-gray-500 outline-none disabled:opacity-50"
                    >
                      <option value="">Add role</option>
                      {addableRoles.map((availableRole) => (
                        <option key={availableRole} value={availableRole}>
                          {availableRole === "seeker" ? "recipient" : availableRole}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addRole(user)}
                      disabled={
                        updatingId === user._id ||
                        addableRoles.length === 0 ||
                        isAdminUser
                      }
                      className="rounded-lg bg-white p-1.5 text-gray-500 shadow-sm transition hover:text-red-600 disabled:opacity-50"
                      aria-label="Add role"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
