const { GoogleGenerativeAI } = require("@google/generative-ai");
// import { REACT_APP_GEMINI_API_KEY } from "@env";
// console.log(process.env.REACT_APP_GEMINI_API_KEY);

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDwMw-gPQUe3c2cEmRyTtMgLFy9gCq-cec");
// console.log(AIzaSyDwMw-gPQUe3c2cEmRyTtMgLFy9gCq-cec);

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// ...
async function run() {
    const prompt = "Give the average approximated calories of 50 grams of chicken in the strict format: 'numbers calories'"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

run();

const initializeStory = async (age, hero, themes) => {
  let tryCount = 0
  while (tryCount < 3) {
    try {
      const response = await cohere.generate({
        model: 'command',
        prompt: `Give a json file with the following fields only:\n
       story: beginning of the bedtime story for a ${age} years old child about the main character ${hero} and ${themes}.
       question: how should the protagonist continue?\n
       option1: give one possible choice protagonist can make.\n
       option2: give another possible choice.`,
        maxTokens: 300,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: 'NONE'
      })

      return parseResponse(response.generations[0].text)
    } catch (e) {
      console.log(e)
      tryCount++
    }
  }
}