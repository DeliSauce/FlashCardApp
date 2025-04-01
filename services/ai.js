// import GEMINI_API_KEY from ".env"

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

const defaultPrompt = "What's the difference between async/await and Promises?";

export const gemini = {
    async query({prompt = defaultPrompt, type = 'card', numCards, version = "gemini-2.0-flash"}){
        console.log("*****GEMINI ", {prompt, type, numCards});
        let query; 
        const topics = ['JS', 'General', 'React', 'Web', 'Frontend']; // TODO need better system
        const collectionFormatting = `
            Format your response as valid JSON with the following schema:
            {
            "question": "the question that was asked",
            "answer": "your detailed answer to the question",
            "link": "a URL to a helpful resource related to this topic",
            "topic": "one of: ${topics.join(", ")} "
            }
            
            Ensure the JSON is properly formatted with no explanation text outside the JSON structure.
        `;
        const cardFormatting = `
            Format your response as valid JSON with the following schema:
            {
            "question": "the question that was asked",
            "answer": "your detailed answer to the question",
            "link": "a URL to a helpful resource related to this topic",
            "topic": "one of: ${topics.join(", ")} "
            }
            
            Ensure the JSON is properly formatted with no explanation text outside the JSON structure.
        `;
        if (type == 'collection') {
            query = `Create ${numCards} flashcards based on the following topic: ${prompt}`;
            query += collectionFormatting;
        }
        if (type == 'card') {
            query = `Answer the following question: "${prompt}"`;
            query+= cardFormatting;
        }
        console.log('^^^^^^^^^gemini query start: ', Date.now(), query)


        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model:  version});
        const result = await model.generateContent(query);
        // console.log("GEMINI results: ", result, "\n\n response: ", result.response);
        const responseText = result.response.text();
        console.log("GEMINI RESULTS: ", responseText);
        

        // Extract and parse the JSON from the response
        // We'll use a regex to find a JSON object in case there's any extra text
        const jsonMatch = responseText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);

        if (!jsonMatch) {
            throw new Error("Could not find valid JSON in the response");
        }
        const jsonString = jsonMatch[0];

        console.log('jsonString: ', jsonString)
    
        // Parse and validate the returned JSON
        const parsedJSONResponse = JSON.parse(jsonString);
        console.log("GEMINI RESULTS JSON: ", parsedJSONResponse);
        console.log('^^^^^^^^^gemini query end: ', Date.now(), '\nundefined?: ',  parsedJSONResponse == undefined);

        return parsedJSONResponse;
    },
    test: () => {
        return "This is a test of Gemini service"
    }
}