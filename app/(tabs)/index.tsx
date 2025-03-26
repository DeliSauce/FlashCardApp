import { Image, StyleSheet, Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { createStaticNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/HomePage';
import CardStack from '@/components/CardStack';
import Card from '@/components/Card';
// import {storageService} from '@/services/firebase.js';

import rawData from '../../assets/data/current_markdown.json';
import {DATA} from '@/services/utils.js'

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

const testData = {
  name: 'peter',
  bio: 'test'
}

const cardID = 3;

const data = DATA.format ({
  data: rawData,
  filter: true,
});
console.log("data: ", data)

// console.log("tesrt" , storageService.writeUserData(2, "pete", "test@gmail.com", "a.com"))
// console.log(storageService.pushData({test: 'yup'}));

export default function HomeScreen() {
  console.log('Homescreen Loaded')
  // console.log("DATA: ", rawData, Array.isArray(rawData))
  // const [data, setData] = useState(DATA.format({
  //   data: rawData,
  //   filter: true,
  // }))
  // let data;
  // called on first mount/render only?
  // useEffect(() => {
  //   console.log(rawData)
  //   data = rawData;
  // }, [])


  // const RootStack = createNativeStackNavigator({
  //   screens: {
  //     Home: HomeScreen,
  //   },
  // });
  
  // const Navigation = createStaticNavigation(RootStack);
  
    
  return (
        <ThemedView>
          <HomePage></HomePage>
        </ThemedView>
  );
}

      // <ThemedView style={styles.cardContainer}>
      //   <CardStack dataset={data}/>
      // </ThemedView>

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30,
  },
});

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12'
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }



// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
