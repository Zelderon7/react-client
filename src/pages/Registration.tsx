import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<"client" | "worker">("client");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); // Move this line to the top of the function, right below useState calls

  // Handle account type selection
  const handleAccountTypeSelect = (type: "client" | "worker") => {
    setAccountType(type);
    setError(null); // Clear any previous errors when selecting account type
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!accountType) {
      setError("Please select an account type.");
      return;
    }

    // Prepare data for the API request
    const requestData = {
      Username: firstName + " " + lastName, // Change this if you have a separate username field
      Password: password,
      Email: email,
    };

    try {
      // Make the API request
      const response = await fetch(
        "https://localhost:7017/api/authorization/register",
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // If successful, show success message
      setSuccess("Account created successfully!");

      localStorage.setItem("confirm-email", email);
      navigate("/confirm-email");
    } catch (err: unknown) {
      setError(
        (err as Error).message || "An error occurred during registration."
      );
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
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div className="mt-6">
              <h1 className="text-gray-500 dark:text-gray-300">
                Select type of account
              </h1>
              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <button
                  onClick={() => handleAccountTypeSelect("client")}
                  className={`flex justify-center w-full px-6 py-3 border rounded-md md:w-auto md:mx-2 focus:outline-none ${
                    accountType === "client"
                      ? "bg-blue-600  text-white"
                      : "text-blue-500 border-blue-500"
                  }`}
                >
                  <span className="mx-2">Client</span>
                </button>
                <button
                  onClick={() => handleAccountTypeSelect("worker")}
                  className={`flex justify-center w-full px-6 py-3 mt-4 border rounded-md md:mt-0 md:w-auto md:mx-2 ${
                    accountType === "worker"
                      ? "bg-blue-600 text-white"
                      : "text-blue-500 border-blue-500"
                  }`}
                >
                  <span className="mx-2">Worker</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
            >
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Snow"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="XXX-XX-XXXX-XXX"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>
              <div>
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
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-sm text-white bg-blue-500 rounded-md"
              >
                Sign Up
              </button>
            </form>

            {/* Display error or success messages */}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            {success && (
              <p className="mt-4 text-sm text-green-500">{success}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
