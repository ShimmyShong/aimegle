'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import OpenAI from 'openai'
import 'dotenv/config'
import responseLogic from './utils/responseLogic'
import { randomWait } from './utils/randomWait'

export default function Home() {
  const [loading, setLoading] = useState(false)
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
    setChatLog([...chatLog, {
      role: "user", content: userInput
    }]);
    await randomWait();
    setLoading(true)
    try {
      const assistantResponse = await responseLogic(userInput);

      // update chatLog with assistant's response
      setChatLog((prevChatLog) => [...prevChatLog, { role: "assistant", content: assistantResponse }]);

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto p-4">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto">
          <div className='mt-6 py-4 overflow-auto w-full h-[80vh] bg-white shadow-sm ring-1 ring-inset ring-gray-400 rounded-t-xl' ref={chatBoxRef}>
            <p className='text-gray-600 font-bold pb-3 px-4'>You're now chatting with a random stranger. Say hi!</p>
            {chatLog?.map((chat, index) => {
              if (chat.role === "user") {
                return <div key={index} className='pb-3 px-4'>
                  <span className='mr-1 font-extrabold text-blue-800'>You:</span>{chat.content}
                </div>
              } else if (chat.role === "assistant") {
                return <div key={index} className='pb-3 px-4'>
                  <span className='mr-1 font-extrabold text-red-500'>Stranger:</span>{chat.content}
                </div>
              }
            })}
            {
              loading && <div className="loading-indicator text-gray-600 font-bold pb-3 px-4">
                Stranger is typing...
              </div>
            }</div>
          <div>
            <div className="mt-2">
              <form onSubmit={(e) => handleSubmit(e) & setUserInput('')} autoComplete='off' className='flex flex-row gap-3'>
                <button
                  type="button"
                  className="rounded-bl-xl bg-white font-semibold text-black py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                >
                  Disconnect
                </button>
                <input
                  type="text"
                  name="text"
                  id="text"
                  onChange={(e) => setUserInput(e.target.value) & setUserInputValue(e.target.value)}
                  value={userInput}
                  className="block w-full border-0 p-[2rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="rounded-br-xl bg-white font-semibold text-black py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
