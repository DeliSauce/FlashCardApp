import React from "react";
import {View, StyleSheet, Text} from 'react-native';

function Collection() {
    return (
        <View style={styles.container}>
            <Text>collection1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "90px",
        height: "90px",
        backgroundColor: 'grey',
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})
export default Collection;