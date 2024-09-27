import { Image, View } from "react-native";
import React from "react";
import { ICONS } from "../contants";

const Splash = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={ICONS.logo} className="w-12 h-12 my-10" />
    </View>
  );
};

export default Splash;
