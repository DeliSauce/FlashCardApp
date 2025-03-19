// import GEMINI_API_KEY from ".env"

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY

console.log("gemini", GEMINI_API_KEY)

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

const defaultPrompt = "What's the difference between async/await and Promises?";

export const gemini = {
    async query({prompt = defaultPrompt, version = "gemini-2.0-flash"}){
        console.log('^^^^^^^^^gemini query start: ', Date.now())
        const topics = ['JS', 'General', 'React', 'Web', 'Frontend'];
        const flashcardFormatting = `
            Answer the following question: "${prompt}"
            
            Format your response as valid JSON with the following schema:
            {
            "Question": "the question that was asked",
            "Answer": "your detailed answer to the question",
            "Link": "a URL to a helpful resource related to this topic",
            "Topic": "one of: ${topics.join(", ")} "
            }
            
            Ensure the JSON is properly formatted with no explanation text outside the JSON structure.
  
        `;
        // const prompt = 'what time is it?'
        // const version = 
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model:  version});
        const result = await model.generateContent(flashcardFormatting);
        // console.log("GEMINI results: ", result, "\n\n response: ", result.response);
        const responseText = result.response.text();
        console.log("GEMINI RESULTS: ", responseText);
        

        // Extract and parse the JSON from the response
        // We'll use a regex to find a JSON object in case there's any extra text
        const jsonMatch = responseText.match(/(\{[\s\S]*\})/);

        if (!jsonMatch) {
            throw new Error("Could not find valid JSON in the response");
        }
        const jsonString = jsonMatch[0];
    
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