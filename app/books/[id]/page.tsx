import Link from 'next/link';
import Image from "next/image";
import dbConnect from "@/app/lib/dbConnect";
import { getBook, deleteById } from "@/app/utils/dbCalls";

export default async function Book({ params }: { params: { id: string } }) {
  await dbConnect()
  const book: Book = await getBook(params.id)

  async function deleteBook(formData: FormData) {
    'use server'
    const id = params.id

    await deleteById(id)
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
        <div className='card-body justify-around lg:w-3/12 xs:w-full'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <p className='flex-grow-0'><strong>Author:</strong> {book.author}</p>
          <p className='flex-grow-0'><strong>Description:</strong> {book.description}</p>
          <small>Created at: {book.createdAt.toLocaleString()}</small>
          <div className='card-actions justify-stretch'>
            <form>
              <button
                type="submit"
                formAction={deleteBook}
                className="btn btn-outline btn-warning"
              >
                Delete Book
              </button>
            </form>
            <Link href={`/books/edit/${book._id.toString()}`} className='btn btn-info btn-outline'>Edit book</Link>
          </div>
        </div>
      </article>
    </section>
  )
}
