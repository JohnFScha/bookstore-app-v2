import Link from 'next/link';
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function Book({ params }: { params: { id: string } }) {
  
  const res = await fetch(`${process.env.BASE_URL}/api/books/${params.id}`, {
    method: 'GET',
    cache: 'no-store'
  })

  const book: Book = await res.json()

  async function deleteBook(formData: FormData) {
    'use server'
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${params.id}`, {
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
            <h2><strong>Title:</strong> {book.title}</h2>
            <p className='flex-grow-0'><strong>Author:</strong> {book.author}</p>
            <p className='flex-grow-0'><strong>Description:</strong> {book.description}</p>
            <small>Created at: {book.createdAt.toLocaleString()}</small>
          </div>
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
