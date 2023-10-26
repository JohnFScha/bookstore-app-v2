import { Suspense } from "react";
import BookContainer from "./components/BookContainer";

async function getBooks() {
  const res = await fetch('http://localhost:3000/api/books', {
    method: 'GET',
    cache: 'no-store'
  })

  return res.json()
}

export default async function Home() {
  const { data }: { data: Book[] } = await getBooks();

  return (
    <Suspense fallback={<div className="animate-ping p-5 rounded-full bg-white"></div>} >
      <BookContainer data={data} />
    </Suspense>
  )
}