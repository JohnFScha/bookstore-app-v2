import Link from 'next/link';
import dbConnect from './lib/dbConnect';
import { getBooks } from './utils/dbCalls';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

export const revalidate = 10

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  await dbConnect()
  const { limit } = searchParams;

  const books: Book[] | undefined = await getBooks(limit);

  return (
    <section className='flex flex-col items-stretch p-5 gap-10 bg-base-100'>
      <h2 className='text-4xl text-center font-bold'>Available Books</h2>
      <div className="overflow-x-auto">
        <table className="lg:table glass xs:table-xs bg-base-300">
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
                <td>{book.createdAt.toDateString()}</td>
                <td>{book.updatedAt.toDateString()}</td>
                <th className='flex justify-between'>
                  <div className="lg:tooltip" data-tip="Info">
                    <Link href={`/books/${book._id}`} className="btn btn-ghost btn-square bg-base-300">
                      <FaMagnifyingGlass />
                    </Link>
                  </div>
                  <div className="lg:tooltip tooltip-info" data-tip="Edit">
                    <Link href={`/books/edit/${book._id.toString()}`} className='btn btn-info btn-square'>
                      <FaEdit />
                    </Link>
                  </div>
                  <div className="lg:tooltip tooltip-error" data-tip="Delete">
                    <Link href={`/api/books/${book._id}`} className="btn btn-square btn-error btn-md">
                      <RiDeleteBin5Fill />
                    </Link>
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