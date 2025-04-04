// SEE EG. https://claude.ai/chat/61d42266-b452-4ddc-9095-fc0ada1f5b64
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth, GoogleAuthProvider, signInWithCredential } from '@/services/firebaseNEW';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FIRESTORE from '@/services/firestore';
import { useStore } from '@/store/store';

// Register your app for native authentication
WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth({ onAuthStateChanged }) {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);

  const [loading, setLoading] = useState(false);

  // Replace with your own Google OAuth Client ID
  // Get your Web Client ID from Google Cloud Console
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '822499967186-r4jfnes370bvh0jvv41l4hnuj3137fru.apps.googleusercontent.com',
    webClientId: '822499967186-ou591es133l2so213lbr3e8fav8pkqlr.apps.googleusercontent.com',
    iosClientId: '822499967186-ctnl8q4550gvlmkfhl28n6kn2gi4ri50.apps.googleusercontent.com',
    androidClientId: '822499967186-3b94ia1ja8m4guv814qee84s3u1roste.apps.googleusercontent.com',
  });

  useEffect(() => {
    // Check for stored user on component mount
    checkForStoredUser();

    // Set up Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        onAuthStateChanged && onAuthStateChanged(firebaseUser);
      } else {
        setUser(null);
        onAuthStateChanged && onAuthStateChanged(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      setLoading(true);
      handleGoogleSignIn(response.authentication);
    }
  }, [response]);

  // TODO: not sure this is needed anymore after setting up Zustand store
  const checkForStoredUser = async () => {
    onAuthStateChanged && onAuthStateChanged(user);


    // try {
    //   const userJSON = await AsyncStorage.getItem('@user');
    //   if (userJSON) {
    //     const userData = JSON.parse(userJSON);
    //     setUser(userData);
    //     if (onAuthStateChanged) onAuthStateChanged(userData);
    //   }
    // } catch (error) {
    //   console.error('Error retrieving stored user:', error);
    // }

  };


  const handleGoogleSignIn = async (authentication) => {
    try {
      // Create a Firebase credential with the Google access token
      const credential = GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );

      // Sign in to Firebase with the Google credential
      const result = await signInWithCredential(auth, credential);
      const firebaseUser = result.user;

      // Store user data in AsyncStorage
      // await AsyncStorage.setItem('@user', JSON.stringify(firebaseUser));

      // Create user in FireStore /users if one does not already exist
      const createUserDataResponse = await FIRESTORE.createUserData(firebaseUser);
      console.log({createUserDataResponse});

      // Update state
      await setUser(firebaseUser);
      onAuthStateChanged && onAuthStateChanged(firebaseUser);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      // await AsyncStorage.removeItem('@user');
      await setUser(null);
      onAuthStateChanged && onAuthStateChanged(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : user ? (
        <View>
          <Text style={styles.text}>Signed in as: {user.displayName}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <Button
          title="Sign In with Google"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});