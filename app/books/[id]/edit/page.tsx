import { redirect } from "next/navigation"

export default async function EditBook({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.BASE_URL}/api/books/${params.id}`, {
    method: 'GET',
    cache: 'no-store'
  })
  const book: Book = await res.json()

  async function editBook(formData: FormData) {
    'use server'
    const res = await fetch(`${process.env.BASE_URL}/api/books/${params.id}`, {
      method: 'PUT',
      body: formData
    })

    if (res.status !== 500) {
      return redirect(`/books/${params.id}`)
    } else {
      throw new Error('Error updating book')
    }
  }

  return (
    <section className='flex flex-col gap-5'>
      <section className='flex justify-center'>
        <h2 className='text-4xl p-2 '>Edit book information:</h2>
      </section>
      <form action={editBook} className='flex flex-col glass gap-3 w-2/4 md:w-3/6 xs:w-10/12 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="bookCover" className='label font-bold'>Book cover:</label>
        <input name="bookCover" type="file" accept="image/*" className='file-input' />
        <label htmlFor="title" className='label font-bold'>Title:</label>
        <input type="text" name='title' className='input placeholder:italic' placeholder={book.title} />
        <label htmlFor="author" className='label font-bold'>Author:</label>
        <input type="text" name='author' className='input placeholder:italic' placeholder={book.author} />
        <label htmlFor="publishYear" className='label font-bold'>Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='input placeholder:italic' placeholder={book.publishYear.toString()} />
        <label htmlFor="description" className='label font-bold'>Description:</label>
        <textarea name='description' cols={10} rows={10} className='textarea p-2 resize-none placeholder:italic' placeholder='Describe the contents of the book'></textarea>
        <button type="submit" className='btn bg-base-100 text-xl'>Edit</button>
      </form>
    </section>
  )
}