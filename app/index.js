import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router'; 
import CollectionItem from '@/components/CollectionItem';
import {useStore} from "@/store/store";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoogleAuth from "../components/GoogleAuth";
import TestFireStore from "../components/TestFireStore";

function CollectionsPage() {
    const TESTING_FIRESTORE = false;
    const router = useRouter();
    // const user = useStore(state => state.user);
    const [user, setUser] = useState(null)
    const collections = useStore((state) => state.collections);
    const { fetchCollections } = useStore();
    console.log('collections: ', collections)
    // const screenWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();
    // const gap = 20;
    // const minItemWidth = 150;
    // const numColumns = Math.floor((screenWidth + gap) / (minItemWidth + gap));
    // const numColumns = useMemo(() => Math.floor((screenWidth + gap) / (minItemWidth + gap)), []);

    const createCollectionItem = (
        <View style={styles.button_wrapper}>
            <Pressable
                style={styles.create_button}
                onPress={() => router.push('/collections/new')}
            >
                <Image style={styles.button_image} source={require('@/assets/images/create-icon.png')}/>
            </Pressable>
        </View>
    );

    useEffect(() => {
        fetchCollections();
    }, [])

    // TODO: moved user to Store so may not need this callback
    const handleUserAuthStateChange = (firebaseUser) => {
        setUser(firebaseUser);
      };
    
      console.log('user', user, !user)
    if (!user) {
        return (
            <View>
                <GoogleAuth onAuthStateChanged={handleUserAuthStateChange}/>
            </View>
        )
    }

    if (TESTING_FIRESTORE) {
        return (
            <TestFireStore></TestFireStore>
        )
    }

    return (
        <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
            <Text style={styles.title}> Your Flashcard Collections </Text>
            <View style={styles.collection_list}>
                {collections.map((collection) => (
                    <CollectionItem 
                        collection={collection} 
                        key={collection.id}/>
                    )
                )}

                { createCollectionItem }
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        display: 'flex',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    },
    button_wrapper: {
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_image: {
        width: 50,
        height: 50,
    },
    collection_list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
        rowGap: 20,
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})

export default CollectionsPage;