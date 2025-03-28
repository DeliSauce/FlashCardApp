import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { View, StyleSheet } from 'react-native';
import CardShort from '@/components/CardShort';
import {useCollectionsStore} from '@/store/collectionsStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const CardStackShort = ({ collectionId }) => {
    const cards = useCollectionsStore((state) => state.collections.find((collection) => collectionId === collection.id).cards)
    const [currentIdx, setCurrentIdx] = useState(0); 
    const [activeCardPosition, setActiveCardPosition] = useState(0);

    // useCallback since this is being passed into child component. Don't want child to rerender whenever parent does. 
    // (setNextCard would be recreated on rerender and therefore prop would change)
    const setNextCard = useCallback(() => {
        // console.log(currentIdx)
        if (currentIdx === cards.length - 1) {
            setCurrentIdx(0)
        } else {
            setCurrentIdx(currentIdx + 1)
        }
    }, [currentIdx])

    const handlePositionChange = (translateX) => {
        // console.log('handlePositionChange')
        setActiveCardPosition(translateX);
    }

    const currentCard = cards[currentIdx];
    const nextCard = cards[currentIdx == cards.length - 1 ? 0 : currentIdx + 1]

    return (
        <View style={styles.cardstack}>
            <CardShort
                isCurrent={ false }
                cardData={nextCard}
                setNextCard={setNextCard}
                key={nextCard.id}
                position={activeCardPosition}
            >
            </CardShort>
            <CardShort
                isCurrent={ true }
                cardData={currentCard}
                setNextCard={setNextCard}
                key={currentCard.id}
                onPositionChange={handlePositionChange}
            >
            </CardShort>
        </View>
    )
}


const styles = StyleSheet.create({
    cardstack: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse'
        // position: 'absolute'
    },
    currentCard: {

    },
    nextCard: {
        // transform: 'scale(.3)',
        // transform: [{scale: 0.3}],

    }
})

export default CardStackShort;