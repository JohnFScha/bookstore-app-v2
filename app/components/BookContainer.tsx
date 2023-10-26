import React from 'react'
import Link from 'next/link';

export default function BookContainer({data}: {data: Book[]}) {
  
  return (
    <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-5'>
      {data.map((book: Book) => (
        <article key={book._id} className='flex flex-col justify-between items-start border-2 rounded-lg p-2 gap-5'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <Link prefetch={true} href={`/books/${book._id}`} className='border-2 w-2/4 text-center p-2 rounded-lg bg-white text-black relative bottom-0 hover:bg-transparent hover:text-white hover:border-2 hover: transition duration-300 mx-auto'>See details</Link>
        </article>
      ))}
      <Link href={'books/create'} className='border-2 w-52 m-auto text-center p-2 rounded-lg bg-white text-black text-2xl hover:bg-transparent hover:text-white transition duration-300'>Create new book</Link>
    </section>
  )
}
