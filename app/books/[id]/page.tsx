import { Suspense } from "react"
import SingleBook from "@/app/components/SingleBook"

async function getBook(id: string) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: 'GET',
    cache: 'no-store'
  })
  const data = await res.json()
  return data.data
} 

export default async function Book({ params }: { params: { id: string } }) {
  const book: Book = await getBook(params.id)
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SingleBook book={book} />
    </Suspense>
  )
}
