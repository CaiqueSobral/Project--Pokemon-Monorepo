import 'react-native-gesture-handler';
import { useCallback, useContext } from 'react';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PokemonsContextProvider, {
  PokemonsContext,
} from './data/context/pokemonsContext';
import RootNavigator from './routes';
import { NavigationContainer } from '@react-navigation/native';

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
    <PokemonsContextProvider>
      <NavigationContainer>
        <SafeAreaProvider className="flex-1" onLayout={onLayoutRootView}>
          <RootNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </PokemonsContextProvider>
  );
}

registerRootComponent(App);
