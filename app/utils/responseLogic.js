import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { env } from '@/next.config'

export default async function responseLogic(input = 'Hello!') {
    console.log(`input: ${input}`)
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })

    console.log(process.env.OPENAI_API_KEY)

    async function main(input) {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].message.content)
        return completion.choices[0].message.content;
    }

    return main(input);
}