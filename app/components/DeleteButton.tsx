"use client";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = (id: string) => {
    try {
      fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert("Book deleted successfully!");
      })
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