import { registerRootComponent } from 'expo';
import PokemonsPage from './pages/PokemonsPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider className="flex-1">
      <PokemonsPage />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
