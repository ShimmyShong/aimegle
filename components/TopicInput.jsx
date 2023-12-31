'use client'

import React, { useEffect, useState } from 'react'
import { setTopics } from '@/app/redux/features/topicSlice'
import { useDispatch, useSelector } from 'react-redux'

const TopicInput = () => {
    const [inputValue, setInputValue] = useState('')
    const [topicsArray, setTopicsArray] = useState([])
    const dispatch = useDispatch()
    const topics = useSelector(((state) => state.topicReducer.topicsArray))

    useEffect(() => {
        dispatch(setTopics(topicsArray))
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
        <div className='min-w-[100%] sm:min-w-[70%]'>
            <p className='text-center sm:text-base text-sm mb-2'>What do you wanna talk about?</p>
            <textarea
                className='p-2 w-[100%] h-[4rem] text-start resize-none shadow-sm ring-1 ring-inset ring-gray-300 rounded-[.3rem]'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleEnterPress}>
            </textarea>
            <div className='flex flex-row flex-wrap items-center justify-center'>
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
