import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainNavigation from "./navigation/MainNavigation";
import Toast from "react-native-toast-message";
import UserContext from "./context/UserContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <UserContext>
              <StatusBar style="auto" />
              <MainNavigation />
            </UserContext>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  );
}
