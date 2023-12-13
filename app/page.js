
import TopicInput from '@/components/TopicInput'
import flag from '../public/flag.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl p-4 z-10">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl rounded-xl shadow-xl ring-1 ring-inset ring-gray-300 bg-white">
          <h3 className='pt-10 pb-5 text-sm text-center font-bold text-gray-600'>You don't need an app to use AImegle on your phone or tablet! The website works great on mobile.</h3>
          <div className='m-4 flex flex-row'>
            <div>
              <p>AImegle (A-I-meg-ull) is a great way to have a conversation even if the person isn't real. When you use AImegle, you are paired with a AI personality that is randomly generated to talk one-on-one. If you prefer, you can add your interests and you'll be randomly paired with an AI personality who have some of the same interests.</p>
            </div>
            <div>
              <Image src={flag} alt="american flag that has the text 'AI' on it" className='w-[95rem] h-[9.2rem] pl-5 hidden sm:block' />
            </div>
          </div>
          <div className='m-4'>
            <p>This website is completely safe in the fact that your chats are NEVER recorded by us. If you ever feel unsafe with a chat you're having, you're always free to disconnect and find a new AI personality to talk to. While you technically aren't chatting with a living being, it would be wise to be respectful to AI's that has a non-zero chance of becoming god-like in the future :)</p>
          </div>
          <div className='m-4'>
            <p>In all seriousness, while this can never be a true replacement to good ole' Omegle, I tried my best to have the experience be as close to the original as possible. Of course, random video chats with Artificial Intelligences is a few years away, so you'll have to stick with only text based chatting for now.</p>
          </div>
          <div className='flex mx-[2rem] md:mx-[6rem] text-center p-3 justify-center bg-sky-200 rounded-[.5rem] shadow-lg ring-1 ring-inset ring-sky-100'>
            <p className='text-lg md:text-2xl font-extrabold'>Text not monitored. AI is king!</p>
          </div>
          <div className='m-4 flex flex-col-reverse sm:flex-row justify-around items-center sm:items-start text-lg'>
            <TopicInput />
            <div>
              <p className='text-center sm:text-base text-sm mb-2'>Start Chatting:</p>
              <Link href='/chat'>
                <button
                  type="button"
                  className="rounded-[.4rem] bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 text-white py-4 px-14 mx-4  min-w-[7rem] hover:bg-slate-50 active:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-200">
                  <p className='text-2xl'>Text</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
