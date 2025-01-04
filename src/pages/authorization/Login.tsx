import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserTokenDTO } from "../../../interfaces/DTO";

const Login: React.FC = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Prepare data for the API request
    const requestData = {
      Email: email,
      Password: password,
    };

    try {
      // Make the API request
      const response = await fetch(
        "https://localhost:7017/api/authorization/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      // Parse response
      if (!response.ok) {
        const errorData = await response.statusText;
        throw new Error(errorData || "Login failed");
      }

      if (response.status === 428) {
        navigate("/confirm-email");
        navigate("/confirm-email");
      }
      // If successful, show success message and navigate
      setSuccess("Login successful!");
      const data = (await response.json()) as IUserTokenDTO;
      const token = data.token;

      // Store token in localStorage (persistent) or sessionStorage (temporary)
      localStorage.setItem("authToken", token); // OR sessionStorage.setItem("authToken", token);
      localStorage.setItem("userIcon", data.icon);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);

      navigate("/"); // Adjust route as needed
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred during login.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')`,
          }}
        />
        <div className="flex items-center w-full max-w-md p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Welcome Back!
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sign in to access your account.
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-sm text-white bg-blue-500 rounded-md"
              >
                Sign In
              </button>
            </form>

            {/* Display error or success messages */}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            {success && (
              <p className="mt-4 text-sm text-green-500">{success}</p>
            )}

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
