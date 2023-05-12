import { Client } from "@anthropic-ai/sdk";
import { BOOK } from "./book";

import "dotenv/config";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
}

// Create a client with your API key

const client = new Client(apiKey);

const HUMAN_PROMPT = "\n\nHuman:";
const AI_PROMPT = "\n\nAssistant:";

client
  .complete({
    prompt: `${HUMAN_PROMPT} Here's a book.
    ${BOOK}
    What was the publication date? ${AI_PROMPT}`,
    stop_sequences: [HUMAN_PROMPT],
    max_tokens_to_sample: 200,
    model: "claude-v1-100k",
  })
  .then((completion) => {
    console.log(completion);
  })
  .catch((error) => {
    console.error(error);
  });
