export const DATA = {
    format: ({data, filter}) => {
        const categories = data.shift();
        console.log('categories: ', categories, 'first data: ', data[0])
        // return data;

        // TODO filter out non final cards and push "" to make sure each card has 6 properties
        return data
            .map((card) => {
                let count = categories.length - card.length;
                // console.log('card: ', Array.isArray(card), 'count', count)
                while (count > 0 && count) {
                    // card = [];
                    card.push(" ");
                    count--;
                }
                console.log(card.length)
                return card;
            })
            .filter((card) => {
                return card[5] === 'final';
            });
    }
}