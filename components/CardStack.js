import react, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Card from '@/components/Card';
import {useCollectionsStore} from '@/store/collectionsStore'

const CardStack = ({collectionId}) => {
    console.log({collectionId})
    // const collections = useCollectionsStore((state) => state.collections)
    const cards = useCollectionsStore((state) => state.collections.find((collection) => collectionId === collection.id).cards)
    // console.log('collection: ', collections, collections.find((collection) => collectionId === collection.id))
    console.log("cards: ", cards)

    console.log('Cardstack: cards: ', cards)
    // console.log('number of cards instack: ', cards.length)
    // const sequence = Array.from({length: data.length}, (x, i) => i);
    // TODO add random sequence
    const [currentIdx, setCurrentIdx] = useState(cards.length - 1);

    // useCallback since this is being passed into child component. Don't want child to rerender whenever parent does. 
    // (setNextCard would be recreated on rerender and therefore prop would change)
    const setNextCard = useCallback(() => {
        // console.log(currentIdx)
        if (currentIdx - 1 < 0) {
            setCurrentIdx(cards.length - 1)
        } else {
            setCurrentIdx(currentIdx - 1)
        }
    }, [currentIdx])

    console.log('Cardstack, current card #', currentIdx)

    return (
        <View style={styles.cardstack}>
            {/* <View style={{position: 'absolute', bottom: '100px'}}><Text>THE END</Text></View> */}
            {cards.map((card, idx) => {
                const visible = (currentIdx === idx || idx === (currentIdx - 1));
                // const hidden = !(currentIdx === idx || idx === (currentIdx - 1));

                return (
                    <Card
                        cardData={card}
                        isCurrent={idx === currentIdx}
                        setNextCard={setNextCard}
                        idx={idx}
                        hidden={!visible}
                        key={idx}
                    >
                    </Card>
                )
            })}
        </View>
    )
}


// {[dataset[idx + 1 == dataset.length ? 0 : idx + 1], dataset[idx]].map((datum, i) => {
//     const isCurrent = i == 1;
//     console.log("T: ", idx + 1 == dataset.length ? 0 : idx + 1, idx)
//     console.log("T: ", [dataset[idx + 1 == dataset.length ? 0 : idx + 1], dataset[idx]])
    
//     return (
//         <Card
//             A={datum[0]} 
//             B={datum[1]} 
//             topics={datum[2]}
//             orientation={datum[3]} 
//             isCurrent={isCurrent}
//             setNextCard={setNextCard}
//             key={i}
//         >
//         </Card>
//     )
// })}




{/* <Card 
A={data[sequence[idx+1]][0]} 
B={data[sequence[idx+1]][1]} 
topics={data[sequence[idx+1]][2]}
orientation={data[sequence[idx+1]][3]}
isCurrent={false}
/>
<Card 
A={data[sequence[idx]][0]} 
B={data[sequence[idx]][1]} 
topics={data[sequence[idx]][2]}
orientation={data[sequence[idx]][3]} 
isCurrent={true}
nextCard={() => setIdx(idx => idx + 1)}
/> */}

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

export default CardStack;