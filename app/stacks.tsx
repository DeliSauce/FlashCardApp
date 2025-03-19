import React from "react";
import { View, ScrollView, Text, SafeAreaView, StyleSheet} from "react-native";
import Collection from '@/components/Collection';

function StackPage() {
    return (
    <SafeAreaView style={styles.container}>
        <Text> Your Flashcard Collections </Text>
        <View>
            <Collection></Collection>
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

export default StackPage;