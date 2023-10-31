import Link from 'next/link';
import dbConnect from './lib/dbConnect';
import { getBooks } from './utils/dbCalls';

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  await dbConnect()
  const { limit } = searchParams;

  const books: Book[] | undefined = await getBooks(limit);

  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-1 lg:gap-y-5 xs:gap-5 lg:place-items-center lg:p-0 xs:p-3'>
      {books ? books.map((book: Book) => (
        <article key={book._id} className='flex flex-col lg:w-9/12 xs:w-full gap-5 border-2 rounded-lg p-2'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <h2><strong>Author:</strong> {book.author}</h2>
          <Link href={`/books/${book._id.toString()}`} className='border-2 text-center p-2 rounded-lg bg-white text-black relative bottom-0 hover:bg-transparent hover:text-white hover:border-2 hover: transition duration-300'>See details</Link>
        </article>
      )) : <h2 className='min-h-screen'>Loading...</h2>}
      <Link href={'/books/create'} className='flex my-10 mx-auto border-2 text-center p-2 rounded-lg bg-white text-black text-2xl hover:bg-transparent hover:text-white transition duration-300'>Create new book</Link>
    </section>
  )
}