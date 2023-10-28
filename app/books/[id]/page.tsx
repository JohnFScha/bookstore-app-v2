import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Books from '@/app/models/bookModel'
import dbConnect from "@/app/lib/dbConnect";

async function getBook(id: string) {
  try {
    const res = await Books.findById(id)

    if (res) {
      return res
    } else {
      throw new Error(`${id} not found`)
    }

  } catch (error) {
    throw new Error(`Internal server error:, ${error}`)
  }
}

export default async function Book({ params }: { params: { id: string } }) {
  await dbConnect()
  const book: Book = await getBook(params.id)

  async function deleteBook(formData: FormData) {
    'use server'

    const id = params.id
    const response = await Books.findByIdAndDelete(id)

    if (response) {
      return redirect('/')
    } else {
      throw new Error('Error deleting book')
    }
  };

  return (
    <section className='flex justify-center items-center md:p-0 xs:p-5'>
      <article className='grid gap-5 lg:grid-cols-12 sm:grid-cols-1 lg:w-4/5  md:w-12/12 text-justify border-2 md:p-4 xs:py-4 rounded-xl justify-center'>
        <div className='flex justify-center lg:col-span-4'>
          <Image
            src={book.thumbnailUrl}
            alt={book.title}
            height={300}
            width={300}
            className='rounded-xl shadow-lg shadow-white'
          />
        </div>
        <div className='flex flex-col justify-between p-2 lg:col-span-8 xs:gap-4'>
          <h2><strong>Title:</strong> {book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <small>Created at: {book.createdAt.toLocaleString()}</small>
          <div className='flex md:justify-start xs:justify-center gap-5'>
            <form>
              <button
                type="submit"
                formAction={deleteBook}
                className="bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300"
              >
                Delete Book
              </button>
            </form>

            <Link href={`/books/edit/${book._id.toString()}`} className='bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300'>Edit book</Link>
          </div>
        </div>
      </article>
    </section>
  )
}
