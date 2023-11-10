'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import OpenAI from 'openai'
import 'dotenv/config'
import responseLogic from './utils/responseLogic'

export default function Home() {
  const [response, setResponse] = useState('')
  const [userInputValue, setUserInputValue] = useState('')
  const [userInput, setUserInput] = useState('')
  const [chatLog, setChatLog] = useState([])
  const chatBoxRef = useRef(null);


  useEffect(() => {
    // automatically scrolls chat box to bottom when new message is sent
    if (chatBoxRef) {
      chatBoxRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [chatLog])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChatLog(await responseLogic(userInput))
    setUserInput('');
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-4xl">
          <div className='mt-16 p-5 overflow-auto w-full] h-[20rem]' ref={chatBoxRef}>
            {chatLog.map((chat, index) => {
              if (chat.role === "user") {
                return <div key={index} className=' text-right pl-8 py-1 text-green-500'>
                  {chat.content}
                </div>
              } else if (chat.role === "assistant") {
                return <div key={index} className='text-left pr-8 py-1 text-red-500'>
                  {chat.content}
                </div>
              }
            })}</div>
          <div>
            <div className="mt-2">
              <form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                <input
                  type="text"
                  name="text"
                  id="text"
                  onChange={(e) => setUserInput(e.target.value)}
                  value={userInput}
                  className="block w-full rounded-md border-0 p-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="type here..."
                />
                <button
                  type="submit" // Use type="button" to prevent form submission
                  className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
