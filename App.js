import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './appNavigator';
import BannerAd from './src/components/bannerAd';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
      <BannerAd />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
    </NavigationContainer>
  );
}
