import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  SafeAreaView
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CardStackClaude = () => {
  // Sample flashcard data
  const initialCards = [
    { id: 1, question: 'What is React Native?', answer: 'A framework for building native apps using React' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension to JavaScript used with React' },
    { id: 3, question: 'What is a component?', answer: 'The building blocks of React applications' },
    { id: 4, question: 'What is state?', answer: 'An object that determines how a component renders and behaves' },
    { id: 5, question: 'What are props?', answer: 'Properties passed to a component from its parent' },
  ];

  const [cards, setCards] = useState(initialCards);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  
  // Move top card to bottom of the deck
  const moveToBottom = () => {
    // Animate the card moving away
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After animation completes, update the card order
      const newCards = [...cards];
      const topCard = newCards.shift();
      newCards.push(topCard);
      
      // Reset state for the next card
      setCards(newCards);
      setShowAnswer(false);
      animation.setValue(0);
    });
  };

  // Toggle between question and answer
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Animation styles
  const animatedStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, width + 100]
        })
      },
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '10deg']
        })
      }
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })
  };

  // Stack effect for cards behind the top card
  const renderStackedCards = () => {
    return cards.slice(1, 3).map((card, index) => (
      <View 
        key={card.id}
        style={[
          styles.card, 
          styles.stackedCard,
          { 
            top: (index + 1) * 5, 
            left: (index + 1) * 5,
            right: -(index + 1) * 5,
            opacity: 0.7 - (index * 0.2),
            zIndex: -index
          }
        ]}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Flashcards</Text>
      
      <View style={styles.deckContainer}>
        {/* Stacked cards in the background */}
        {renderStackedCards()}
        
        {/* Top card (current card) */}
        {cards.length > 0 && (
          <Animated.View style={[styles.card, animatedStyles]}>
            <Text style={styles.cardText}>
              {showAnswer ? cards[0].answer : cards[0].question}
            </Text>
            <Text style={styles.cardHint}>
              {showAnswer ? 'Answer' : 'Question'}
            </Text>
          </Animated.View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.toggleButton]} 
          onPress={toggleAnswer}
        >
          <Text style={styles.buttonText}>
            {showAnswer ? 'Show Question' : 'Show Answer'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.nextButton]} 
          onPress={moveToBottom}
        >
          <Text style={styles.buttonText}>Next Card</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.counter}>
        {cards.length > 0 ? `Card ${cards[0].id} of ${cards.length}` : 'No cards'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deckContainer: {
    width: width - 40,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  stackedCard: {
    backgroundColor: '#f0f0f0',
  },
  cardText: {
    fontSize: 22,
    textAlign: 'center',
  },
  cardHint: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 12,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  toggleButton: {
    backgroundColor: '#4a86e8',
  },
  nextButton: {
    backgroundColor: '#34a853',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  counter: {
    marginTop: 20,
    color: '#666',
  },
});

export default CardStackClaude;