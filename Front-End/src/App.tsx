import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigator from './routes';
import { NavigationContainer } from '@react-navigation/native';
import IndexContextProvider from './data/context/IndexContext';

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
    <IndexContextProvider>
      <NavigationContainer>
        <SafeAreaProvider className="flex-1" onLayout={onLayoutRootView}>
          <RootNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </IndexContextProvider>
  );
}

registerRootComponent(App);
