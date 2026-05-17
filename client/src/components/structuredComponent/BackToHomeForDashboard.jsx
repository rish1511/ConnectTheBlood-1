import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

const BacktoHomeForDashboard = () => {
  return (
    <Link
      to="/"
      className="w-full flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm hover:shadow-md transition text-gray-700 hover:text-red-500"
    >
      <ArrowLeft className="w-4 h-4" />

      <span className="text-sm font-medium">
        Back to Home
      </span>
    </Link>
  )
}

export default BacktoHomeForDashboard
