import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useStore } from '@/store/store';
// import { IconBrandJavascript } from '@tabler/icons-react'
import tablerIconUrls from '@/assets/images/_tabler-icons';

function CollectionItem(props) {
    const {collections} = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteCollection } = useStore();

    const router = useRouter();
    
    function handlePress() {
        // console.log(props.collection.id);
        // console.log(collections)
        router.push('/collections/' + props.collection.id)
    }

    function handleLongPress() {
        console.log('long press')
        setIsModalOpen(true);
    }

    function handleEditButtonPress() {
        // setIsModalOpen(false);
        // router.push(`/collections/${props.collection.id}/edit`);
    }

    const LongPressMenu = (
        <View style={[styles.container, styles.longPressMenu]}>
            <Pressable 
                onPress={handleEditButtonPress} 
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
            <View style={styles.top_section}>
                <View style={styles.card_count_box}>
                    <Text style={styles.card_count_num}>
                        {props.collection.cards.length}
                    </Text>
                </View>
            </View>

            <View style={styles.center_section}>
                <Text style={styles.text}>{props.collection.title}</Text>
            </View>

            <View style={styles.bottom_section}>
                <Image style={styles.tag_image} source={tablerIconUrls['TypeScript']}></Image>
            </View>

            { isModalOpen && LongPressMenu } 
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: 'lightblue',
        boxShadow: '1',
        padding: 10,
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
    top_section: {
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: "flex-start",
    },
    card_count_box: {
        border: '1px solid rgb(235, 113, 52)',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        backgroundColor: 'rgb(235, 113, 5)',
    },
    card_count_num: {
        fontSize: 12,
        color: 'white',
    },
    center_section: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
    bottom_section: {
        height: 25,
    },
    tag_image: {
        height: 25,
        width: 25,
        fill: 'white',
        tintColor: 'blue',
        // backgroundColor: 'red',
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
export default CollectionItem;