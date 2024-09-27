import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import Splash from "../screens/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userContext = createContext();
export const useUser = () => useContext(userContext);

const UserContext = ({ children }) => {
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
        await AsyncStorage.setItem("token", data.access_token);
        setUser({ ...data.user });
        Toast.show({
          type: "success",
          text1: "Logged in successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Invalid email or password.",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    Toast.show({
      type: "success",
      text1: "Logged out successfully.",
    });
  };

  const verifyUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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

      Toast.show({
        type: "success",
        text1: data.quote,
      });
      return data.quote;
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Failed to generate random quote.",
      });
    }
  };

  const value = {
    user,
    login,
    logout,
    generateRandomQuote,
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContext;
