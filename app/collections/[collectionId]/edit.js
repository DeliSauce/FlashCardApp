import React, { useCallback } from 'react';
import CollectionForm from '@/components/CollectionForm';
import { router, useLocalSearchParams } from 'expo-router';
import { useCollectionsStore, getCollectionFromId } from '@/store/collectionsStore';

export default function EditCollectionScreen() {
    const { collectionId, error } = useLocalSearchParams();
    const { updateCollection } = useCollectionsStore();
    const collection = getCollectionFromId(collectionId);

    const handleUpdatedCollection = useCallback(async (collectionFormData) => {
        await updateCollection( collectionId, collectionFormData );
        console.log('about to router.push')
        router.push(`/collections/${collectionId}`);
    }, [collectionId]);

    return (
        <CollectionForm
            onSubmit={handleUpdatedCollection}
            collectionData={collection}
            message={error}
        />
    )
}