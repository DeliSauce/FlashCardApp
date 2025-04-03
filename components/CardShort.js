import React, {useState, useCallback, useEffect} from "react";
import { Text, TextInput, ImageBackground, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Image } from 'expo-image';
import Markdown from 'react-native-markdown-display';

import Tag from '@/components/Tag';
import EditButton from '@/components/EditButton';

import { GestureDetector } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import {useCollectionsStore} from '@/store/collectionsStore';



const CardShort = ({ cardData, isCurrent, setNextCard, onPositionChange = () => {}, position }) => {
    const {updateCardInCollection} = useCollectionsStore();
    const tags = cardData.topics || [];
    const possibleOrientations = ['A', 'B', 'both'];
    const [swipeStatus, setSwipeStatus] = useState('normal');
    const [isFlipped, setIsFlipped] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [hiddenWithZIndex, setHiddenWithZIndex] = useState(false);
    const [gesturesEnabled, setGesturesEnabled] = useState(true);
    
    const isPressed = useSharedValue(false);
    const isLongPressed = useSharedValue(false);
    const rotate = useSharedValue('0deg');
    const flipRotation = useSharedValue(0);
    const offset = useSharedValue({ x: 0, y: 0 });
    const defaultStart = useSharedValue({ x: 0, y: 0 });
    const scale = useSharedValue(0);
    // const start = useSharedValue({ x: 0, y: 0 });
    const startX = 0;
    const startY = 0;
    const offsetStart = {x: 0, y: 0};

    // Track the x position of the card
    const translateX = useSharedValue(0);

    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    // Define the threshold for swiping off-screen
    const SWIPE_THRESHOLD_START = 10;
    const SWIPE_THRESHOLD_FINISH = 80;

    // Function to reset card position
    const resetCardPosition = useCallback(() => {
        // Return the card to its original position with spring animation
        translateX.value = 0;
        // translateY.value = withSpring(0);
      }, [translateX]);

   


    // Function to handle successful swipe
    // const handleSuccessfulSwipe = useCallback((cb) => {
    //     // Determine which direction to animate off-screen based on current position
    //     const direction = translateX.value > 0 ? 1 : -1;
    //     const distance = direction * SCREEN_WIDTH;
        
    //     // Animate card off screen horizontally using withTiming for precise control
    //     onPositionChange(SCREEN_WIDTH);
    //     // scale.value = withTiming(3, {
    //     //     duration: 1000,
    //     //     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    //     // }, (finished) => {
            
    //     //     // This callback runs after the first animation completes
    //     //     if (finished) {
    //     //         console.log('scale finished');
    //     //         // runOnJS(setNextCard)();
    //     //         // (typeof setNextCard == 'function') && setNextCard();
    //     //     }
    //     // });

    //     translateX.value = withTiming(distance, {
    //         duration: 100,
    //         easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    //     }, (finished) => {
    //         console.log('setting next card');
    //         // isCurrent && (typeof setNextCard == 'function') && setNextCard();
    //         cb();
    //         // This callback runs after the first animation completes
    //         if (finished) {
    //             // (typeof setNextCard == 'function') && runOnJS(setNextCard)();
    //         }
    //     });
    // }, [setNextCard, resetCardPosition, translateX, SCREEN_WIDTH]);

    const longPressGesture = Gesture.LongPress().enabled(gesturesEnabled)
        .minDuration(500)
        .onStart(() => { // called when longpress duration triggered (500ms here)
            console.log('onStart LongPress')
            runOnJS(setGesturesEnabled)(false);
            // runOnJS(setLongPressMode)(true);
            // scale.value = withSpring(1.05);
            // runOnJS(setStatus)('Long pressing...');
            isLongPressed.value = true;
            runOnJS(setIsModalOpen)(!isModalOpen);
        })
        .onEnd(() => {
            console.log('onEnd LongPress')
            // scale.value = withSpring(1);
        })
        .runOnJS(true);

    const tapGesture = Gesture.Tap().enabled(gesturesEnabled)
        .onBegin(() => {
            isPressed.value = true;
        })
        .onEnd(() => {
            flipRotation.value = withTiming(isFlipped ? 0 : 1, { duration: 500 });
            isPressed.value = false;
            setIsFlipped(!isFlipped);
        })
        .runOnJS(true);


    // Handling of pan gesture
    const panGesture = Gesture.Pan().enabled(gesturesEnabled)
        .onUpdate((event) => {
            // Update position as user drags
            translateX.value = event.translationX;
            const DEGREE_OF_ROTATION = 5;

            if (Math.abs(event.translationX) > SWIPE_THRESHOLD_START) {
                const direction = event.translationX > SWIPE_THRESHOLD_START ? 1 : -1;
                rotate.value = withTiming(`${direction * DEGREE_OF_ROTATION}deg`, {
                    duration: 100,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            }
            
            // console.log('pan location: ', event.translationX)

            // NOTE commented out the position change code because scaling wasn't working properly
            // TODO probably should remove rest of that code too.
            onPositionChange && runOnJS(onPositionChange)(event.translationX);
            // translateY.value = event.translationY;
        })
        .onEnd((event) => {
            // Check if threshold is met in x direction
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD_FINISH) {
                // runOnJS(handleSuccessfulSwipe)(setNextCard);
                const direction = translateX.value > 0 ? 1 : -1;
                const distance = direction * SCREEN_WIDTH;
                onPositionChange && runOnJS(onPositionChange)(SCREEN_WIDTH);
                // scale.value = 1;
                scale.value = withTiming(1, {
                    duration: 300,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }, (finished) => {
                    
                    // This callback runs after the first animation completes
                    if (finished) {
                        console.log('scale finished');
                        // runOnJS(setNextCard)();
                        // (typeof setNextCard == 'function') && setNextCard();
                    }
                });

                // rotate.value = withTiming('0deg', {
                //     duration: 100,
                //     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                // })

                translateX.value = withTiming(distance, {
                    duration: 200,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }, (finished) => {
                    console.log('setting next card');
                    runOnJS(setNextCard)();
                    // isCurrent && (typeof setNextCard == 'function') && setNextCard();
                    // This callback runs after the first animation completes
                    if (finished) {

                        // (typeof setNextCard == 'function') && runOnJS(setNextCard)();
                    }
                });

                // runOnJS()();
            } else {
                // If threshold not met, reset position with spring animation
                translateX.value = withSpring(0);
                rotate.value =withSpring('0deg');
                // translateY.value = withSpring(0);
            }
        });


    const [questionText, onChangeQuestionText] = useState(cardData.question);
    const [answerText, onChangeAnswerText] = useState(cardData.answer);

    const saveChangesToCard = () => {
        // TODO need to replace the first argument with a variable!!!
        updateCardInCollection('coll_001', cardData.id, {question: questionText, answer: answerText});
        setEditMode(false);
        setGesturesEnabled(true);
    }

    const editView = (
        <View style={{height: '100%'}}>
            <TextInput editable multiline style={styles.text_input} 
                value={`${questionText}`}
                onChangeText={onChangeQuestionText}
            />
            <TextInput editable multiline style={styles.text_input}
                value={`${answerText}`}
                onChangeText={onChangeAnswerText}
            />
            <View style={styles.edit_buttons_row}>
                <Pressable onPress={saveChangesToCard}>
                    <Image contentFit='contain' style={{height: 50}}
                    source={require('@/assets/images/save-icon.png')}/>
                </Pressable>
            </View>
        </View>
    );

    const longPressMenu = (
        <View style={[styles.card_layout, styles.longPressMenu]}>
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
            <Pressable onPress={() => console.log('TODO DELETE')} style={styles.menu_section}>
                <Image style={styles.menu_image} source={require('../assets/images/delete-icon.svg')}></Image>
                <Text style={styles.menu_text}>DELETE</Text>
            </Pressable>
            <Pressable 
                onPress={() => {
                    setIsModalOpen(false);
                    setGesturesEnabled(true);
                }} 
                style={styles.menu_section}
            >
                <Image style={styles.menu_image} source={require('../assets/images/x-icon.svg')}></Image>
                <Text style={styles.menu_text}>{'CLOSE'}</Text>
            </Pressable>
        </View>
    );
  
    // Create animated styles
    const animatedStylesCurrent = useAnimatedStyle(() => {
        return {
        transform: [
            { translateX: translateX.value },
            { rotate: rotate.value },
        ],
        };
    });

    const animatedStylesNext = useAnimatedStyle(() => {
        return {
        transform: [
            { scale: scale.value },
        ],
        };
    });

    if (!isCurrent) {
        // console.log('next card data', position)
    }
    
    const animatedStylesFront = useAnimatedStyle(() => {
        // Calculate rotation by combining flip and pan rotations
        const rotateYValue = interpolate(
            flipRotation.value,
            [0, 1],
            [0, 180]
        );
        
        return {
            transform: [
                { perspective: 800 },
                { rotateY: `${rotateYValue}deg` },
            ],
            // Only show front when not flipped
            opacity: interpolate(
                flipRotation.value,
                [0, 0.5, 0.5, 1],
                [1, 1, 0, 0]
            ),
        };
    });
    
    const animatedStylesBack = useAnimatedStyle(() => {
        // Calculate rotation by combining flip and pan rotations
        // Add 180 degrees to keep the back facing correctly
        const rotateYValue = interpolate(
          flipRotation.value,
          [0, 1],
          [180, 360]
        );
        
        return {
          transform: [
            { perspective: 800 },
            { rotateY: `${rotateYValue}deg` },
          ],
          // Only show back when flipped
          opacity: interpolate(
            flipRotation.value,
            [0, 0.5, 0.5, 1],
            [0, 0, 1, 1]
          ),
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        };
      });

    useEffect(() => {
        let distance = position ? Math.abs(position) : 0;
        if (distance < SWIPE_THRESHOLD_START) {
            scale.value = 0;
        } else if (distance <= SWIPE_THRESHOLD_FINISH) {
            scale.value = (distance - SWIPE_THRESHOLD_START) / (SWIPE_THRESHOLD_FINISH - SWIPE_THRESHOLD_START);
        } else {
            scale.value = 1;
        }
    }, [position])

    return (
        <GestureDetector gesture={Gesture.Race( longPressGesture, panGesture, tapGesture)}>  
          <Animated.View style={[
            styles.card_layout, 
            editMode ? styles.edit_mode_view : {},
            isCurrent ? animatedStylesCurrent : animatedStylesNext
          ]}>

              {/* <View style={styles.tagsrow}>
                  {tags.map((tag, index) => <Tag title={tag} key={index}/>)}
              </View> */}
            { !editMode && 
                <View style={styles.cardWrapper}>
                    {/* Front of Card */}
                    <Animated.View style={[
                        styles.card, animatedStylesFront, styles.cardFront,isCurrent ? styles.iscurrent : styles.isnext,
                        ]}>
                
                        <View>
                            <Text style={styles.info}>{`${cardData.question}`}</Text>
                        </View>

                        <View>
                            <Text>{`Card #${cardData.id} FRONT`}</Text>
                        </View>
                    </Animated.View>

                    {/* Back of Card */}
                    <Animated.View style={[
                        styles.card, animatedStylesBack, styles.cardBack, isCurrent ? styles.iscurrent : styles.isnext,
                        ]}>
                        <View>
                            <Text>{`Card #${cardData.id} BACK`}</Text>
                        </View>

                        <View style={styles.cardInner}>
                            <Markdown style={{
                                body: {color: 'black', fontSize: 15},
                                heading1: {color: 'purple'},
                                code_block: {color: 'red', fontSize: 10, backgroundColor: 'red'},
                                code_inline: {color: 'green', fontSize: 10, padding: 2}
                            }}>{cardData.answer}</Markdown>
                        </View>
                    </Animated.View>
                </View>
            }

            { editMode && editView }
    
            { isModalOpen && longPressMenu }
            
          </Animated.View>
        </GestureDetector>
    );
};


const styles = StyleSheet.create({
    card_layout: {
        position: 'absolute',
        bottom: '20px',
        display: "flex",
        width: "80%",
        height: "90%",
    },
    cardWrapper: {
        width: "100%",
        height: "100%",
        
    },
    card: {
        width: "100%",
        height: "100%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 20,
        // transform: [{rotateY: '0deg'}], // TODO should try to animate the card flip
    },
    cardFront: {
      backgroundColor: "lightblue",
    },
    cardBack: {
      backgroundColor: "rgb(235, 198, 52)",
    },
    isnext: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,
        // elevation: 11,
    },
    longPressMenu: {
      opacity: 0.8,
      backgroundColor: 'grey',
      width: "100%",
      height: "100%",
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      // alignContent: 'center',
      paddingTop: '100px',
    },
    menu_section: {
      display: 'flex',
      flexDirection: 'column'
    },
    menu_image: {
      width: 50,
      height: 50,
    },
    menu_text: {
      color: 'white',
      fontSize: 20,
    },
    edit_mode_view: {
      backgroundColor: 'red',
      padding: '0',
    },
    edit_buttons_row: {
        display: 'flex',
        justifyContent: 'center',
        height: '50px',
        width: '100%',
        backgroundColor: 'orange',
        position: 'absolute',
        top: '-50px',
    },
    edit_buttons_save_icon: {
        height: '50px',
        aspectRatio: '1',
        // width: '50px',
        // backgroundColor: 'orange',
        // position: 'absolute',
        // top: '-50px',
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      overflow: "hidden",
      
      justifyContent: "flex-end",
    },
    cardInner: {
      padding: 10,
      flexGrow: 1,
    },
    tagsrow: {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      padding: '10px'
    },
    buttonrow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    info: {
      fontSize: 25,
      color: "white",
      fontWeight: "bold",
    },
    info_small: {
      fontSize: 10,
      color: "white",
      fontWeight: "bold",
    },
    text_input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
      width: 70,
      height: 50,
      color: 'grey',
      backgroundColor: 'blue',
      fontSize: 10
    },
  });

export default CardShort;