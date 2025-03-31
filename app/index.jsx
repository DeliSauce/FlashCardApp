import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const router = useRouter();
  
  return (
        <View style={styles.container}>
          <Text style={styles.text}>Home screen</Text>
          <View style={{flex: 1}}>
              <Image style={styles.button_image} resizeMode='contain' source={require('@/assets/images/edit-icon.svg')}/>
          </View>

          <Pressable style={styles.collections_button} onPress={() => router.push('/collections')}>
            <Text style={styles.link_text}>Go To Collections</Text>
          </Pressable>

          <Pressable
            style={styles.create_button}
            onPress={() => router.push('/create')}
          >
            <Image style={styles.button_image} source={require('@/assets/images/create-icon.png')}/>
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
