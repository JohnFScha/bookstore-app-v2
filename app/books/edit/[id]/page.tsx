import { getBook, editBook } from '@/app/utils/dbCalls';

export default async function EditBook({ params }: { params: { id: string } }) {
  const id = params.id
  const book: Book = await getBook(id)

  async function edit (formData: FormData) {
    'use server'

    await editBook(formData, id)
  }

  return (
    <section className='flex flex-col gap-5'>
      <section className='flex justify-center'>
        <h2 className='text-2xl p-2 rounded-lg bg-white text-black'>Edit book information:</h2>
      </section>
      <form action={edit} className='flex flex-col gap-3 w-2/4 md:w-3/6 xs:w-10/12 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' className='bg-transparent rounded-lg border-2 p-1 placeholder:italic' required autoComplete={book.title} placeholder={book.title} />
        <label htmlFor="author">Author:</label>
        <input type="text" name='author' className='bg-transparent rounded-lg border-2 p-1 placeholder:italic' required autoComplete={book.author} placeholder={book.author} />
        <label htmlFor="publishYear">Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='bg-transparent rounded-lg border-2 p-1 placeholder:italic' required autoComplete={book.publishYear.toString()} placeholder={book.publishYear.toString()} />
        <label htmlFor="bookCover">Book cover:</label>
        <input name="bookCover" type="file" accept="image/*" className="bg-transparent rounded-lg border-2 p-1 file:rounded-lg file:bg-white file:text-black file:border-2 file:hover:bg-transparent file:hover:text-white file:transition file:duration-300"  />
        <button type="submit" className='bg-white text-black p-2 rounded-lg '>Edit</button>
      </form>
    </section>
  )
}
