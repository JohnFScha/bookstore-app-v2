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
  console.log(book)
  return (
    <section className='flex justify-center items-center'>
      <article className='flex flex-col gap-5 w-2/4 text-justify border-2 p-4 rounded-xl'>
        <h2><strong>Title:</strong> {book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptatem dolor quis, ipsam repellendus at similique officiis consequuntur iste iusto nihil quo provident numquam magni dolore voluptates vel! Aperiam, vel!
        Sint eaque a esse molestiae vero magni, cumque maxime minima porro mollitia dolor veritatis ipsa odit soluta, architecto inventore voluptatibus quisquam? Dicta, similique alias asperiores amet perferendis expedita consequatur odit.</p>
        <small>Created at: {book.createdAt.toLocaleString()}</small>
        <div className='flex justify-center gap-5'>
          <DeleteButton id={book._id} />
          <Link href={`/books/edit/${book._id}`} className='bg-white text-black p-2 rounded-lg'>Edit book</Link>
        </div>
      </article>
    </section>
  )
}
