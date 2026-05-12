import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Password reset is not connected yet. For now, sign up again or log in
          with the account saved in this browser.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
