import React, { useEffect, useMemo } from "react";
import { View, ScrollView, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Pressable} from "react-native";
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router'; 
import CollectionItem from '@/components/CollectionItem';
import {useCollectionsStore} from "@/store/collectionsStore";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CollectionsPage() {
    const router = useRouter();
    const collections = useCollectionsStore((state) => state.collections);
    const { fetchCollections } = useCollectionsStore();
    console.log('collections: ', collections)
    const screenWidth = Dimensions.get('window').width;
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