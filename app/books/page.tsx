import Link from 'next/link';

async function getBooks() {
  const res = await fetch('http://localhost:3000/api/books', {
    method: 'GET',
    next: { revalidate: 10 }
  })
  return res.json()
}

export default async function page() {
  const { data } = await getBooks();

  return (
    <main>
      <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-5'>
        {data.map((book: Book) => (
          <article key={book._id} className='border-2 rounded-lg p-2'>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <Link prefetch={true}  href={`/books/${book._id}`}>See details</Link>
          </article>
        ))}
      </section>
      <Link href={'books/create'}>Create new book</Link>
    </main>
  )
}
