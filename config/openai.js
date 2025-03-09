import OpenAI from "openai";

let openaiConnection;
function getOpenaiConnection() {
  if (!openaiConnection) {
    openaiConnection = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
  }
  return openaiConnection;
}
export default getOpenaiConnection;
