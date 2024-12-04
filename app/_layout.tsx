import AppProvider from "@/context/AppContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{title: "Checklists"}} />
        <Stack.Screen name="create/index" options={{title: "Create Checklist"}} />
        <Stack.Screen name="edit/index" options={{title: "Edit Checklist"}} />
        </Stack>;
    </AppProvider>
  );
}
