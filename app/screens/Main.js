import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const Main = () => {
  const { generateRandomQuote, logout, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const handleFetchQuote = async () => {
      setLoading(true);
      const data = await generateRandomQuote();
      setQuote(data);
      setLoading(false);
    };

    handleFetchQuote();
  }, []);

  return (
    <View className="flex-1 bg-white justify-between items-center py-10">
      <Text>Hello {user?.email}</Text>
      <Text>{loading ? "loading..." : quote}</Text>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mt-5"
        onPress={logout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
