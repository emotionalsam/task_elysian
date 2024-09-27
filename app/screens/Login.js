import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ICONS } from "../contants";
import { useUser } from "../context/UserContext";
import Toast from "react-native-toast-message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const { login } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white items-center pt-10 px-10">
        <Image source={ICONS.logo} className="w-12 h-12 my-10" />
        <Text className="text-lg font-semibold text-[#3949AB] mb-10">
          Log in
        </Text>
        <View className="flex-row items-center">
          <Image source={ICONS.email} className="w-5 h-5 absolute left-2" />
          <TextInput
            placeholder="Email"
            className="border border-gray-500 w-full rounded p-2 text-xs focus:outline-none focus:border-[#3949AB] pl-10"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center my-5">
          <Image source={ICONS.padlock} className="w-5 h-5 absolute left-2" />
          <TextInput
            placeholder="Password"
            className="border border-gray-500 w-full rounded p-2 text-xs focus:outline-none focus:border-[#3949AB] px-10"
            secureTextEntry={showPassword ? false : true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 px-3 py-3"
          >
            <Image source={ICONS.view} className="w-5 h-5" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="w-full items-end">
          <Text className="text-xs font-semibold mb-5 text-[#3949AB]">
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`bg-[#3949AB] w-full py-3 my-5 rounded-full ${
            loading ? "opacity-50" : ""
          }`}
        >
          <Text className="text-white text-center">Log in</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center space-x-4">
          <View className="h-[1px] w-1/3 bg-[#3949AB]" />
          <Text className="text-xs font-semibold text-[#3949AB]">OR</Text>
          <View className="h-[1px] w-1/3 bg-[#3949AB]" />
        </View>
        <View className="flex-row items-center justify-center space-x-2">
          <TouchableOpacity className="flex-1 py-3 my-5 border border-[#3949AB] rounded-full flex-row justify-center items-center space-x-2">
            <Image source={ICONS.google} className="w-5 h-5" />
            <Text className="text-[#3949AB] text-center">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 my-5 border border-[#3949AB] rounded-full flex-row justify-center items-center space-x-2">
            <Image source={ICONS.facebook} className="w-5 h-5" />
            <Text className="text-[#3949AB] text-center">Facebook</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xs mt-2">Have no account yet?</Text>
        <TouchableOpacity className="w-full py-3 mt-4 border border-[#3949AB] rounded-full">
          <Text className="text-[#3949AB] text-center">Register</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
