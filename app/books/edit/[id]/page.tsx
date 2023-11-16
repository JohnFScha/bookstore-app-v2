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
        <h2 className='text-4xl p-2 '>Edit book information:</h2>
      </section>
      <form action={edit} className='flex flex-col glass gap-3 w-2/4 md:w-3/6 xs:w-10/12 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="title" className='label font-bold'>Title:</label>
        <input type="text" name='title' className='input placeholder:italic' required autoComplete={book.title} placeholder={book.title} />
        <label htmlFor="author" className='label font-bold'>Author:</label>
        <input type="text" name='author' className='input placeholder:italic' required autoComplete={book.author} placeholder={book.author} />
        <label htmlFor="publishYear" className='label font-bold'>Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='input placeholder:italic' required autoComplete={book.publishYear.toString()} placeholder={book.publishYear.toString()} />
        <label htmlFor="bookCover" className='label font-bold'>Book cover:</label>
        <input name="bookCover" type="file" accept="image/*" className='file-input'  />
        <button type="submit" className='btn'>Edit</button>
      </form>
    </section>
  )
}
