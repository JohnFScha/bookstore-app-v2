'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Limit() {
  const limitRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter() 
  const searchParams = useSearchParams()

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (event) => {
    event.preventDefault();
    if (limitRef.current) {
      const limit = limitRef.current.value
      router.push(`/?${createQueryString('limit', limit)}`)
    }
  } 

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input type="text" name="limit" className='input input-bordered placeholder:italic' ref={limitRef} placeholder='Limit to...' />
      <button type="submit" className='btn bg-base-100'>Limit search</button>
    </form>
  )
}
