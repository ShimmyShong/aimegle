import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { randomResponseTime } from './randomWait';

// this array is used to store the conversation
let chatHistory = [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age. dont be pushy. speak briefly. lowercase and little to no punctuation" }];
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
            model: "gpt-3.5-turbo-1106",
        });

        await randomResponseTime(completion.choices[0].message.content)

        chatHistory.push({
            role: "assistant", content: completion.choices[0].message.content
        })

        console.log(chatHistory)

        return completion.choices[0].message.content;
    }

    return main(input);
}

export const resetHistory = () => {
    chatHistory = [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age. dont be pushy. speak briefly. lowercase and little to no punctuation" }];
}