import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

async function getBook(id: string) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data.data
}

export default async function Book({ params }: { params: { id: string } }) {
  const book: Book | null = await getBook(params.id)
  async function deleteBook(formData: FormData) {
    'use server'

    const id = params.id
    console.log(id)
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE'
    })

    if (response) {
      return redirect('/')
    } else {
      alert('Error deleting book')
    }
  };

  return (
    <section className='flex justify-center items-center'>
      {book ?
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
              <form>
                <button
                  type="submit"
                  formAction={deleteBook}
                  name={params.id}
                  className="bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300"
                >
                  Delete Book
                </button>
              </form>

              <Link href={`/books/edit/${book._id}`} className='bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300'>Edit book</Link>
            </div>
          </div>
        </article>
        : <h2>Loading...</h2>}
    </section>
  )
}
