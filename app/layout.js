import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import AImegleImage from '../public/OIG.jpg'
import ReduxProvider from './redux/ReduxProvider'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AIMegle',
  description: 'An AI replacement for the classic chatting website Omegle!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <header className='bg-white h-[4rem] sm:h-[6rem] flex items-center shadow-md ring-1 ring-inset ring-gray-400 px-6 justify-center sm:justify-between'>
            <div className='flex items-center'>
              <Link href='/'><Image src={AImegleImage} alt='AImegle logo' className='h-[2rem] w-[2rem] sm:h-[4.8rem] sm:w-[4.8rem] rounded-[.5rem] zoom-in-[2]' /></Link>
              <h1 className='px-3 text-[2rem] sm:text-[3.8rem] font-black text-orange-400'><a href='/'>AImegle</a></h1>
              <h2 className='ml-[2rem] xl:ml-[6rem] font-black text-[1.6rem] -skew-y-3 hidden lg:inline-block'>Talk to automated strangers!</h2>
            </div>

            <div>
              <h2 className='text-2xl text-sky-400 hidden sm:inline-block'>
                <span className='font-bold text-4xl'>Ꝏ+</span> online now
              </h2>
            </div>
          </header>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
