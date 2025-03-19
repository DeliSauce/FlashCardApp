//https://github.com/Savinvadim1312/TinderClone/blob/main/src/components/TinderCard/index.js

import React, {useState} from "react";
import { Text, ImageBackground, View, StyleSheet, Pressable } from "react-native";
import Markdown from 'react-native-markdown-display';

import Tag from '@/components/Tag';

import { GestureDetector } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Card = ({A, B, topics, orientation, status, language, isCurrent, setNextCard, hidden}) => {
  console.log({A, B, topics, orientation, status, language, isCurrent, setNextCard, hidden})
  // const { data, id } = props;
  const tags = [topics];
  // const testtags = ['test1', 'test2', 'test3']

  const possibleOrientations = ['A', 'B', 'both'];
  const [swipeStatus, setSwipeStatus] = useState('normal');
  const [isFlipped, setIsFlipped] = useState(false);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const defaultStart = useSharedValue({ x: 0, y: 0 });
  
  const start = useSharedValue({ x: 0, y: 0 });

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onEnd(() => {
      isPressed.value = false;
      setIsFlipped(!isFlipped);
    })
    .runOnJS(true);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: start.value.y,
      };
    })
    .onEnd(() => {
      if (Math.abs(offset.value.x) < 50) {
        setTimeout(()=> offset.value = {x: 0, y: 0}, 100)
      } else {
        let z = 1;
        if (offset.value.x < 0) {
          //TODO register left swipe
          z = -1;
        } else {
          //TODO register right swipe
        }

        offset.value = {x: 600 * z, y: 0};

        setTimeout(()=> {
          setNextCard();
          setSwipeStatus('swiped');
          offset.value = {x: 0, y: 0}
          setTimeout(()=> {
            setSwipeStatus('normal');
          }, 20)
        }, 100);

      }
      console.log("offset: ", offset.value.x)
    })
    .onFinalize(() => {
      isPressed.value = false;
      // start.value = { x: 0, y: 0 };
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: swipeStatus == 'swiped' ? offset.value.x : withSpring(offset.value.x) },
        { translateY: offset.value.y },
        // { rotateY: withSpring(isFlipped ? '360deg' : '0')},
        { scale: withSpring(isPressed.value ? 1.01 : 1 )},
      ],
      // backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });


  const sideA = (
    <View style={styles.cardInner}>
      <Text style={styles.info}>{`${A}`}</Text>
      {/* <Markdown>{A}</Markdown> */}
      <Text style={styles.info_small}>{`Orientation: ${orientation}`}</Text>
    </View>
  );
  const sideB = (
    <View style={styles.cardInner}>
      {/* <Text style={styles.info}>{`${B}`}</Text> */}
      <Markdown>{B}</Markdown>
      <Text style={styles.info_small}>{`Orientation: ${orientation}`}</Text>
    </View>
  );

  return (
    <GestureDetector gesture={Gesture.Exclusive( panGesture, tapGesture)}>
      <Animated.View style={[
        styles.card, 
        isFlipped ? styles.sideB : styles.sideA, 
        isCurrent ? animatedStyles : '',
        {display: hidden ? 'none': ''}
      ]}>
          <View style={styles.tagsrow}>
            {tags.map((tag, index) => <Tag title={tag} key={index}/>)}
          </View>

        {isFlipped ? sideB : sideA}
          
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    display: "flex",
    flexDirection: 'column',
    width: "80%",
    height: "80%",
    borderRadius: 10,
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
  sideB: {
    backgroundColor: "lightgrey",
    transform: [{rotateY: '45deg'}],
  },
  sideA: {
    backgroundColor: "lightblue",
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
