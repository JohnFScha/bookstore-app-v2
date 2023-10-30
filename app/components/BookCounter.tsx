import React from 'react'

export default function BookCounter({ books }: { books: Book[] }) {
  
  return (
    <h2 className='text-2xl p-2 rounded-lg bg-white text-black'>
      Total books: {books.length}
    </h2>
  )
}
