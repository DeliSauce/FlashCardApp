import React, { useEffect } from 'react';
import { ScrollView, Text, View, Button} from "react-native";
import { StyleSheet } from 'react-native';

import {gemini} from "@/services/ai"

export default function HomePage() {
    
    useEffect(() => {
        console.log("Gemini: ", gemini.test())
        // gemini.query()
        // .then(response => {
        //     console.log("TIME: ", response)
        // })

        // {prompt: 'what time is it now?'}
    }, []);

    return (
        <View style={styles.homepage}>
            <Text style={styles.headers}> {'Flash Card App'}</Text>
            <View>
                <Text style={styles.headers}>
                    Categories
                </Text>
            </View>

            <View>
                <Button style={styles.button}
                // onPress={}
                title={'Create'}
                color='blue'>
                    
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
homepage: {
    // width: "100%",
    // height: "100%",
    backgroundColor: 'red',
    justifyContent: 'center',
    marginHorizontal: 16,
},
headers: {
    fontSize: "20px",
    backgroundColor: 'yellow'
},
button: {
    // width: "40px",
    // height: "20px",
    // backgroundColor: "white",
    // color: "blue"
}
})

