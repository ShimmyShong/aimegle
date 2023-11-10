import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { env } from '@/next.config'

// this array is used to store the conversation
let chatHistory = [{ role: "system", content: "You are a helpful assistant. Speak very briefly." }];

export default async function responseLogic(input = 'Hello!') {
    console.log('responseLogic hit')
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })

    async function main(input) {
        chatHistory.push({
            role: "user", content: input
        })

        const completion = await openai.chat.completions.create({
            messages: chatHistory,
            model: "gpt-3.5-turbo-1106",
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