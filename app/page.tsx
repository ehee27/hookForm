// https://www.youtube.com/watch?v=cc_xmawJ8Kg

'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-5 mx-40">
      <h1 className="text-2xl font-black">Basic Form VS React Hook Form</h1>
      <p>
        Basic forms work fine, however as your inputs grow you need to add more
        state, more validation, perhaps asynchronous functions on submit, the
        list goes on, this is where React Hook Form comes in.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-blue-500 text-white font-black p-2 rounded-lg">
          <Link href="/basic-form">Basic Form Example</Link>
        </button>
        <button className="bg-blue-500 text-white font-black p-2 rounded-lg">
          <Link href="/react-hook-form">React Hook Form</Link>
        </button>
      </div>
    </div>
  )
}
