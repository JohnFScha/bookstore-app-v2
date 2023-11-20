import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books?search=${searchParams.search}`, {
    method: 'GET',
    next: { revalidate: 0 }
  });


  const books: Book[] = await res.json()

  return (
    <section className='flex flex-col items-stretch p-5 gap-10 bg-base-100'>
      <h2 className='text-4xl text-center font-bold'>Available Books</h2>
      <div className="overflow-x-auto">
        <table className="table lg:table-lg glass xs:table-xs bg-base-300">
          {/* head */}
          <thead className='font-bold'>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Publish year</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id} className='text-lg'>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={book.thumbnailUrl} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.author}</div>
                    </div>
                  </div>
                </td>
                <td>{book.title}</td>
                <td>{book.publishYear}</td>
                <td>{(new Date(book.createdAt)).toDateString()}</td>
                <td>{(new Date(book.updatedAt)).toDateString()}</td>
                <th className='flex justify-between'>
                  <div className="lg:tooltip" data-tip="Info">
                    <Link href={`/books/${book._id}`} className="btn btn-ghost btn-square bg-base-300">
                      <FaMagnifyingGlass />
                    </Link>
                  </div>
                  <div className="tooltip tooltip-info" data-tip="edit">
                    <Link href={`/books/${book._id.toString()}/edit`} className='btn btn-info btn-square'>
                      <FaEdit />
                    </Link>
                  </div>
                  <div className="tooltip tooltip-error" data-tip="delete">
                    <form>
                      <button
                        type="submit"
                        formAction={async () => {
                          'use server'
                          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${book._id}`, {
                            method: 'DELETE',
                          })
                          revalidatePath('/', 'layout');
                        }}
                        className="btn btn-square btn-error"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </form>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Publish year</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Link href={'/books/create'} className='btn btn-lg glass bg-base-200'>Create new book</Link>
    </section>
  )
}