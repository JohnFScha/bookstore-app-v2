import { connect } from 'mongoose';
import DeleteButton from '@/app/components/DeleteButton';
import Link from 'next/link';

connect(process.env.MONGO_DB_CONNECT!)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    throw new Error(`Error connecting to DB: ${error}`);
  });

async function getBook(id: string) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: 'GET',
    next: { revalidate: 5 }
  })
  const data = await res.json()
  return data.data
} 

export default async function Book({ params }: { params: { id: string } }) {
  const book: Book = await getBook(params.id)

  return (
    <section className='flex'>
      <article className='flex flex-col'>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <small>{book.createdAt.toLocaleString()}</small>
        <DeleteButton id={book._id} />
        <Link href={`/books/edit/${book._id}`}>Edit book</Link>
      </article>
    </section>
  )
}
