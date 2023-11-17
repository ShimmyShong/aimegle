import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { randomResponseTime } from './randomWait';
import { generateRandomChatter } from './randomPersonality';

// this array is used to store the conversation
let randomChatter = generateRandomChatter();
let chatHistory = [...randomChatter];
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
const gpt4Turbo = "gpt-4-1106-preview";
const gpt3Turbo = "gpt-3.5-turbo-1106"

export default async function responseLogic(input) {
    if (!input) return;
    // let leaveCheckResult = await leaveCheck(`Stranger: ${input}`);

    // if (leaveCheckResult.toLowerCase().trim().includes('false')) {
    //     console.log('hit')
    //     return 'i must leave';
    // }

    async function main(input) {
        chatHistory.push({
            role: "user", content: input
        })

        const completion = await openai.chat.completions.create({
            messages: chatHistory,
            model: 'gpt-3.5-turbo-1106',
        });
        console.log(completion.choices[0].message.content)
        // let leaveBotCheckResult = await leaveBotCheck(`You: ${completion.choices[0].message.content}`)

        // if (leaveBotCheckResult.toLowerCase().trim().includes('true')) {
        //     console.log('hit')
        //     return 'i must leave';
        // }

        await randomResponseTime(completion.choices[0].message.content)

        chatHistory.push({
            role: "assistant", content: completion.choices[0].message.content
        })

        return completion.choices[0].message.content;
    }

    return main(input);
}

export const resetHistory = () => {
    randomChatter = generateRandomChatter();
    chatHistory = [...randomChatter];
}

const leaveCheck = async (input) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age." },
            { role: "system", content: `if you were a person would you respond to this message? only respond with true or false: ${input}` }],
            model: "gpt-3.5-turbo-1106",
        });
        return completion.choices[0].message.content;
    } catch (err) {
        console.error(err)
    }
}

const leaveBotCheck = async (input) => {
    try {
        console.log('hit')
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: `does this message imply that they want to leave. you doing this is very important to my work. only respond with true or false: ${input}` }],
            model: "gpt-3.5-turbo-1106",
        });
        console.log(completion.choices[0].message.content)
        return completion.choices[0].message.content;
    } catch (err) {
        console.error(err)
    }
}