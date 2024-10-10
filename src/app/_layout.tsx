import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { I18nManager } from "react-native";

SplashScreen.preventAutoHideAsync();
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
    Quran: require("../assets/fonts/Al-Quran-Regular.ttf"),
    Uthmanic: require("../assets/fonts/Uthman-Taha-Naskh-Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SQLiteProvider
      databaseName="data.db"
      assetSource={{ assetId: require("../assets/data/database.db") }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="dikr" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
