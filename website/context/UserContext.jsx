"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Splash from "@/pages/Splash";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://py-elysian.azurewebsites.net/auth/login",
        {
          email,
          password,
        }
      );

      if (data) {
        localStorage.setItem("token", data.access_token);
        setUser({ ...data.user });
        toast.success("Logged in successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://py-elysian.azurewebsites.net/auth/register",
        {
          email,
          password,
        }
      );

      if (data) {
        toast.success("Registered Successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out successfully.");
  };

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        "https://py-elysian.azurewebsites.net/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        setUser({ ...data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomQuote = async () => {
    try {
      const { data } = await axios.get(
        "https://node-elysian.azurewebsites.net/random"
      );

      toast.success(data.quote);
      return data.quote;
    } catch (err) {
      console.error(err);
      toast.error("Failed to get random quote.");
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    generateRandomQuote,
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
