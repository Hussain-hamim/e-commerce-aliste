import { Redirect } from 'expo-router';

export default function IndexPage() {
  // Redirect to the main tabs layout once everything is ready
  return <Redirect href="/(tabs)" />;
}
