'use client'

import React from 'react'

export default function EditBook({ params }: { params: { id: string } } ) {
  const id = params.id
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'PUT',
      body: formData
    })

    try {
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  return (
    <section className='flex flex-col gap-1'>
      <h2 className='text-center text-2xl'>New book information:</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-1/4 m-auto border-2 rounded-lg p-5'>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' className='bg-transparent rounded-lg border-2 p-1'/>
        <label htmlFor="author">Author:</label>
        <input type="text" name='author' className='bg-transparent rounded-lg border-2 p-1'/>
        <label htmlFor="publishYear">Publish Year:</label>
        <input type="number" min={1800} max={2023} name='publishYear' className='bg-transparent rounded-lg border-2 p-1'/>
        <button type="submit" className='bg-white text-black p-2 rounded-lg '>Edit</button>
      </form>
    </section>
  )
}
