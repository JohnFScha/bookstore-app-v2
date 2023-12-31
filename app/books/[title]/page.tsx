import Link from 'next/link';
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function Book({ params }: { params: { title: string } }) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${params.title}`, {
    method: 'GET',
    cache: 'no-store'
  })

  const book: Book = await res.json()
  const date = new Date(book.createdAt)

  async function deleteBook(formData: FormData) {
    'use server'
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${params.title}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      return redirect('/')
    } else {
      throw new Error('Error deleting book')
    }
  };

  return (
    <section className='flex flex-col gap-10 md:p-10 xs:p-5'>
      <h2 className='text-center text-4xl font-bold'>{book.title}</h2>
      <article className='card lg:card-side glass bg-base-100 shadow-xl'>
        <figure className='lg:w-3/12 xs:w-full'>
          <Image
            src={book.thumbnailUrl}
            alt={book.title}
            height={200}
            width={400}
            className='object-contain'
          />
        </figure>
        <div className='card-body justify-between lg:w-3/12 xs:w-full'>
          <div className='flex flex-col gap-5'>
            <h2 className='flex-grow-0 text-xl'><strong>Author:</strong></h2>
            <p>{book.author}</p>
            <h2 className='flex-grow-0 text-xl'><strong>Description:</strong> </h2>
            <p>{book.description}</p>
            <h2 className='flex-grow-0 text-xl'><strong>Created at:</strong></h2>
            <p className='badge'>{date.toDateString()}</p>
          </div>
          <hr className='bg-base-300 p-px rounded-full border-0' />
          <div className='card-actions justify-stretch'>
            <Link href={`/books/${book._id.toString()}/edit`} className='btn btn-info btn-outline'>Edit book</Link>
            <form>
              <button
                type="submit"
                formAction={deleteBook}
                className="btn btn-outline btn-warning"
              >
                Delete Book
              </button>
            </form>
          </div>
        </div>
      </article>
    </section>
  )
}
