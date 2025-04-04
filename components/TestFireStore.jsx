import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import * as FIRESTORE from "../services/firestore";
import GoogleAuth from './GoogleAuth';

const TestFireStore = () => {
    const [testInfo, setTestInfo] = useState('');

    const handleTestButton = async () => {
        const uidTest = 'sIHiiZ5nE2S3c6tCjvj01-----';
        const email = 'testd@gmail.com';
        const displayName = 'testeed'
        // const data = await FIRESTORE.getUserData(uid_me);
        
        const uid_me = 'DkL4sU6IJ8N9Y6cOhHzTyhKN27H3'
        const uid = uidTest
        const userData = {
            uid: uid_me
            , email, displayName
        }

        const collectionID = 'EDx2TEDc1ixOzGgHFvD2';

        const collectionData = {
            title: 'collection 1',
            // cards: [
            //     {test: 'cardtest'}
            // ]
        }
        const param = userData
        console.log('TEST', param)
        // const data = await FIRESTORE.createCollection(uid_me, collectionData)
        const response = await FIRESTORE.createUserData(param)
        
        // const data = await FIRESTORE.saveUserData(userData)
        // const collectionID = 'MsQiXz33TJGQxJjdrY0k';
        // const data = await FIRESTORE.getCollection(collectionID);
        setTestInfo(response);
    }

    return (
        <View>
            {/* <View> */}
                <Text style={styles.text}>Testing Area</Text>
            {/* </View> */}
            <Pressable style={styles.create_button} onPress={handleTestButton}> 
                <Text>TEST</Text> 
            </Pressable>
            {/* <View> */}
                <Text style={styles.text}>{JSON.stringify(testInfo)}</Text>
            {/* </View> */}
            <GoogleAuth/>
        </View>
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
    create_button: {
        width: 150,
        height: 150,
        backgroundColor: 'lightblue',
    },
    text: {
        color: 'white',
        fontSize: 30,
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


export default TestFireStore