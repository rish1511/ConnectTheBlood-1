import { useEffect, useState } from "react";

import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

import { getDonorProfile, updateDonorProfile } from "../../../Api/donorApi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorProfile = () => {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    bloodGroup: "",
    profileImage: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await getDonorProfile();

      const donor = response.data;

      setForm({
        fullName: donor.fullName || "",
        phone: donor.phone || "",
        city: donor.city || "",
        bloodGroup: donor.bloodGroup || "",
        profileImage: donor.profileImage || "",
      });
    } catch (error) {
      console.log("Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchProfile();
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!/^\d{10}$/.test(form.phone)) {
        alert("Phone number must be exactly 10 digits");
        return;
      }

      setSaving(true);

      // send only fields that have values to avoid sending empty strings
      const payload = {};

      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          payload[key] = value;
        }
      });

      await updateDonorProfile(payload);

      alert("Profile updated successfully");
    } catch (error) {
      console.log("Update Error:", error);

      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        <Topbar donor={form} />

        <div className="mx-auto mt-6 max-w-4xl rounded-[32px] bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your donor information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image */}
            {/* <div className="flex items-center gap-5">
              <img
                src={form.profileImage || "https://i.pravatar.cc/120"}
                alt="profile"
                className="h-24 w-24 rounded-3xl object-cover"
              />

              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>

                <input
                  type="text"
                  name="profileImage"
                  value={form.profileImage}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div> */}

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">Select</option>

                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-red-500 px-8 py-3 font-medium text-white transition hover:bg-red-600"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
