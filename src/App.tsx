import { useCallback } from 'react';
import { registerRootComponent } from 'expo';
import PokemonsPage from './pages/PokemonsPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export function App() {
  let [fontsLoaded] = useFonts({
    PressStart2P: require('../assets/Fonts/PressStart2P-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider className="flex-1" onLayout={onLayoutRootView}>
      <PokemonsPage />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
