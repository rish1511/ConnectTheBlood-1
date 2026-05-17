import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 text-white transition-all duration-300 hover:bg-red-600"
    >
      <LogOut className="h-5 w-5" />
      <span className="font-medium">
        Logout
      </span>
    </button>
  );
};

export default Logout;
