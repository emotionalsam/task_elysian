"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 6;
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { register, user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Invalid email");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await register(email, password);
    router.push("/login?email=" + email);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.userID) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-bg">
      <div className="flex rounded-[24px] overflow-hidden shadow-lg max-w-md md:max-w-5xl w-full">
        <div className="hidden md:flex relative w-2/3 bg-main px-10 py-24 flex-col justify-center items-center text-white">
          <img
            src="/media/illustration.png"
            alt="illustration"
            className="object-contain w-[357px] h-[357px]"
          />

          <img
            className="absolute left-10 top-10"
            src="/media/logo.png"
            alt="logo"
          />

          <div className="mt-2 text-center">
            <h1 className="text-xl font-bold">Welcome aboard my friend</h1>
            <p className="mt-2 text-sm">Just a couple of clicks and we start</p>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white w-full md:w-1/2 px-14 py-10">
          <h2 className="text-xl font-bold mb-8 text-main text-center">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="">
            <div className="relative">
              <label
                className="absolute left-3 h-5 w-5 top-1/2 transform -translate-y-1/2 mt-0"
                htmlFor="email"
              >
                <img
                  src="/media/email.png"
                  className="h-full w-full object-contain opacity-50"
                  alt="email"
                />
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative mt-4">
              <label
                className="absolute left-3 h-5 w-5 top-1/2 transform -translate-y-1/2 mt-0"
                htmlFor="password"
              >
                <img
                  src="/media/lock.png"
                  className="h-full w-full object-contain opacity-50"
                  alt="lock"
                />
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Password"
                required
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 mt-0 hover:opacity-50 right-3"
                type="button"
              >
                <img
                  src={showPassword ? "/media/hide.png" : "/media/show.png"}
                  className="h-full w-full object-contain"
                  alt="eye"
                />
              </button>
            </div>
            <div className="relative mt-4">
              <label
                className="absolute left-3 h-5 w-5 top-1/2 transform -translate-y-1/2 mt-0"
                htmlFor="co-password"
              >
                <img
                  src="/media/lock.png"
                  className="h-full w-full object-contain opacity-50"
                  alt="lock"
                />
              </label>
              <input
                id="co-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Confirm Password"
                required
              />
              <button
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 mt-0 hover:opacity-50 right-3"
                type="button"
              >
                <img
                  src={
                    showConfirmPassword ? "/media/hide.png" : "/media/show.png"
                  }
                  className="h-full w-full object-contain"
                  alt="eye"
                />
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-10 py-3 bg-main text-white font-semibold rounded-full hover:bg-secondary transition disabled:opacity-50"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-[0.5px] bg-main/50 w-1/4" />
            <p className="text-xs text-main uppercase">Or</p>
            <div className="h-[0.5px] bg-main/50 w-1/4" />
          </div>

          <div className="flex space-x-4">
            <button
              disabled={loading}
              className="flex-1 py-3 border border-gray-300 rounded-full flex justify-center items-center gap-4 hover:bg-gray-100 transition disabled:opacity-50"
            >
              <img
                src="/media/google.png"
                alt="Google"
                className="w-5 h-5 object-contain"
              />
              Google
            </button>
            <button
              disabled={loading}
              className="flex-1 py-3 border border-gray-300 rounded-full flex justify-center items-center gap-4 hover:bg-gray-100 transition disabled:opacity-50"
            >
              <img
                src="/media/facebook.png"
                alt="Facebook"
                className="w-5 h-5 object-contain"
              />
              Facebook
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
          </p>
          <button
            onClick={() => router.push("/login")}
            disabled={loading}
            className="mt-4 py-3 border border-main text-main rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
