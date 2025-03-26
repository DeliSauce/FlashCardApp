import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  return (
    // <GestureHandlerRootView>
        <View style={styles.container}>
        <Text style={styles.text}>Home screen</Text>
        <Link href="/collections" style={styles.button}>
            Go to Collections
        </Link>
        <Link href="/create" style={styles.button}>
            Go to Create
        </Link>
        </View>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
