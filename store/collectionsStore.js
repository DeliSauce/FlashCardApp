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

            fetchCollections: async () => {
                set({ isLoading: true, error: null });
                try {
                    const collections = store.collections; // TODO replace with API call to Firebase and/or checking localstorage
                    //const collections = await getCollections()
                    set({ collections, isLoading: false });
                    return collections;
                } catch (error) {
                    set({ error: error.message, isLoading: false})
                }
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