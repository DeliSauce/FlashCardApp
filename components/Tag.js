import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';

const Tag = (props) => {
    const title = props.title;

    const _onPress = (e)=> {
        // e.stopPropagation();
            // e.preventDefault();
        console.log('TESTSETSETSTST')

    }

    return (
        <View style={styles.tag}>
                <Text>
                    {`${title}`}
                </Text>
            </View>
        // <BaseButton onPress={_onPress} style={styles.tag}>
        //     <View accessible accessibilityRole="button">
        //         <Text>
        //             {`${title}`}
        //         </Text>
        //     </View>
        // </BaseButton>
    )
}

const styles = StyleSheet.create({
    tag: {
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    }
})

export default Tag;
    // <Pressable style={styles.tag}
    //     onPressIn={(e) => {
    //         e.stopPropagation();
    //         e.preventDefault();
    //         console.log("PRESSED")
    //     }}
    
    // >
    // </Pressable>