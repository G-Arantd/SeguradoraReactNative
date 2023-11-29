import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Infos } from "../screens/Infos";
import { Vehicle } from "../screens/Vehicle";
import { Budget } from "../screens/Budget";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="infos" component={Infos} />
      <Screen name="vehicle" component={Vehicle} />
      <Screen name="budget" component={Budget} />
    </Navigator>
  );
}
