import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCollectionsStore } from '@/store/collectionsStore';

function CollectionButton(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteCollection } = useCollectionsStore();

    const router = useRouter();

    console.log('collection item: ', props)
    
    function handlePress() {
        router.push('/collections/' + props.collection.id)
    }

    function handleLongPress() {
        console.log('long press')
        setIsModalOpen(true);
    }

    const LongPressMenu = (
        <View style={[styles.container, styles.longPressMenu]}>
            <Pressable 
                onPress={() => {
                    setEditMode(true); 
                    setIsModalOpen(false)
                }} 
                style={styles.menu_section}
            >
                <Image style={styles.menu_image} source={require('../assets/images/edit-icon.svg')}></Image>
                <Text style={styles.menu_text}>EDIT</Text>
            </Pressable>

            <Pressable onPress={() => deleteCollection(props.collection.id) } style={styles.menu_section}>
                <Image style={styles.menu_image} source={require('../assets/images/delete-icon.svg')}></Image>
                <Text style={styles.menu_text}>DELETE</Text>
            </Pressable>

            <Pressable 
                onPress={() => {
                    setIsModalOpen(false);
                }} 
                style={styles.menu_section}
            >
                <Image style={styles.menu_image} source={require('../assets/images/x-icon.svg')}></Image>
                <Text style={styles.menu_text}>{'CLOSE'}</Text>
            </Pressable>
        </View>
    )

    return (
        <Pressable 
            style={[styles.container, styles.buttonStyling]} 
            onPress={handlePress}
            onLongPress={handleLongPress}
            >
            <Text style={styles.text}>{props.collection.title}</Text>
            { isModalOpen && LongPressMenu } 
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
    longPressMenu: {
        position: 'absolute',
        // zIndex: 10,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.8,
        backgroundColor: 'grey',
        width: "100%",
        height: "100%",
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '100px',
      },
      menu_section: {
        display: 'flex',
        flexDirection: 'column'
      },
      menu_image: {
        width: 20,
        height: 20,
      },
      menu_text: {
        color: 'white',
        fontSize: 10,
      },
    keyboardAvoidContainer: {
        flex: 1,
    },
})
export default CollectionButton;