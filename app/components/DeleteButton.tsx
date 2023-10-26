
import { redirect } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {

  async function deleteBook() {
    'use server'
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE'
    })

    if (response) {
      redirect('/')
    } else {
      alert('Error deleting book')
    }
  };

  return (
    <form action={deleteBook}>
      <button
        type="submit"
        className="bg-white text-black p-2 rounded-lg"
      >
        Delete Book
      </button>

    </form>
  )
}