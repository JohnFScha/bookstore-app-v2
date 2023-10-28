import Link from 'next/link';
import Books, { Book } from '@/app/models/bookModel'
import dbConnect from './lib/dbConnect';

async function getBooks() {
  try {
    const res = await Books.find()

    if (res) {
      return res
    } else {
      console.log('Not found')
    }
    
  } catch (error) {
    console.log('Internal server error:', error)
  }
}

export default async function Home() {
  await dbConnect()
  
  const books: Book[] | undefined = await getBooks();

  return (
    <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-5'>
      {books ? books.map((book: Book) => (
        <article key={book._id} className='flex flex-col justify-between items-start border-2 rounded-lg p-2 gap-5'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <Link href={`/books/${book._id.toString()}`} className='border-2 w-2/4 text-center p-2 rounded-lg bg-white text-black relative bottom-0 hover:bg-transparent hover:text-white hover:border-2 hover: transition duration-300 mx-auto'>See details</Link>
        </article>
      )) : <h2 className='min-h-screen'>Loading...</h2>}
      <Link href={'/books/create'} className='border-2 w-52 m-auto text-center p-2 rounded-lg bg-white text-black text-2xl hover:bg-transparent hover:text-white transition duration-300'>Create new book</Link>
    </section>
  )
}