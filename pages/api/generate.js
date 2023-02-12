import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const country = req.body.country || '';
  if (country.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid Country",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(country),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(country) {
  const capitalizedcountry = country.toUpperCase();
    // country[0].toUpperCase() + country.slice(1).toLowerCase();
  return `Suggest three places to visit that is very popular.

Country: UNITED STATES
Places: Grand canyon, Statue of liberty, Maui
Country: CHINA
Places: Shanghai, The Great Wall, Terracotta warriors
Country: ${capitalizedcountry}
Places:`;
}
