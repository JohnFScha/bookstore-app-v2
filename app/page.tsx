import Link from 'next/link';
import Books from '@/app/models/bookModel'
import dbConnect from './lib/dbConnect';
import BookCounter from './components/BookCounter';

async function getBooks() {
  try {
    const res = await Books.find()

    if (res) {
      return res
    } else {
      throw new Error('Not found')
    }

  } catch (error) {
    throw new Error(`Internal server error: ${error}`)
  }
}

export default async function Home() {
  await dbConnect()

  const books: Book[] | undefined = await getBooks();

  return (
    <>
      <section className='flex justify-center'>
        <BookCounter books={books} />
      </section>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-1 lg:gap-y-5 xs:gap-5 lg:place-items-center lg:p-0 xs:p-3'>
        {books ? books.map((book: Book) => (
          <article key={book._id} className='flex flex-col lg:w-8/12 xs:w-full gap-5 border-2 rounded-lg p-2'>
            <h2><strong>Title:</strong> {book.title}</h2>
            <h2><strong>Author:</strong> {book.author}</h2>
            <Link href={`/books/${book._id.toString()}`} className='border-2 text-center p-2 rounded-lg bg-white text-black relative bottom-0 hover:bg-transparent hover:text-white hover:border-2 hover: transition duration-300'>See details</Link>
          </article>
        )) : <h2 className='min-h-screen'>Loading...</h2>}
        <Link href={'/books/create'} className='border-2 w-52 m-auto text-center p-2 rounded-lg bg-white text-black text-2xl hover:bg-transparent hover:text-white transition duration-300'>Create new book</Link>
      </section>
    </>
  )
}