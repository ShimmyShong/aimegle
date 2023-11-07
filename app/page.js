'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import OpenAI from 'openai'
import 'dotenv/config'
import responseLogic from './utils/responseLogic'

export default function Home() {
  const [response, setResponse] = useState('nothing')
  const [userInput, setUserInput] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInput)
    setResponse(responseLogic(userInput));
    setUserInput('')
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <p className='text-center py-40'>{response}</p>
          <div>
            <div className="mt-2">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  name="text"
                  id="text"
                  onChange={(e) => setUserInput(e.target.value)}
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
