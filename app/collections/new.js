import React, { useCallback } from 'react';
import CollectionForm from '@/components/CollectionForm';
import { router } from 'expo-router';
import { useCollectionsStore } from '@/store/collectionsStore';

export default function NewCollectionScreen() {
    const { addCollection } = useCollectionsStore();

    const handleNewCollection = useCallback(async (collectionFormData) => {
        const collectionId = await addCollection( collectionFormData );
        router.push(`/collections/${collectionId}`);
    }, []);

  return (
    <CollectionForm
      onSubmit={handleNewCollection}
    />
  )
}