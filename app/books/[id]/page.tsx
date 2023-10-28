import { redirect } from "next/navigation";
import Link from 'next/link';
import Books from '@/app/models/bookModel'

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
  const book: Book = await getBook(params.id)

  async function deleteBook(formData: FormData) {
    'use server'

    try {
      const id = params.id
      const response = await Books.findByIdAndDelete(id)

      if (response) {
        return redirect('/')
      } else {
        throw new Error('Error deleting book')
      }
    } catch (error) {
      throw new Error(`Internal server error: ${error}`)
    }
  };

  return (
    <section className='flex justify-center items-center'>
      <article className='grid lg:grid-cols-2 sm:grid-cols-1 lg:w-3/5 text-justify border-2 p-4 rounded-xl justify-center sm:w-9/12'>
        <div className='flex justify-center'>
          <img
            src={book.thumbnailUrl ? book.thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'}
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
