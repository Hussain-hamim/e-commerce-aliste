import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
// import { useFonts } from 'expo-font';
// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_700Bold,
// } from '@expo-google-fonts/inter';
// import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function IndexPage() {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Regular': Inter_400Regular,
  //   'Inter-Medium': Inter_500Medium,
  //   'Inter-Bold': Inter_700Bold,
  // });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     // Hide splash screen once fonts are loaded
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // // Show loading spinner while fonts are loading
  // if (!fontsLoaded) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#3B82F6" />
  //     </View>
  //   );
  // }

  // Redirect to the main tabs layout once everything is ready
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
