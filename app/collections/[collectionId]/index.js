import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useCollectionsStore, useCollectionParam} from '@/store/collectionsStore';
import { useLocalSearchParams } from 'expo-router';
import CardStack from '@/components/CardStack'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Collection(props) {
    const {collectionId} = useLocalSearchParams();
    const title = useCollectionParam(collectionId, 'title');

    return (
        <SafeAreaView style={styles.container}>
            <View><Text>{title}</Text></View>
            <CardStack collectionId={collectionId}></CardStack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        fontSize: "40px",
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})