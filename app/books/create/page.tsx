import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi()

export default function CreateBook() {

  async function createBook(formData: FormData) {
    'use server';
    
    const file = formData.get('bookCover');
    const response = await utapi.uploadFiles(file);
    
    const url = response.data!.url
    formData.append('thumbnailUrl', url)
    
    const res = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      body: formData
    })

    const result = await res.json()
    
    if (result) {
      redirect('/')
    } else {
      alert('Error creating book')
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
        <input name="bookCover" type="file" className="bg-transparent rounded-lg border-2 p-1"/>
        <button type="submit" className='bg-white text-black p-2 rounded-lg '>Create</button>
      </form>
    </section>
  )
}
