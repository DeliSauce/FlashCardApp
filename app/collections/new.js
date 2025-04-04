import React, { useCallback } from 'react';
import CollectionForm from '@/components/CollectionForm';
import { router } from 'expo-router';
import { useStore } from '@/store/store';

export default function NewCollectionScreen() {
    const addCollection = useStore(state => state.addCollection);

    const handleNewCollection = useCallback(async (collectionFormData) => {
        const collectionID = await addCollection( collectionFormData );
        console.log('NEW', {collectionID})
        router.push(`/`);
    }, []);

  return (
    <CollectionForm
      onSubmit={handleNewCollection}
    />
  )
}