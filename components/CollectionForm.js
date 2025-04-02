import React, { useState } from 'react';
// import { View, Text, Button, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
// import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { gemini } from "@/services/ai";
import { Picker } from '@react-native-picker/picker';
import { useCollectionsStore } from '@/store/collectionsStore';
import { useRouter } from 'expo-router';

export default function CollectionForm( props ) {
    const router = useRouter();
    const [ aiEnabled, setAiEnabled ] = useState(true);
    const [ geminiQuery, setGeminiQuery ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ numGeminiCards, setNumGeminiCards ] = useState('undefined');

    if (props.message) {
        Alert.alert('Error', props.message);
    }

    const [collectionTitle, setCollectionTitle] = 
        useState(props.collectionData ? props.collectionData.title : '');
    
    const blankCard = { question: '', answer: '', link: '', topic: '', orientation: 'both' }
    const [cards, setCards] = 
        useState(
            props.collectionData ? 
            props.collectionData.cards.map((card) => ({...blankCard, ...card})) : 
            [{...blankCard}]
        );
  
    const addCard = () => {
      setCards([
        ...cards,
        blankCard
      ]);
    };
  
    const removeCard = (index) => {
      const updatedCards = [...cards];
      updatedCards.splice(index, 1);
      setCards(updatedCards);
    };
  
    const updateCard = (index, field, value) => {
      const updatedCards = [...cards];
      updatedCards[index][field] = value;
      setCards(updatedCards);
    };
  
    const handleSubmit = () => {
      // Validate form
      if (!collectionTitle.trim()) {
        Alert.alert('Error', messages.error.title);
        return;
      }

      for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          if (!card.question.trim() || !card.answer.trim()) {
              Alert.alert('Error', messages.error.cardInfo(i+1));
              return;
            }
        }

      if (cards.length < 2) {
        Alert.alert('Error', messages.error.numCards);
        return;
      }

  
      // Form data is valid, proceed with submission
      const formData = {
        title: collectionTitle,
        cards,
      };

      props.onSubmit(formData); // TODO async handling for firebase  

      // NOTE Here you would typically send the data to your API
    };

    const handleAIQuerySubmit = async () => {
      setIsLoading(true);
      const data = await gemini.query({prompt: geminiQuery, type: 'collection', numCards: numGeminiCards});
      setIsLoading(false);
      setCollectionTitle(geminiQuery);
      setCards(data.map( card => ({...blankCard, ...card})));
      console.log('data: ', data)
    }

    const renderAIQuerySection = () => {
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>AI (Gemini)</Text>
          <TextInput
              style={styles.input}
              value={geminiQuery}
              onChangeText={setGeminiQuery}
              placeholder="Query gemini to create cards"
          />
          <Picker
            selectedValue={numGeminiCards}
            onValueChange={(value) => setNumGeminiCards(value)}
            style={styles.picker}
          >
            {
              [...Array(100+1).keys()]
                .map((_, idx) => (idx ? idx.toString() : 'undefined'))
                .map( value => (
                  <Picker.Item label={value} value={value} key={value} />
                ))
            }
          </Picker>

          {isLoading ? 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
                <Text style={styles.loadingText}>Loading results...</Text>
            </View>
          : 
          <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAIQuerySubmit}
          ><Text style={styles.geminiButtonText}>Gemini</Text></TouchableOpacity>
          
          }
        </View>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                <Text style={styles.title}>Create Card Collection</Text>
                </View>

                { renderAIQuerySection() }

                <View style={styles.formGroup}>
                <Text style={styles.label}>Collection Title</Text>
                <TextInput
                    style={styles.input}
                    value={collectionTitle}
                    onChangeText={setCollectionTitle}
                    placeholder="Enter collection title"
                />
                </View>

                <Text style={styles.sectionTitle}>Cards</Text>
                
                {cards.map((card, index) => (
                <View key={index} style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Card {index + 1}</Text>
                    {cards.length > 1 && (
                        <TouchableOpacity
                        onPress={() => removeCard(index)}
                        style={styles.removeButton}
                        >
                        <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    )}
                    </View>

                    <View style={styles.formGroup}>
                    <Text style={styles.label}>Question</Text>
                    <TextInput
                        style={styles.input}
                        value={card.question}
                        onChangeText={(value) => updateCard(index, 'question', value)}
                        placeholder="Enter question"
                        multiline
                    />
                    </View>

                    <View style={styles.formGroup}>
                    <Text style={styles.label}>Answer</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={card.answer}
                        onChangeText={(value) => updateCard(index, 'answer', value)}
                        placeholder="Enter answer"
                        multiline
                        numberOfLines={4}
                    />
                    </View>

                    <View style={styles.formGroup}>
                    <Text style={styles.label}>Link (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={card.link}
                        onChangeText={(value) => updateCard(index, 'link', value)}
                        placeholder="Enter reference link"
                    />
                    </View>

                    <View style={styles.formGroup}>
                    <Text style={styles.label}>Topic</Text>
                    <TextInput
                        style={styles.input}
                        value={card.topic}
                        onChangeText={(value) => updateCard(index, 'topic', value)}
                        placeholder="Enter topic"
                    />
                    </View>

                    <View style={styles.formGroup}>
                    <Text style={styles.label}>Orientation</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={card.orientation}
                        onValueChange={(value) => updateCard(index, 'orientation', value)}
                        style={styles.picker}
                        >
                        <Picker.Item label="Both" value="both" />
                        <Picker.Item label="Q -> A" value="qtoa" />
                        </Picker>
                    </View>
                    </View>
                </View>
                ))}

                <TouchableOpacity
                style={styles.addButton}
                onPress={() => addCard()}
                >
                <Text style={styles.addButtonText}>+ Add Another Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                >
                <Text style={styles.submitButtonText}>{`${props.collectionData ? 'Update' : 'Create'} Collection`}</Text>
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    },
    scrollView: {
    flex: 1,
    padding: 16,
    },
    header: {
    marginBottom: 24,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    },
    sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
    },
    formGroup: {
    marginBottom: 16,
    },
    label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    },
    input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    },
    multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    },
    pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    },
    picker: {
    height: 50,
    },
    cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    },
    cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    },
    cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    },
    removeButton: {
    padding: 8,
    },
    removeButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
    },
    addButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    marginBottom: 24,
    },
    addButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
    },
    submitButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
    },
    submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    },
    geminiButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    },
});
    