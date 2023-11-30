'use client'
import { useEffect, useState, useRef } from 'react'
import 'dotenv/config'
import responseLogic, { resetHistory } from '../utils/responseLogic'
import { randomWait } from '../utils/randomWait'
import { useSelector } from 'react-redux'

const page = () => {
    const [loading, setLoading] = useState(false)
    const [userInputValue, setUserInputValue] = useState('')
    const [userInput, setUserInput] = useState('')
    const [chatLog, setChatLog] = useState([])
    const [deleteCount, setDeleteCount] = useState(1)
    const [isDelete, setIsDelete] = useState(false) // used to change disconnect button depending on how many times "esc" or the button has been pressed
    const [disconnect, setDisconnect] = useState(false)

    let topics = useSelector(((state) => state.topicReducer.topicsArray))

    const chatBoxRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            console.log('escape hit')
            if (disconnect) {
                setDisconnect(false)
                resetHistory(topicss);
                setChatLog([])
                return
            }
            setDeleteCount((prevDeleteCount) => prevDeleteCount + 1)
            if (deleteCount % 2 === 0) {
                setDisconnect(true)
                setChatLog((prevChatLog) => [...prevChatLog, { role: "disconnect", content: "You have disconnected." }]);
            }
        }
    };

    const handleBlur = () => {
        console.log('blurred')
        setDeleteCount(1)
    }

    const handleDeleteClick = () => {
        setDeleteCount((prevDeleteCount) => prevDeleteCount + 1)
        if (deleteCount % 2 === 0) {
            setDisconnect(true)
            setChatLog((prevChatLog) => [...prevChatLog, { role: "disconnect", content: "You have disconnected." }]);
        }
    };

    const handleDisconnectClick = () => {
        resetHistory(topics);
        setChatLog([])
        setDeleteCount(1)
        setDisconnect(false)
    }

    useEffect(() => {
        // automatically scrolls chat box to bottom when new message is sent
        if (chatBoxRef) {
            chatBoxRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
        if (loading === true) {
            let timeOut = 15;
            setTimeout(() => {
                setLoading(false)
            }, timeOut * 1000);
        }
        if (deleteCount % 2 === 0) {
            setIsDelete(true)
        } else {
            setIsDelete(false)
        }
    }, [chatLog, deleteCount, loading])

    useEffect(() => {
        console.log(topics)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDeleteCount(1)
        if (!userInput.trim() || disconnect) return;
        setChatLog([...chatLog, {
            role: "user", content: userInput
        }]);
        await randomWait();
        setLoading(true)
        try {
            const assistantResponse = await responseLogic(userInput, topics);

            if (assistantResponse === 'i must leave') {
                setDisconnect(true)
                setLoading(false)
                setChatLog((prevChatLog) => [...prevChatLog, { role: "disconnect", content: "Stranger has disconnected." }]);
                return
            }

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
            <div className="mx-auto p-4 z-10" onKeyDown={handleKeyDown}>
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto">
                    <div className=' py-4 overflow-auto w-full h-[76vh] bg-white shadow-sm ring-1 ring-inset ring-gray-400 rounded-t-xl' ref={chatBoxRef}>
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
                            } else if (chat.role === "disconnect") {
                                return <div key={index} className='pb-3 px-4'>
                                    <span className='mr-1 font-bold text-gray-600'>{chat.content}</span>
                                </div>
                            }
                        })}

                        {
                            loading && <div className="loading-indicator text-gray-600 font-bold pb-3 px-4">
                                Stranger is typing...
                            </div>}
                        {disconnect
                            ? <button
                                type="button"
                                onClick={handleDisconnectClick}
                                className="rounded-[.4rem] bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 text-white py-4 mx-4 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-200">
                                <p className='text-2xl'>New chat</p>
                            </button> : null}
                        <div>

                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <form onSubmit={(e) => handleSubmit(e) & setUserInput('')} autoComplete='off' className='flex flex-row gap-3'>
                                {disconnect
                                    ? <button
                                        type="button"
                                        onClick={
                                            handleDisconnectClick}
                                        className="rounded-bl-xl bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 text-white py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                                    >
                                        <p className='font-semibold'>New</p>
                                        <p className=' text-sm'>Esc</p>
                                    </button>
                                    : isDelete
                                        ? <button
                                            type="button"
                                            onClick={handleDeleteClick}
                                            onBlur={handleBlur}
                                            className="rounded-bl-xl bg-white text-black py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                                        >
                                            <p className='font-semibold'>Are you sure?</p>
                                            <p className=' text-sm text-sky-500'>Esc</p>
                                        </button>
                                        : <button
                                            type="button"
                                            onClick={handleDeleteClick}
                                            onBlur={handleBlur}
                                            className="rounded-bl-xl bg-white text-black py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                                        >
                                            <p className='font-semibold'>Disconnect</p>
                                            <p className=' text-sm text-sky-500'>Esc</p>
                                        </button>}
                                <input
                                    type="text"
                                    name="text"
                                    id="text"
                                    onChange={(e) => setUserInput(e.target.value) & setUserInputValue(e.target.value)}
                                    value={userInput}
                                    onBlur={handleBlur}
                                    className="block w-full border-0 p-[2rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="submit"
                                    onBlur={handleBlur}
                                    className="rounded-br-xl bg-white font-semibold text-black py-2 min-w-[10%] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-400"
                                >
                                    <p>Send</p>
                                    <p className=' font-normal text-sm text-sky-500'>Enter</p>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
