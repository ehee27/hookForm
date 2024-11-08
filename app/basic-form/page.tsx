// This is a VERY simple form (email, password) that works by itself, but it doesn't scale well.
// state values
// inputs
// validations, async functions etc.-------------
// THIS IS WHY WE USE REACT HOOK FORM

'use client'

import { useState } from 'react'

export default function BasicForm() {
  // STATE ----------------------------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })

  // HANDLER -----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // set Errors default
    setErrors({ email: '', password: '' })

    // Manual Validation -------
    if (!email.includes('@')) {
      setErrors({ ...errors, email: 'Email must include @' })
      return
    }
    if (password.length < 8) {
      setErrors({ ...errors, password: 'Password must be at least 8 chars' })
      return
    }

    console.log('Form submitted')
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-5">
      <h1 className="text-2xl font-black">
        Basic 2 Field Form Without Hook Form
      </h1>
      <form
        className="flex flex-col gap-2 border-2 rounded-lg p-3 w-[80%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border-2 rounded-lg text-black p-2"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border-2 rounded-lg text-black p-2"
        />
        <button className="bg-green-500 p-2 rounded-lg">Submit</button>
      </form>
    </div>
  )
}
