import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardStackShort from '@/components/CardStackShort';
import { useStore } from '@/store/store'

export default function Collection(props) {
    const { collectionID } = useLocalSearchParams();
    const { loading } = useStore();
    const title = useStore(state => state.getCollectionValueFromParam('title', collectionID));

    console.log('/collections/{collectionid}: ', {loading, title, collectionID});

    if (loading) {
        return (
            <View style={styles.container}>
            <Text>SPINNER</Text>
        </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View><Text>{title}</Text></View>
            <CardStackShort collectionID={collectionID}></CardStackShort>
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