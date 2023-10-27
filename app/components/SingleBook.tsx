import DeleteButton from '@/app/components/DeleteButton';
import Link from 'next/link';
import Image from 'next/image';

export default function SingleBook({ book }: { book: Book }) {
  return (
    <section className='flex justify-center items-center'>
      <article className='grid lg:grid-cols-2 sm:grid-cols-1 lg:w-3/5 text-justify border-2 p-4 rounded-xl justify-center sm:w-9/12'>
        <div className='flex justify-center'>
          <Image
            src={book.thumbnailUrl}
            alt={book.title}
            height={300}
            width={300}
            className='rounded-xl shadow-lg shadow-white'
          />
        </div>
        <div className='flex flex-col justify-between p-2'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <small>Created at: {book.createdAt.toLocaleString()}</small>
          <div className='flex gap-5'>
            <DeleteButton id={book._id} />
            <Link href={`/books/edit/${book._id}`} className='bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300'>Edit book</Link>
          </div>
        </div>
      </article>
    </section>
  )
}

