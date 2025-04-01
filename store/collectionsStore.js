import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '@/tests/mock-store';

export const useCollectionsStore = create(
    // (set) => ({
    //     bears: 0,
    //     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //     removeAllBears: () => set({ bears: 0 }),
    //     updateBears: (newBears) => set({ bears: newBears }),
    //   })

    // (set) => ({collections: store.collections})

    persist(
        (set, get) => ({
            collections: [],
            loading: false,
            error: null,

            fetchCollections: async () => {
                set({ loading: true, error: null });
                try {
                    throw new Error('need to set up firestore');
                    //const collections = await getCollections()
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

            // TODO this is a mess, need to redo (try/catch, firebase db, mutability)
            addCollection: async (newCollectionData) => {
                set({ loading: true, error: null });
                const { collections } = get();
                const newCollection = validate({type: 'collection', data: newCollectionData});
                const updatedCollections = [...collections, newCollection];
                set({collections: updatedCollections, loading: false, error: null})
            },

            updateCardInCollection: async (collectionId, cardId, data) => {
                set({ loading: true, error: null })
                const collections = store.collections;
                const newCollections = collections.map(( collection ) => {
                    if (collection.id === collectionId) {
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
    const collectionId = `coll_${Math.random()}`;
    let newData = {};

    if (type == 'collection') {
        newData = {
            ...data, 
            id: collectionId,
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

export const useCollectionParam = (collectionId, collectionParam) => {
    // TODO check for valid param
    const collectionValue = useCollectionsStore((state) => state.collections.find((collection) => collection.id === collectionId))[collectionParam];
    return collectionValue;
}

// export default useCollectionsStore;