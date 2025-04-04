// firestore.js - Updated for flashcard collections data structure

import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    orderBy
  } from 'firebase/firestore';
  import { firestore } from './firebaseNEW';

  const timeStamp = () => new Date().toISOString();

  // Create new user the first time someone signs in
  export const createUserData = async (user) => {
    try {
        const docSnap = await getDoc(doc(firestore, 'users', user.uid));

        if (docSnap.exists()) {
            return { success: false, message: 'User already exists' };
        } else {
            await saveUserData(user);
            return { success: true, message: 'User created successfully' };
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user' };
    }
  }
  
  // Save user data to Firestore
  export const saveUserData = async (user) => {
    try {
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        lastLogin: timeStamp(),
      }, { merge: true });
      console.log('User data saved to Firestore');
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };
  
  // Get user data from Firestore
  export const getUserData = async (userId) => {
    try {
      const docRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };
  
  // FLASHCARD COLLECTIONS FUNCTIONS
  
  // Create a new collection
  export const createCollection = async (userId, collectionData) => {
    try {
      const collectionRef = collection(firestore, 'collections');
      const docRef = doc(collectionRef);
      const collectionID = docRef.id;

      const collectionWithMetadata = {
          authorId: userId,
          id: collectionID,
          createdAt: timeStamp(),
          updatedAt: timeStamp(),
          cards: [],
          title: '',
        ...collectionData,
      };

      console.log('firestore createcollection, data: ', collectionWithMetadata, '\n\ncolllectionID: ', collectionID)
      await setDoc(docRef, collectionWithMetadata);
      console.log('Collection created with ID:', collectionID);
      return collectionID;
    } catch (error) {
      console.error('Error creating collection:', error);
      return null;
    }
  };
  
  // Get all collections for a user
  export const getUserCollections = async (userId) => {
    try {
      const q = query(
        collection(firestore, 'collections'),
        where('authorId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const collections = [];
      
      querySnapshot.forEach((doc) => {
        collections.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return collections;
    } catch (error) {
      console.error('Error getting user collections:', error);
      return [];
    }
  };
  
  // Get a specific collection by ID
  export const getCollection = async (collectionID) => {
    try {
      const docRef = doc(firestore, 'collections', collectionID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        console.log('No such collection!');
        return null;
      }
    } catch (error) {
      console.error('Error getting collection:', error);
      return null;
    }
  };
  
  // Update a collection
  export const updateCollection = async (collectionID, data) => {
    try {
      const docRef = doc(firestore, 'collections', collectionID);
      
      await updateDoc(docRef, {
        ...data,
        updatedAt: timeStamp()
      });
      
      console.log('Collection updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating collection:', error);
      return false;
    }
  };
  
  // Delete a collection
  export const deleteCollection = async (collectionID) => {
    try {
      await deleteDoc(doc(firestore, 'collections', collectionID));
      console.log('Collection deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting collection:', error);
      return false;
    }
  };
  
  // FLASHCARD FUNCTIONS
  

  // TODO review
  // Add a card to a collection
  export const addCard = async (collectionID, cardData) => {
    try {
      // First get the current collection
      const collection = await getCollection(collectionID);
      
      if (!collection) {
        throw new Error('Collection not found');
      }
      
      // Create a new card with proper metadata
      const newCard = {
        ...cardData,
        id: `card_${Date.now()}`, // Generate a unique ID
        createdAt: timeStamp(),
        updatedAt: timeStamp()
      };
      
      // Add the card to the collection's cards array
      const updatedCards = [...(collection.cards || []), newCard];
      
      // Update the collection document
      await updateDoc(doc(firestore, 'collections', collectionID), {
        cards: updatedCards,
        updatedAt: timeStamp()
      });
      
      console.log('Card added successfully');
      return newCard.id;
    } catch (error) {
      console.error('Error adding card:', error);
      return null;
    }
  };


  // TODO review
  // Update a card in a collection
  export const updateCard = async (collectionID, cardId, cardData) => {
    try {
      // First get the current collection
      const collection = await getCollection(collectionID);
      
      if (!collection || !collection.cards) {
        throw new Error('Collection or cards not found');
      }
      
      // Find the card index
      const cardIndex = collection.cards.findIndex(card => card.id === cardId);
      
      if (cardIndex === -1) {
        throw new Error('Card not found in collection');
      }
      
      // Update the card
      const updatedCard = {
        ...collection.cards[cardIndex],
        ...cardData,
        updatedAt: timeStamp()
      };
      
      // Create new cards array with the updated card
      const updatedCards = [...collection.cards];
      updatedCards[cardIndex] = updatedCard;
      
      // Update the collection document
      await updateDoc(doc(firestore, 'collections', collectionID), {
        cards: updatedCards,
        updatedAt: timeStamp()
      });
      
      console.log('Card updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating card:', error);
      return false;
    }
  };

  // TODO: review
  // Delete a card from a collection
//   export const deleteCard = async (collectionID, cardId) => {
//     try {
//       // First get the current collection
//       const collection = await getCollection(collectionID);
      
//       if (!collection || !collection.cards) {
//         throw new Error('Collection or cards not found');
//       }
      
//       // Filter out the card to delete
//       const updatedCards = collection.cards.filter(card => card.id !== cardId);
      
//       if (updatedCards.length === collection.cards.length) {
//         throw new Error('Card not found in collection');
//       }
      
//       // Update the collection document
//       await updateDoc(doc(firestore, 'collections', collectionID), {
//         cards: updatedCards,
//         updatedAt: timeStamp()
//       });
      
//       console.log('Card deleted successfully');
//       return true;
//     } catch (error) {
//       console.error('Error deleting card:', error);
//       return false;
//     }
//   };
  

  // TODO: review
  // Import collections
//   export const importCollections = async (userId, collections) => {
//     try {
//       // Add userId to each collection
//       const collectionsWithUserId = collections.map(collection => ({
//         ...collection,
//         userId,
//         updatedAt: timeStamp()
//       }));
      
//       // Create a batch or use Promise.all to import all collections
//       const importPromises = collectionsWithUserId.map(async (collectionData) => {
//         return await addDoc(collection(firestore, 'collections'), collectionData);
//       });
      
//       await Promise.all(importPromises);
      
//       console.log('Collections imported successfully');
//       return true;
//     } catch (error) {
//       console.error('Error importing collections:', error);
//       return false;
//     }
//   };