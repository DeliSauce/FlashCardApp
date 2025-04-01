import React, {useEffect} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import { useRouter } from 'expo-router';

function CollectionButton(props) {
    const router = useRouter();

    console.log('collection item: ', props)
    
    function handlePress() {
        router.push('/collections/' + props.collection.id)
    }

    return (
        <Pressable 
            style={[styles.container, styles.buttonStyling]} 
            onPress={handlePress}>
            <Text style={styles.text}>{props.collection.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        // textAlign: 'center',
        // aspectRatio: '1 / 1',
        borderRadius: '5px',
        backgroundColor: 'lightblue',
        boxShadow: '1',
        padding: '10px',
        width: 150,
        height: 150,
    },
    buttonStyling: {
        boxShadow: 
        '0 3px 5px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      
      /* Subtle gradient */
      backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.08))',
      
      /* Smooth transition but keeping it minimal for performance */
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    },
    text: {
        textAlign: 'center',
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
})
export default CollectionButton;