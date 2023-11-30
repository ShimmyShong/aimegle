'use client'

import { setTopics } from '@/app/utils/randomPersonality'
import React, { useEffect, useState } from 'react'

const TopicInput = () => {
    const [inputValue, setInputValue] = useState('')
    const [topicsArray, setTopicsArray] = useState([])

    useEffect(() => {
        console.log(topicsArray)
        setTopics(topicsArray)
        console.log(topicsArray)
    }, [topicsArray])

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent linebreak on enter
            if (!inputValue.trim()) return
            console.log('enter pressed')
            setTopicsArray([...topicsArray, inputValue])
            setInputValue('')
        }
    }

    const handleTopicDelete = (indexToRemove) => {
        setTopicsArray(topicsArray.filter((topic, index) => index !== indexToRemove))
    }

    return (
        <div>
            <p className='text-center mb-2'>What do you wanna talk about?</p>
            <textarea
                className='p-2 w-[30rem] h-[4rem] text-start resize-none ring-1 ring-inset ring-gray-300 rounded-[.3rem]'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleEnterPress}>
            </textarea>
            <div className='flex flex-row'>
                {topicsArray.map((topic, index) => {
                    return <div key={index} className='flex flex-row bg-sky-400 rounded-[.2rem] px-3 py-1 mr-2 mb-2'>
                        <p>{topic}</p><span onClick={() => handleTopicDelete(index)} className='ml-1 font-bold'>x</span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TopicInput
