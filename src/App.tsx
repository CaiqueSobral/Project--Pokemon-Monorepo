import { useCallback, useContext } from 'react';
import { registerRootComponent } from 'expo';
import PokemonsPage from './pages/PokemonsPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PokemonsContextProvider, {
  PokemonsContext,
} from './data/context/pokemonsContext';

SplashScreen.preventAutoHideAsync();

export function App() {
  let [fontsLoaded] = useFonts({
    PressStart2P: require('../assets/Fonts/PressStart2P-Regular.ttf'),
  });

  const pokemonsContext = useContext(PokemonsContext);

  const onLayoutRootView = useCallback(async () => {
    if (!pokemonsContext.pokemons.length) {
      pokemonsContext.getData();
    }

    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PokemonsContextProvider>
      <SafeAreaProvider className="flex-1" onLayout={onLayoutRootView}>
        <PokemonsPage />
      </SafeAreaProvider>
    </PokemonsContextProvider>
  );
}

registerRootComponent(App);
