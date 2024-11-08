// We'll actually be calling a 'hook-form' function in the form... handleSubmit, this will then call our 'onSubmit' function as an arg.
// So we're not sending the form event data per se... we're letting 'hook-form' check the 'data types object' via 'onSubmit'.
// {...register} in inputs binds to types, also add validators (required, length, includes etc.)

// we can use 'isSubmitting' to add Loading states if our submission triggers async functions

'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// define the basic types and put that into the 'form' var
// type Formfields = {
//   email: string
//   password: string
// }
type FormFields = z.infer<typeof schema>

export default function BasicForm() {
  // destructure 'register' from useForm
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }, // isSubmitting gives us a loading state
  } = useForm<FormFields>({
    defaultValues: {
      email: 'test@email.com',
    },
    resolver: zodResolver(schema),
  })

  // define type SubmitHandle and our data types
  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      throw new Error()
    } catch (error) {
      setError('root', {
        message: 'This email is already used',
      })
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-5">
      <h1 className="text-2xl font-black">React Hook Form</h1>
      <p>Allows us to:</p>
      <p>1. bind inputs to types with '...register'</p>
      <p>2. validate the inputs</p>
      <p>3. Add loading state for async functions with 'isSubmitting'</p>
      <p>
        4. Zod w zodResolver is the real champ, we can create a Schema and
        validate against that.
      </p>
      <form
        // calls the handleSubmit (react-hook) which calls onSubmit
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border-2 rounded-lg p-3 w-[80%]"
      >
        <input
          {...register('email')} // // WORKS OFF zodResolver with Schema
          type="text"
          placeholder="Email"
          className="border-2 rounded-lg text-black p-2"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <input
          {...register('password')} // WORKS OFF zodResolver with Schema
          type="password"
          placeholder="Password"
          className="border-2 rounded-lg text-black p-2"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button disabled={isSubmitting} className="bg-green-500 p-2 rounded-lg">
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  )
}

// return (
//   <div className="flex flex-col justify-center items-center gap-4 py-5">
//     <h1 className="text-2xl font-black">React Hook Form</h1>
//     <p>Allows us to:</p>
//     <p>1. bind inputs to types with '...register'</p>
//     <p>2. validate the inputs</p>
//     <p>3. Add loading state for async functions with 'isSubmitting'</p>
//     <p>
//       4. Zod w zodResolver is the real champ, we can create a Schema and
//       validate against that.
//     </p>
//     <form
//       // calls the handleSubmit (react-hook) which calls onSubmit
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-2 border-2 rounded-lg p-3 w-[80%]"
//     >
//       <input
//         {...register('email')} // zodResolver replaces all the below
//         // {...register('email', {
//         //   // required: true,
//         //   required: 'Email is required', // used with errors object
//         //   // validate: value => value.includes('@'),
//         //   validate: value => {
//         //     if (!value.includes('@')) {
//         //       return 'Email must include @'
//         //     }
//         //     return true
//         //   },
//         // })}
//         type="text"
//         placeholder="Email"
//         className="border-2 rounded-lg text-black p-2"
//       />
//       {errors.email && (
//         <div className="text-red-500">{errors.email.message}</div>
//       )}

//       <input
//         {...register('password')}
//         // {...register('password', {
//         //   // required: true,
//         //   required: 'Password is required', // used with errors object
//         //   minLength: {
//         //     value: 8,
//         //     message: 'Passwords must have at least 8 characters',
//         //   },
//         // })}
//         type="password"
//         placeholder="Password"
//         className="border-2 rounded-lg text-black p-2"
//       />
//       {errors.password && (
//         <div className="text-red-500">{errors.password.message}</div>
//       )}
//       <button disabled={isSubmitting} className="bg-green-500 p-2 rounded-lg">
//         {isSubmitting ? 'Loading...' : 'Submit'}
//       </button>
//       {errors.root && (
//         <div className="text-red-500">{errors.root.message}</div>
//       )}
//     </form>
//   </div>
// )
