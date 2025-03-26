import React, {useEffect} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';

function CollectionButton(props) {
    const router = useRouter();
    
    function handlePress() {
        router.push('/collections/' + props.collection.id)
    }

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={handlePress}>
            <Text>{props.collection.title}</Text>
        </TouchableOpacity>
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
export default CollectionButton;