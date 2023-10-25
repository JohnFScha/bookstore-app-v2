"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE'
      })

      if (response) {
        setTimeout(() => {
          router.push('/')
        }, 1100);
      } else {
        alert('Error deleting book')
      }

    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  return (
    <button 
      onClick={() => handleDelete(id)}
      className="bg-white text-black p-2 rounded-lg"
    >
      Delete Book
    </button>
  )
}