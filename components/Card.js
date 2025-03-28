//https://github.com/Savinvadim1312/TinderClone/blob/main/src/components/TinderCard/index.js

import React, {useState, useCallback} from "react";
import { Text, Image, ImageBackground, View, StyleSheet, Pressable, Dimensions } from "react-native";
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
  // easeInOut,
  runOnJS,
} from 'react-native-reanimated';

const Card = ({ cardData, isCurrent, setNextCard, idx, hidden }) => {
  // console.log({cardData, isCurrent, setNextCard, hidden})
  // console.log("carddata", cardData)
  // const { data, id } = props;
  const tags = cardData.topics || [];
  // const testtags = ['test1', 'test2', 'test3']

  const possibleOrientations = ['A', 'B', 'both'];
  const [swipeStatus, setSwipeStatus] = useState('normal');
  const [isFlipped, setIsFlipped] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [longPressMode, setLongPressMode] = useState(false);
  const [hiddenWithZIndex, setHiddenWithZIndex] = useState(false);
  const [gesturesEnabled, setGesturesEnabled] = useState(true);

  const isPressed = useSharedValue(false);
  const isLongPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const defaultStart = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  // const start = useSharedValue({ x: 0, y: 0 });
  const startX = 0;
  const startY = 0;
  const offsetStart = {x: 0, y: 0};

  const longPressGesture = Gesture.LongPress().enabled(gesturesEnabled)
    .minDuration(800)
    .onStart(() => { // called when longpress duration triggered (800ms here)
      console.log('onStart LongPress')
      runOnJS(setGesturesEnabled)(false);
      runOnJS(setLongPressMode)(true);
      scale.value = withSpring(1.05);
      // runOnJS(setStatus)('Long pressing...');
      isLongPressed.value = true;
      runOnJS(setLongPressMode)(!longPressMode);
    })
    .onEnd(() => {
      console.log('onEnd LongPress')
      scale.value = withSpring(1);
    })
    .runOnJS(true);

  const tapGesture = Gesture.Tap().enabled(gesturesEnabled)
    .onBegin(() => {
      isPressed.value = true;
    })
    .onEnd(() => {
      isPressed.value = false;
      setIsFlipped(!isFlipped);
    })
    .runOnJS(true);

  // const panGesture = Gesture.Pan()
  //   .onBegin(() => {
  //     // isPressed.value = true;
  //   })
  //   .onUpdate((e) => {
  //     offset.value = {
  //       x: e.translationX + startX,
  //       y: startY,
  //     };
  //   })
  //   .onEnd(() => {
  //     const threshold = 10;
      
  //     if (Math.abs(offset.value.x) < threshold) { // return to start if not moved far enough
  //       setTimeout(()=> offset.value = offsetStart, 100)
  //     } else { // 
  //       let screenWidth = 1500;
  //       if (offset.value.x < 0) {
  //         //TODO register left swipe
  //         screenWidth = -1 * screenWidth;
  //       } else {
  //         //TODO register right swipe
  //       }

  //       offset.value = {x: screenWidth, y: 0};

  //       setTimeout(()=> {
  //         setNextCard();
  //         // setSwipeStatus('swiped');
  //         setTimeout(()=> {
  //           offset.value = {x: 0, y: 0};
  //           // setSwipeStatus('normal');
  //         }, 100)
  //       }, 100);

  //     }
  //     console.log("offset: ", offset.value.x)
  //   })
  //   .onFinalize(() => {
  //     isPressed.value = false;
  //   })
  //   .runOnJS(true);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       // { translateX: swipeStatus == 'swiped' ? offset.value.x : withSpring(offset.value.x) },
  //       { translateX: withSpring(offset.value.x)  },
  //       // { translateX: offset.value.x  },
  //       { translateY: offset.value.y },
  //       // { rotateY: withSpring(isFlipped ? '360deg' : '0')},
  //       { scale: scale.value}, // withSpring(isPressed.value ? 1.01 : 1 )},
  //     ],
  //     // backgroundColor: isPressed.value ? 'yellow' : 'blue',
  //   };
  // });

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  
  // Track the x position of the card
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);
  
  // Define the threshold for swiping off-screen
  const SWIPE_THRESHOLD = 10;
  
  // Function to reset card position
  const resetCardPosition = useCallback(() => {
    // Return the card to its original position with spring animation
    translateX.value = 0;
    // translateY.value = withSpring(0);
  }, [translateX]);
  
  // Function to handle successful swipe
  const handleSuccessfulSwipe = useCallback(() => {
    // Determine which direction to animate off-screen based on current position
    const direction = translateX.value > 0 ? 1 : -1;
    const distance = direction * 500;//* (SCREEN_WIDTH + 100);
    
    // Animate card off screen horizontally using withTiming for precise control
    // translateX.value = direction * (SCREEN_WIDTH + 100);

    translateX.value = withTiming(distance, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }, (finished) => {
      // This callback runs after the first animation completes
      // Now move back to 0
      if (finished) {
        // NOTE if we call setNextCard before the animation has completed, it won't complete. So
        // I've created setHiddenWithZIndex to hide the card behind the pile until then.
        setHiddenWithZIndex(true);
        console.log('returning to zero')
        translateX.value = withTiming(0, {
          duration: 100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        setTimeout(() => {
          setNextCard();
          setHiddenWithZIndex(false);
        }, 110)
      }
    });

    // scale.value = withTiming(.5, {
    //   duration: 200
    // })

    // translateX.value = withTiming(
    //   direction * (SCREEN_WIDTH + 100), // Move beyond screen edge
    //   { 
    //     duration: 50,
    //     easing: Easing.linear
    //   }
    // );
    
    // After animation completes, run the callback and reset position
    // setTimeout(() => {
    //   // Execute callback provided by parent
    //   setNextCard();
      
    //   // Reset the card position after a small delay
    //   // We use setTimeout to ensure the card is off-screen before resetting
    //   setTimeout(() => {
    //     // resetCardPosition();
    //     // translateX.value = 0;
    //   }, 50);
    // }, 100);
  }, [setNextCard, resetCardPosition, translateX, SCREEN_WIDTH]);
  
  // Create pan gesture
  const panGesture = Gesture.Pan().enabled(gesturesEnabled)
    .onUpdate((event) => {
      // Update position as user drags
      translateX.value = event.translationX;
      // translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // Check if threshold is met in x direction
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        runOnJS(handleSuccessfulSwipe)();
      } else {
        // If threshold not met, reset position with spring animation
        translateX.value = withSpring(0);
        // translateY.value = withSpring(0);
      }
    });
  
  // Create animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
        // { translateY: 0 }
      ],
    };
  });

  const sideA = (
    <View style={styles.cardInner}>
      <Text style={styles.info}>{`${cardData.question}`}</Text>
      <Text style={styles.info_small}>{`Orientation: ${cardData.orientation}`}</Text>
    </View>
  );
  const sideB = (
    <View style={styles.cardInner}>
      {/* <Text style={styles.info}>{`${cardData.answer}`}</Text> */}
      <Markdown>{cardData.answer}</Markdown>
      <Text style={styles.info_small}>{`Orientation: ${cardData.orientation}`}</Text>
    </View>
  );


  // return (
  //     <View onClick={setNextCard} style={[
  //       styles.card, 
  //       // isFlipped ? styles.sideB : styles.sideA, 
  //       // editMode ? styles.editMode : {},
  //       // isCurrent ? animatedStyles : '',
  //       {display: hidden ? 'none': ''}
  //     ]}>
  //         <View style={styles.tagsrow}>
  //           {tags.map((tag, index) => <Tag title={tag} key={index}/>)}
  //         </View>
  //         <View>
  //           <Text>{idx+1}</Text>
  //         </View>

  //       {isFlipped ? sideB : sideA}
          
  //     </View>
  // );

  const longPressMenu = (
    <View style={[styles.card_layout, styles.longPressMenu]}>
        <View style={styles.menu_section}>
          <Image style={styles.menu_img} source={require('@/assets/images/edit-icon.svg')}></Image>
          <Text style={styles.menu_text}>EDIT</Text>
        </View>
        <View style={styles.menu_section}>
          <Image style={styles.menu_img} source={require('@/assets/images/delete-icon.svg')}></Image>
          <Text style={styles.menu_text}>DELETE</Text>
        </View>
    </View>
  );

  return (
    <GestureDetector gesture={Gesture.Race( longPressGesture, panGesture, tapGesture)}>  
      <Animated.View style={[
        styles.card_layout, 
        styles.card, 
        isFlipped ? styles.sideB : styles.sideA, 
        editMode ? styles.editMode : {},
        isCurrent ? animatedStyles : '',
        {zIndex: hiddenWithZIndex ? '-1': '1'},
        {visibility: hidden ? 'hidden' : ''}
      ]}>
        <View>
          <View style={styles.tagsrow}>
            {tags.map((tag, index) => <Tag title={tag} key={index}/>)}
          </View>
          <View>
            <Text>{`Card #${idx+1} is ${hidden ? 'hidden' : 'visible'}`}</Text>
          </View>

          {isFlipped ? sideB : sideA}
          
        </View>

        {longPressMode && longPressMenu}
        
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card_layout: {
    position: 'absolute',
    bottom: '20px',
    display: "flex",
    borderRadius: 10,
  },
  card: {
    flexDirection: 'column',
    width: "80%",
    height: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    transform: [{rotateY: '0deg'}],
  },
  longPressMenu: {
    opacity: '.8',
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
  menu_img: {
    width: '40px',
    height: '40px',
  },
  menu_text: {
    color: 'white',
    fontSize: '16px',
  },
  sideA: {
    backgroundColor: "lightblue",
  },
  sideB: {
    backgroundColor: "lightgrey",
    transform: [{rotateY: '45deg'}],
  },
  editMode: {
    // backgroundColor: 'red',
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
  button: {
    width: 70,
    height: 50,
    color: 'grey',
    backgroundColor: 'blue',
    fontSize: 10
  },
});

export default Card;
