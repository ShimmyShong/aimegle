import { useEffect, useState } from 'react'
import OpenAI from 'openai'

// this array is used to store the conversation
let chatHistory = [{ role: "system", content: "You are a helpful assistant. Speak very briefly." }];
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
const gpt4Turbo = "gpt-4-1106-preview";

export default async function responseLogic(input) {
    if (!input) return;

    async function main(input) {
        chatHistory.push({
            role: "user", content: input
        })

        const completion = await openai.chat.completions.create({
            messages: chatHistory,
            model: gpt4Turbo,
        });
        console.log(completion.choices[0].message.content)
        console.log(completion.choices)

        chatHistory.push({
            role: "assistant", content: completion.choices[0].message.content
        })

        console.log(chatHistory)
        return chatHistory;
    }

    return main(input);
}