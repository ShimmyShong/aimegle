import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { env } from '@/next.config'

let chatHistory = [{ role: "system", content: "You are a helpful assistant. Speak very briefly." }];

export default async function responseLogic(input = 'Hello!') {
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })

    async function main(input) {
        chatHistory.push({
            role: "user", content: input
        })

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant. Speak very briefly." },
                { role: "user", content: input }],
            model: "gpt-4-1106-preview",
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