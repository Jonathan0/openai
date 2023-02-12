import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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

  const topic = req.body.topic || '';
  console.log(topic);
  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid topic",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic),
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    console.log(completion.data.choices[0].text);
    res.status(200).json({ essay: completion.data.choices[0].text });
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

function generatePrompt(topic) {
  return `Create an outline for an essay about Nikola Tesla and his contributions to technology:

I. Introduction
A. Definition of Nikola Tesla
B. Overview of Tesla's contributions to technology

II. Early Life
A. Childhood
B. Education

III. Tesla's Inventions
A. Alternating Current
B. Radio
C. Remote Control

IV. Legacy
A. Impact on Modern Technology
B. Recognition
V. Conclusion

Create an outline for an essay about Google Company and its history:

I. Introduction
A. Definition of Google
B. Brief history of the company
C. Thesis statement

II. Founding of Google
A. Larry Page and Sergey Brin’s backgrounds
B. The idea behind Google
C. Formation of the company
D. Initial challenges faced

III. Growth and Expansion
A. Google’s early success
B. Expansion into new markets
C. Key acquisitions and partnerships
D. Expansion into mobile and cloud computing

IV. Products and Services
A. Overview of Google’s core products
B. Discussion of Google’s most successful products
C. Discussion of Google’s failed products
D. Analysis of Google’s current product offerings

V. Controversies and Criticisms
A. Overview of major controversies
B. Criticisms of Google’s business practices
C. Google’s response to controversies and criticisms
D. Analysis of the impact of controversies on Google’s reputation

VI. Conclusion
A. Summary of Google’s history and impact
B. Future outlook for Google
C. Reflection on the significance of Google in the tech industry
D. Final thoughts on the future of Google and its role in shaping our world.

Create an outline for an essay about ${topic}:`;
}
