import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Main from "../screens/Main";
import { useUser } from "../context/UserContext";

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { user } = useUser();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user?.userID ? (
        <Stack.Screen name="Home" component={Main} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
