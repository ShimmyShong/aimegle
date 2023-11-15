'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import OpenAI from 'openai'
import 'dotenv/config'
import responseLogic, { resetHistory } from './utils/responseLogic'
import { randomWait } from './utils/randomWait'

export default function Home() {
  return (
    <>
      <div className="mx-auto p-4 z-10">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto">

        </div>
      </div>
    </>
  )
}
