export default {
  expo: {
    entryPoint: './src/App.tsx',
    name: 'ProjectPokemonReactApp',
    slug: 'ProjectPokemonReactApp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow PokeNative to use your location.',
        },
      ],
    ],
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.FOREGROUND_SERVICE',
      ],
      package: 'com.kykyls.ProjectPokemonReactApp',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '366df8ef-088f-4189-a48a-356ef6609154',
      },
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  },
};
