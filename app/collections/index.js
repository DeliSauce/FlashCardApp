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
            <Text> Your Flashcard Collections </Text>
            <View>
                {collections.map((collection) => <CollectionButton collection={collection} key={collection.id}></CollectionButton>)}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})

export default CollectionsPage;