import react, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
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
    const [idx, setIdx] = useState(cards.length - 1);

    // TODO move into useCallback so that it doesn't get recreated?
    const setNextCard = () => {
        // console.log(idx)
        if (idx - 1 < 0) {
            setIdx(cards.length - 1)
        } else {
            setIdx(idx => idx - 1)
        }
    }
    
    // console.log("DATA:::::", cards, sequence)
    // console.log(cards.slice(idx, idx+2))

    useEffect(() => {
        // TODO update cards if it changes?
    })

    return (
        <View style={styles.cardstack}>
            {cards.map((card, i) => {
                const hidden = !(idx === i || i === (idx - 1));
                console.log('cardData: ', card)
                // console.log('card: ', card)
                return (
                    <Card
                        cardData={card}
                        // question={card.question} 
                        // answer={card.answer} 
                        // topics={card.topic}
                        // orientation={card.orientation} 
                        // status={card.status} 
                        // language={card.language} 
                        isCurrent={i === idx}
                        setNextCard={setNextCard}
                        key={i}
                        hidden={hidden}
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