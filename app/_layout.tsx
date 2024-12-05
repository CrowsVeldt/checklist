import AppProvider from "@/context/AppContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Checklists" }} />
        <Stack.Screen
          name="create/index"
          options={{ title: "Create Checklist" }}
        />
        <Stack.Screen name="edit/index" options={{ title: "Edit Checklist" }} />
      </Stack>
      <Toast topOffset={700} />
    </AppProvider>
  );
}
