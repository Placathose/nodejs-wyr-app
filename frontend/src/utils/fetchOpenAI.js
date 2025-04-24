// // utils/openAI.js
// export const generateQuestion = async () => {
//   const apiKey = import.meta.env.API_KEY;
//   const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
//   const numberOfQuestions = 10;
//   const topic = "dumb superpower";

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat',
//         messages: [
//           {
//             role: 'user',
//             content: `Generate ${numberOfQuestions} "Would You Rather" questions with two possible options for a question. Format the response as a JSON array: [{ "question": "Would you rather", "optionA": "Option A", "optionB": "Option B" }] and no other words. Make the topic of the questions about ${topic}. Dont include any markdown formating please`,
//           },
//         ],
//         max_tokens: 500, 
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch response from deepseek');
//     }

//     const data = await response.json();
//     const content = data.choices[0].message.content;
//     // Parse the JSON response into an array
//     return JSON.parse(content);
//   } catch (error) {
//     console.error('Error calling deepseek API:', error);
//     return null;
//   }
// };

export const generateQuestion = async () => {
  try {
    const response = await fetch("https://d7ot6dr4kf.execute-api.us-east-2.amazonaws.com/default/DeepSeekProxy");

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions from Lambda:', error);
    return null;
  }
};