import React, {useEffect} from "react";
import { View, ScrollView, Text, SafeAreaView, StyleSheet} from "react-native";
import CollectionButton from '@/components/CollectionButton';
import {useCollectionsStore} from "@/store/collectionsStore";

function CollectionsPage() {
    const collections = useCollectionsStore((state) => state.collections);
    const { fetchCollections } = useCollectionsStore();
    console.log('collections: ', collections)

    
    useEffect(() => {
        fetchCollections();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Your Flashcard Collections </Text>
            <View style={styles.collection_list}>
                {collections.map((collection) => <CollectionButton collection={collection} key={collection.id}></CollectionButton>)}
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
        margin: '20px',
    },
    collection_list: {
        paddingLeft: '20px',
        paddingRight: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridGap: '20px',
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