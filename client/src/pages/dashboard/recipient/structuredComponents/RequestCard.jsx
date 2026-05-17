import { Send } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["low", "medium", "high", "critical"];

const RequestCard = ({ form, submitting, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Create Blood Request
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add patient and hospital details for donor matching.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <Send className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Patient Name
          </span>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            placeholder="Enter patient name"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Blood Group</span>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            required
          >
            <option value="">Select blood group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Hospital</span>
          <input
            type="text"
            name="hospital"
            value={form.hospital}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            placeholder="Hospital name"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">City</span>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            placeholder="City"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Urgency</span>
          <select
            name="urgency"
            value={form.urgency}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm capitalize outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          >
            {urgencyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Units Required
          </span>
          <input
            type="number"
            name="unitsRequired"
            min="1"
            max="10"
            value={form.unitsRequired}
            onChange={onChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            required
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-gray-700">
            Contact Number
          </span>
          <input
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={onChange}
            inputMode="numeric"
            maxLength={10}
            pattern="\d{10}"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            placeholder="Phone number"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
      >
        <Send className="h-5 w-5" />
        {submitting ? "Creating..." : "Create Request"}
      </button>
    </form>
  );
};

export default RequestCard;
