import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  {
    id: 1,
    label: 'Home',
    href: '/'
  },
  {
    id: 2,
    label: 'Create Book',
    href: '/books/create'
  }
]

export default function Header() {
  return (
    <header className='flex justify-between p-2 border-b-2 rounded-xl shadow-md shadow-white'>
      <div className='flex items-center gap-2'>
        <Image src='/next.svg' alt='Bookstore app' width={80} height={80} className='bg-white p-2 rounded-lg' />
        |
        <p className='italic text-xl'>Bookstore App</p>
      </div>
      <nav>
        <ul className='flex items-center gap-3'>
          {links.map(link => (
            <li key={link.id} className='border-2 py-1 px-2 rounded-lg hover:bg-white hover:text-black transition duration-500'>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
