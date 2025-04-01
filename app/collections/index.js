import React, { useEffect, useMemo } from "react";
import { View, ScrollView, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Pressable} from "react-native";
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router'; 
import CollectionButton from '@/components/CollectionButton';
import {useCollectionsStore} from "@/store/collectionsStore";

function CollectionsPage() {
    const router = useRouter();
    const collections = useCollectionsStore((state) => state.collections);
    const { fetchCollections } = useCollectionsStore();
    console.log('collections: ', collections)
    const screenWidth = Dimensions.get('window').width;
    // const gap = 20;
    // const minItemWidth = 150;
    // const numColumns = Math.floor((screenWidth + gap) / (minItemWidth + gap));
    // const numColumns = useMemo(() => Math.floor((screenWidth + gap) / (minItemWidth + gap)), []);

    const createCollectionButton = (
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Your Flashcard Collections </Text>
            {/* <FlatList 
                numColumns={numColumns} 
                style={styles.collection_list}
                data={collections}
                renderItem={({item}) => <CollectionButton collection={item}/>}
                key={numColumns}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatlist}
                columnWrapperStyle={styles.row}
            >
            </FlatList> */}
            <View style={styles.collection_list}>
                {collections.map((collection) => (
                    <CollectionButton 
                        collection={collection} 
                        key={collection.id}/>
                    )
                )}

                { createCollectionButton }
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
    flatlist: {
        padding: 10,
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
    // row: {
    //     justifyContent: 'space-between',
    //     marginBottom: 20, // Equivalent to gridGap    
    // },
    collection_list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
        rowGap: 20,
        // display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
        // gridGap: '20px',
        // padding: '0 20px',
        // width: '100%',
        // height: '100%',
        // gap: '20px',
        // flexWrap: 'wrap',
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        // justifyContent: 'space-around',
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})

export default CollectionsPage;