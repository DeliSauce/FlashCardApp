import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router'; 
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  
  return (
        <View style={styles.container}>
          <Text style={styles.text}>Home screen</Text>

          <Pressable style={styles.collections_button} onPress={() => router.push('/collections')}>
            <Text style={styles.link_text}>Go To Collections</Text>
          </Pressable>

        </View>
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
    marginBottom: '40px',
  },
  image_wrapper: {
    flex: 1,
  },
  collections_button: {
    marginBottom: '40px',
  },
  link_text: {
    fontSize: 40,
    textDecorationLine: 'underline',
    color: '#fff',
    marginBottom: '40px',
  },
  create_button: {

  },
  button_image: {
    width: 100,
    height: 100,
  },

});
