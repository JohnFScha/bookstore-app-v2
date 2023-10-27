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
        className="bg-white text-black border-2 p-2 rounded-lg hover:bg-transparent hover:text-white transition duration-300"
      >
        Delete Book
      </button>

    </form>
  )
}