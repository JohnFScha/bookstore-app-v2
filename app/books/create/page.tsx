'use client'

import React from 'react'

export default function CreateBook() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
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
    <section className='p-5'>
      <h2 className='text-center text-2xl'>New book information:</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-2/4 m-auto  border-2 rounded-lg p-2'>
        <label htmlFor="title">Title:</label>
        <input type="text" name='title' className='text-black'/>
        <label htmlFor="author">Author:</label>
        <input type="text" name='author' className='text-black'/>
        <label htmlFor="publishYear">Publish Year:</label>
        <input type="number" name='publishYear' className='text-black'/>
        <button type="submit">Create</button>
      </form>
    </section>
  )
}
