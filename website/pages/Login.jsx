"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();
  const { login, user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.has("email")) {
      setEmail(searchParams.get("email"));
    }
  }, [searchParams]);

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
            Log in
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

            <div className="flex items-center justify-end py-4">
              <button
                disabled={loading}
                type="button"
                className="text-sm text-main hover:text-secondary disabled:opacity-50 font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-4 py-3 bg-main text-white font-semibold rounded-full hover:bg-secondary transition disabled:opacity-50"
            >
              Log in
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
            Have no account yet?
          </p>
          <button
            onClick={() => router.push("/register")}
            disabled={loading}
            className="mt-4 py-3 border border-main text-main rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
