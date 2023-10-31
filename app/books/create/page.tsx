import { createBook } from "@/app/utils/dbCalls";

export default async function CreateBook() {

  return (
    <section className='flex flex-col gap-5'>
      <section className="flex justify-center">
        <h2 className='text-2xl p-2 rounded-lg bg-white text-black'>New book information:</h2>
      </section>
      <form action={createBook} className='flex flex-col gap-3 w-2/4 md:w-3/6 xs:w-10/12 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' className='bg-transparent rounded-lg border-2 p-1' />
        <label htmlFor="author">Author:</label>
        <input type="text" name='author' className='bg-transparent rounded-lg border-2 p-1' />
        <label htmlFor="publishYear">Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='bg-transparent rounded-lg border-2 p-1' />
        <label htmlFor="bookCover">Book cover:</label>
        <input name="bookCover" type="file" accept="image/*" className="bg-transparent rounded-lg border-2 p-1 file:rounded-lg file:bg-white file:text-black file:border-2 file:hover:bg-transparent file:hover:text-white file:transition file:duration-300" />
        <button type="submit" className='bg-white text-black p-2 rounded-lg '>Create</button>
      </form>
    </section>
  )
}