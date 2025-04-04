import React, { useCallback } from 'react';
import CollectionForm from '@/components/CollectionForm';
import { router, useLocalSearchParams } from 'expo-router';
import { useStore, getCollectionFromID } from '@/store/store';

export default function EditCollectionScreen() {
    const { collectionID, error } = useLocalSearchParams();
    const { updateCollection } = useStore();
    const collection = getCollectionFromID(collectionID);

    const handleUpdatedCollection = useCallback(async (collectionFormData) => {
        await updateCollection( collectionID, collectionFormData );
        console.log('about to router.push')
        router.push(`/collections/${collectionID}`);
    }, [collectionID]);

    return (
        <CollectionForm
            onSubmit={handleUpdatedCollection}
            collectionData={collection}
            message={error}
        />
    )
}