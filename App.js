import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./loginScreen";
import SignUpScreen from "./signupScreen";
import DashboardScreen from "./dashboardScreen";
import HistoryScreen from "./historyScreen";
import CameraDisplay from "./cameraDisplay";
import UserProfileScreen from "./userScreen";
import { TotalAmountProvider } from "./TotalAmountContext"; // Import the provider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TotalAmountProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen name="OCR" component={CameraDisplay} />
          <Stack.Screen name="UserScreen" component={UserProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TotalAmountProvider>
  );
}
