import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import dbConnect from '@/app/lib/dbConnect';
import Books from '@/app/models/bookModel'

const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET })

export default async function CreateBook() {
  await dbConnect()
  
  async function createBook(formData: FormData) {
    'use server';
    
    try {
      const file = formData.get('bookCover') as File;

      if (file?.name !== 'undefined') {
        const response = await utapi.uploadFiles(file);
        const url = response.data!.url
        formData.append('thumbnailUrl', url)
      }

      const title = formData.get('title') as string;
      const author = formData.get('author') as string
      const publishYear = Number(formData.get('publishYear'))
      const thumbnailUrl = formData.get('thumbnailUrl') as string

      const newBook = await Books.create({
        title: title,
        author: author,
        publishYear: publishYear,
        thumbnailUrl: thumbnailUrl !== null ? thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
      })

      if (newBook) {
        redirect('/')
      } else {
        throw new Error('Error creating book')
      };
    } catch (error) {
      throw new Error(`Internal server error: ${error}`)
    }
  }

  return (
    <section className='flex flex-col gap-1'>
      <h2 className='text-center text-2xl'>New book information:</h2>
      <form action={createBook} className='flex flex-col gap-3 w-2/6 m-auto border-2 rounded-lg p-5'>
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
