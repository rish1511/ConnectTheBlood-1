import { useEffect, useState } from "react";

import { createBloodRequest } from "../../../Api/requestApi";
import { getRecipientDashboard } from "../../../Api/recipientApi";
import RequestCard from "./structuredComponents/RequestCard";
import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

const initialForm = {
  patientName: "",
  bloodGroup: "",
  hospital: "",
  city: "",
  urgency: "medium",
  unitsRequired: 1,
  contactNumber: "",
};

const RecipientNewRequest = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRecipientDashboard();
      const recipient = response?.data?.recipient || null;

      setUser(recipient);
      setForm((prev) => ({
        ...prev,
        bloodGroup: prev.bloodGroup || recipient?.bloodGroup || "",
        city: prev.city || recipient?.city || "",
        contactNumber: prev.contactNumber || recipient?.phone || "",
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load recipient data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchProfile();
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "contactNumber"
        ? value.replace(/\D/g, "").slice(0, 10)
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: name === "unitsRequired" ? Number(value) : nextValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!/^\d{10}$/.test(form.contactNumber)) {
        setError("Contact number must be exactly 10 digits");
        return;
      }

      setSubmitting(true);
      setError("");
      setMessage("");

      await createBloodRequest(form);

      setForm(initialForm);
      setMessage("Blood request created successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create blood request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium text-gray-700">
        Loading request form...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-40 lg:pb-6">
        <Topbar user={user} />

       

        <div className="mt-6">
          <RequestCard
            form={form}
            submitting={submitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
         {(message || error) && (
          <div
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
              error
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientNewRequest;
