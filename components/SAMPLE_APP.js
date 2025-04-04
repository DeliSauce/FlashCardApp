// App.js - Updated with Zustand store integration

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import GoogleAuth from './GoogleAuth';
import { useStore } from './store';
import { sampleData } from './sampleData';

export default function App() {
  // Access store state and actions
  const user = useStore(state => state.user);
  const userData = useStore(state => state.userData);
  const collections = useStore(state => state.collections);
  const selectedCollection = useStore(state => state.selectedCollection);
  const collectionForm = useStore(state => state.collectionForm);
  const cardForm = useStore(state => state.cardForm);
  const modalVisible = useStore(state => state.modalVisible);
  const isLoading = useStore(state => state.isLoading);
  const importStarted = useStore(state => state.importStarted);
  
  // Actions
  const setUser = useStore(state => state.setUser);
  const selectCollection = useStore(state => state.selectCollection);
  const clearSelectedCollection = useStore(state => state.clearSelectedCollection);
  const updateCollectionForm = useStore(state => state.updateCollectionForm);
  const createCollection = useStore(state => state.createCollection);
  const deleteCollection = useStore(state => state.deleteCollection);
  const updateCardForm = useStore(state => state.updateCardForm);
  const setModalVisible = useStore(state => state.setModalVisible);
  const initCardEdit = useStore(state => state.initCardEdit);
  const saveCard = useStore(state => state.saveCard);
  const deleteCard = useStore(state => state.deleteCard);
  const importCollections = useStore(state => state.importCollections);

  const handleAuthStateChanged = (firebaseUser) => {
    setUser(firebaseUser);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Flashcard Collections</Text>
      
      <GoogleAuth onAuthStateChanged={handleAuthStateChanged} />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      )}
      
      {user ? (
        <ScrollView style={styles.contentContainer}>
          {!selectedCollection ? (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Collections</Text>
                {collections.length > 0 ? (
                  collections.map((collection) => (
                    <TouchableOpacity 
                      key={collection.id} 
                      style={styles.collectionItem}
                      onPress={() => selectCollection(collection.id)}
                    >
                      <Text style={styles.collectionTitle}>{collection.title}</Text>
                      <Text style={styles.collectionMeta}>
                        {collection.cards ? collection.cards.length : 0} cards • 
                        Last updated: {new Date(collection.updatedAt).toLocaleDateString()}
                      </Text>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => deleteCollection(collection.id)}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>No collections yet. Create your first collection below!</Text>
                )}
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Create New Collection</Text>
                <TextInput
                  style={styles.input}
                  value={collectionForm.title}
                  onChangeText={(text) => updateCollectionForm({ title: text })}
                  placeholder="Collection title..."
                />
                <Button title="Create Collection" onPress={createCollection} />
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Import Sample Collections</Text>
                <Button 
                  title={importStarted ? "Importing..." : "Import Sample Collections"} 
                  onPress={() => importCollections(sampleData)}
                  disabled={importStarted}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.collectionHeader}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={clearSelectedCollection}
                >
                  <Text style={styles.backButtonText}>← Back to Collections</Text>
                </TouchableOpacity>
                <Text style={styles.collectionHeaderTitle}>{selectedCollection.title}</Text>
              </View>
              
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Flashcards</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+ Add Card</Text>
                  </TouchableOpacity>
                </View>
                
                {selectedCollection.cards && selectedCollection.cards.length > 0 ? (
                  selectedCollection.cards.map((card) => (
                    <View key={card.id} style={styles.cardItem}>
                      <Text style={styles.cardQuestion}>{card.question}</Text>
                      <Text style={styles.cardAnswer}>{card.answer}</Text>
                      {card.topic && <Text style={styles.cardTopic}>Topic: {card.topic}</Text>}
                      <View style={styles.cardActions}>
                        <TouchableOpacity 
                          style={[styles.cardActionButton, styles.editButton]}
                          onPress={() => initCardEdit(card)}
                        >
                          <Text style={styles.cardActionButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.cardActionButton, styles.deleteButton]}
                          onPress={() => deleteCard(card.id)}
                        >
                          <Text style={styles.cardActionButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No cards in this collection yet. Add your first card!</Text>
                )}
              </View>
            </>
          )}
        </ScrollView>
      ) : (
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            Welcome to Flashcard Collections! Sign in with Google to start creating collections and cards.
          </Text>
        </View>
      )}
      
      {/* Modal for adding/editing cards */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {cardForm.isEditing ? "Edit Card" : "Add New Card"}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={cardForm.question}
              onChangeText={(text) => updateCardForm({ question: text })}
              placeholder="Question"
              multiline
            />
            
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              value={cardForm.answer}
              onChangeText={(text) => updateCardForm({ answer: text })}
              placeholder="Answer"
              multiline
            />
            
            <TextInput
              style={styles.modalInput}
              value={cardForm.link}
              onChangeText={(text) => updateCardForm({ link: text })}
              placeholder="Reference Link (optional)"
            />
            
            <TextInput
              style={styles.modalInput}
              value={cardForm.topic}
              onChangeText={(text) => updateCardForm({ topic: text })}
              placeholder="Topic (optional)"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveCard}
              >
                <Text style={styles.buttonText}>
                  {cardForm.isEditing ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 999,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  collectionItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#4285F4',
    paddingLeft: 10,
    marginBottom: 15,
    position: 'relative',
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  collectionMeta: {
    fontSize: 12,
    color: '#666',
  },
  collectionHeader: {
    marginBottom: 20,
  },
  collectionHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#4285F4',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#4285F4',
  },
  cardQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardAnswer: {
    marginBottom: 10,
  },
  cardTopic: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardActionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cardActionButtonText: {
    color: 'white',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalTextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});