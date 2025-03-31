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
                    // throw new Error('need to set up firestore');
                    const collections = store.collections; // TODO replace with API call to Firebase and/or checking localstorage
                    //const collections = await getCollections()
                    set({ collections, loading: false });
                    return collections;
                } catch (error) {
                    console.log('using asyc storage!!! ', error)
                    set({ error: error.message, loading: false})
                }
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

export const useCollectionParam = (collectionId, collectionParam) => {
    // TODO check for valid param
    const collectionValue = useCollectionsStore((state) => state.collections.find((collection) => collection.id === collectionId))[collectionParam];
    return collectionValue;
}

// export default useCollectionsStore;