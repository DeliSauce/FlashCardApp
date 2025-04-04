import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '@/tests/mock-store';
import * as FIRESTORE from '@/services/firestore';

export const useStore = create(
    // (set) => ({
    //     bears: 0,
    //     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //     removeAllBears: () => set({ bears: 0 }),
    //     updateBears: (newBears) => set({ bears: newBears }),
    //   })

    // (set) => ({collections: store.collections})

    persist(
        (set, get) => ({
            user: null,
            collections: [],
            loading: false,
            error: null,


            setUser: async (userData) => {

                set({ user: userData, loading: false, error: null });

            },

            // fetchUser: async () => {
            //     set({ loading: true, error: null });

            //     try {
                    
            //     } catch (error) {
                    
            //     }
            // },

            fetchCollections: async () => {
                set({ loading: true, error: null });

                try {
                    const userID = get().user.uid;
                    const collections = await FIRESTORE.getUserCollections(userID);
                    set({ collections, loading: false });
                    return collections;
                } catch (error) {
                    console.log('process.env.EXPO_PUBLIC_USE_MOCK_DATA', process.env.EXPO_PUBLIC_USE_MOCK_DATA)
                    if (process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'enabled' && get().collections.length === 0) {
                        const collections = store.collections; // TODO replace with API call to Firebase and/or checking localstorage
                        set({collections})
                    }
                    console.log('using asyc storage!!! ', error)
                    set({ error: error.message, loading: false})
                }
            },

            getCollectionValueFromParam: (collectionParam, collectionID) => {
                const collection = get().collections.find((collection) => collection.id === collectionID);
                const collectionValue = collection ? collection[collectionParam] : undefined;

                // TODO check for valid param
                // const collectionValue = useStore((state) => state.collections
                //     .find((collection) => collection.id === collectionID))[collectionParam];
                return collectionValue;
            },

            addCollection: async (newCollectionData) => {
                set({ loading: true, error: null });
                const newCollection = validate({type: 'collection', data: newCollectionData});
                console.log('validated new collection', newCollection)

                try {
                    const userID = get().user.uid;
                    const collectionID = await FIRESTORE.createCollection(userID, newCollection);
                    const collections = await FIRESTORE.getUserCollections(userID);
                    set({ collections, loading: false });
                    return collectionID;                    
                } catch (error) {
                    const collections = [...get().collections, newCollection];
                    set({collections, loading: false, error: null});
                    const collectionID = newCollection.id;
                    console.log('*** create a new collection, id: ', collectionID);
                    return collectionID;
                }
            },

            deleteCollection: async (collectionID) => {
                set({ loading: true, error: null });
                const collections = get().collections
                    .filter( (collection) => collection.id !== collectionID);
                set({ collections, loading: false, error: null });
            },

            updateCollection: async (collectionID, updatedCollectionData) => {
                console.log('updateCollection, ', updatedCollectionData)
                set({ loading: true, error: null });
                // const { collections } = get();
                const updatedCollection = validate({type: 'collection', data: {...updatedCollectionData, id: collectionID}});
                const collections = get().collections
                    .map((collection) => collection.id === collectionID ? updatedCollection : collection);
                set({ collections, loading: false, error: null });
                const id = updatedCollection.id;
                console.log('*** updated a collection, id: ', id);
                return id;
            },

            updateCardInCollection: async (collectionID, cardId, data) => {
                set({ loading: true, error: null })
                const collections = store.collections;
                const newCollections = collections.map(( collection ) => {
                    if (collection.id === collectionID) {
                        return {
                            ...collection, 
                            cards: collection.cards.map(( card ) => {
                                if (card.id === cardId) {
                                    return {
                                        ...card, 
                                        question: data.question, 
                                        data: data.answer, 
                                        updatedAt: new Date().toISOString(),
                                    }
                                } else {
                                    return card;
                                }
                            }),
                            updatedAt: new Date().toISOString(),
                        }
                    } else {
                        return collection;
                    }
                });
                set({ collections: newCollections })
            }
        }),
        {
            name: 'flashcard-collectionsasync', 
            getCollectionsStorage: () => AsyncStorage
        }
    )
)

// TODO add actual validation of the fields in data
const validate = ({type, data}) => {
    const timestamp = new Date().toISOString();
    let newData = {};

    if (type === 'collection') {
        newData = {
            ...data, 
            createdAt: timestamp,
            updatedAt: timestamp,
            cards: data.cards.map(( card, idx ) => {
                return {
                    ...card,
                    id: `card_${idx}`,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    status: 'final',
                }
            })
        }
    }
    console.log('newData', newData)
    return newData;
}

// export const useCollectionParam = (collectionID, collectionParam) => {
//     // TODO check for valid param
//     const collectionValue = useStore((state) => state.collections
//         .find((collection) => collection.id === collectionID))[collectionParam];
//     return collectionValue;
// }

export const getCollectionFromID = (collectionID) => {
    const collection = useStore((state) => state.collections
        .find((collection) => collection.id === collectionID));
    return collection;
}

// export default useStore;