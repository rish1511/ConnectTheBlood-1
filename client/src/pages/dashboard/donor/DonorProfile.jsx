import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

import { getDonorProfile, updateDonorProfile } from "../../../Api/donorApi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorProfile = () => {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    bloodGroup: "",
    profileImage: "",
    location: {
      latitude: "",
      longitude: "",
      city: "",
      address: "",
    },
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
        location: {
          latitude: donor.location?.latitude ?? "",
          longitude: donor.location?.longitude ?? "",
          city: donor.location?.city || donor.city || "",
          address: donor.location?.address || "",
        },
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
        toast.error("Phone number must be exactly 10 digits");
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

      delete payload.location;

      if (form.location.latitude && form.location.longitude) {
        payload.location = {
          latitude: Number(form.location.latitude),
          longitude: Number(form.location.longitude),
          city: form.location.city || form.city || "",
          address: form.location.address || "",
        };
      }

      await updateDonorProfile(payload);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Update Error:", error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));

        setForm((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            latitude,
            longitude,
          },
        }));

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          const locationCity =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "";
          const state = data?.address?.state || "";
          const address = data?.display_name || "";

          setForm((prev) => ({
            ...prev,
            city: prev.city || [locationCity, state].filter(Boolean).join(", "),
            location: {
              ...prev.location,
              city: [locationCity, state].filter(Boolean).join(", "),
              address,
            },
          }));
        } catch {
          // Keep coordinates even if reverse geocoding fails.
        } finally {
          toast.success("Location captured successfully");
          setLocating(false);
        }
      },
      () => {
        toast.error("Unable to fetch your current location");
        setLocating(false);
      },
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-40 lg:pb-6">
        <Topbar donor={form} />

        <div className="mx-auto mt-6 max-w-4xl rounded-4xl bg-white p-8 shadow-sm">
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

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Map Location</p>
                  <p className="text-xs text-gray-500">
                    Donors will be discoverable on map using these coordinates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locating}
                  className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-black disabled:opacity-60"
                >
                  {locating ? "Detecting..." : "Get My Location"}
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={form.location.latitude}
                    readOnly
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={form.location.longitude}
                    readOnly
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                  />
                </div>
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
