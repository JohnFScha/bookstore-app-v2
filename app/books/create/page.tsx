import { createBook } from "@/app/utils/dbCalls";

export default async function CreateBook() {

  return (
    <section className='flex flex-col gap-5'>
      <section className='flex justify-center'>
        <h2 className='text-4xl p-2 '>New book information:</h2>
      </section>
      <form action={createBook} className='flex flex-col glass gap-3 w-2/4 md:w-3/6 xs:w-10/12 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="title" className='label font-bold'>Title:</label>
        <input type="text" name='title' className='input placeholder:italic' required  placeholder='Type here...' />
        <label htmlFor="author" className='label font-bold'>Author:</label>
        <input type="text" name='author' className='input placeholder:italic' required placeholder='Type here' />
        <label htmlFor="publishYear" className='label font-bold'>Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='input placeholder:italic' required placeholder='Enter publish year' />
        <label htmlFor="bookCover" className='label font-bold'>Book cover:</label>
        <input name="bookCover" type="file" accept="image/*" className='file-input'  />
        <button type="submit" className='btn'>Edit</button>
      </form>
    </section>
  )
}