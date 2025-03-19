import react, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '@/components/Card';



const CardStack = ({dataset}) => {
    console.log('number of cards instack: ', dataset.length)
    // const sequence = Array.from({length: data.length}, (x, i) => i);

    // const [dataset, setDataset] = useState(data.slice(1));
    // TODO add random sequence
    // const sequence = [0,1,2,3,4,5]
    const [idx, setIdx] = useState(dataset.length - 1);

    // TODO move into useEffect so that it doesn't get recreated?
    const setNextCard = () => {
        console.log(idx)
        if (idx - 1 < 0) {
            setIdx(dataset.length - 1)
        } else {
            setIdx(idx => idx - 1)
        }
    }
    
    // console.log("DATA:::::", dataset, sequence)
    // console.log(dataset.slice(idx, idx+2))

    useEffect(() => {
        // TODO update dataset if it changes?
    })

    return (
        <View style={styles.cardstack}>
            {dataset.map((datum, i) => {
                const hidden = !(idx === i || i === (idx - 1));
                // console.log('hidden: ', hidden)
                return (
                    <Card
                        A={datum[0]} 
                        B={datum[1]} 
                        topics={datum[2]}
                        orientation={datum[3]} 
                        status={datum[4]} 
                        language={datum[5]} 
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