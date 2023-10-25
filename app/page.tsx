import Link from 'next/link';

async function getBooks() {
  const res = await fetch('http://localhost:3000/api/books', {
    method: 'GET',
    next: { revalidate: 10 }
  })
  return res.json()
}

export default async function Home() {
  const { data } = await getBooks();

  return (
    <main className='flex flex-col justify-center'>
      <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-5'>
        {data.map((book: Book) => (
          <article key={book._id} className='flex flex-col justify-around items-stretch border-2 rounded-lg p-2 gap-5'>
            <h2><strong>Title:</strong> {book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <Link prefetch={true}  href={`/books/${book._id}`} className='border-2 w-2/4 text-center p-2 rounded-lg bg-white text-black m-auto relative bottom-0'>See details</Link>
          </article>
        ))}
      <Link href={'books/create'} className='border-2 w-52 m-auto text-center p-2 rounded-lg bg-white text-black text-2xl'>Create new book</Link>
      </section>
    </main>
  )
}
