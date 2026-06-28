import OpenAI from "openai";
import { env } from "../config/env.js";

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

function fallbackInsights(transcript) {
  const lines = transcript
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);

  return {
    summary: lines.length ? lines.join(" ") : "No transcript content available.",
    actionItems: []
  };
}

export async function generateMeetingInsights(transcript) {
  if (!client) {
    return fallbackInsights(transcript);
  }

  const prompt = [
    "You are an enterprise meeting analyst.",
    "Return strict JSON with keys: summary (string), actionItems (array).",
    "Each action item should include: title, description, assigneeName (nullable string), dueDate (nullable ISO string).",
    "Do not include markdown or explanation.",
    `Transcript:\n${transcript}`
  ].join("\n");

  const response = await client.responses.create({
    model: env.OPENAI_SUMMARY_MODEL,
    input: prompt
  });

  const text = response.output_text?.trim();
  if (!text) {
    return fallbackInsights(transcript);
  }

  try {
    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary || "",
      actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : []
    };
  } catch {
    return fallbackInsights(transcript);
  }
}
