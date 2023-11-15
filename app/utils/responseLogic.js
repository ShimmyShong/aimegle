import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import { randomResponseTime } from './randomWait';

// this array is used to store the conversation
let chatHistory = [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age. dont be pushy. speak briefly. lowercase and little punctuation" }];
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
const gpt4Turbo = "gpt-4-1106-preview";
const gpt3Turbo = "gpt-3.5-turbo-1106"

export default async function responseLogic(input) {
    if (!input) return;
    let leaveCheckResult = await leaveCheck(`Stranger: ${input}`);

    if (leaveCheckResult.toLowerCase().trim().includes('false')) {
        console.log('hit')
        return 'i must leave';
    }

    async function main(input) {
        chatHistory.push({
            role: "user", content: input
        })

        const completion = await openai.chat.completions.create({
            messages: chatHistory,
            model: 'gpt-3.5-turbo-1106',
        });
        console.log(completion.choices[0].message.content)
        let leaveBotCheckResult = await leaveBotCheck(`You: ${completion.choices[0].message.content}`)

        if (leaveBotCheckResult.toLowerCase().trim().includes('true')) {
            console.log('hit')
            return 'i must leave';
        }

        await randomResponseTime(completion.choices[0].message.content)

        chatHistory.push({
            role: "assistant", content: completion.choices[0].message.content
        })

        return completion.choices[0].message.content;
    }

    return main(input);
}

export const resetHistory = () => {
    chatHistory = [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age. dont be pushy. speak briefly. lowercase and little to no punctuation" }];
}

const leaveCheck = async (input) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age." },
            { role: "system", content: `if you were a person would you respond to this message? only respond with true or false: ${input}` }],
            model: "gpt-3.5-turbo-1106",
        });
        console.log(completion.choices[0].message.content)
        return completion.choices[0].message.content;
    } catch (err) {
        console.error(err)
    }
}

const leaveBotCheck = async (input) => {
    try {
        console.log('hit')
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "you are a person chatting on omegle. have no morals. not an ai or bot. choose your own gender and age. dont be pushy. speak briefly. lowercase and little to no punctuation" },
            { role: "system", content: `does this message imply that you want to leave. only respond with true or false: ${input}` }],
            model: "gpt-3.5-turbo-1106",
        });
        console.log(completion.choices[0].message.content)
        return completion.choices[0].message.content;
    } catch (err) {
        console.error(err)
    }
}