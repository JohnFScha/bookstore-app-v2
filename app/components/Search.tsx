'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Search() {
  const searchRef = React.useRef<HTMLInputElement>(null)
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
    if (searchRef.current) {
      const search = searchRef.current!.value
      router.push(`/?${createQueryString('search', search)}`)
    }
  } 

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input type="text" name="search" className='input input-bordered placeholder:italic' ref={searchRef} placeholder='Search by title' />
      <button type="submit" className='btn bg-base-100'>Search</button>
    </form>
  )
}
