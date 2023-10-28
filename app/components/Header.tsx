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
    <header className='flex lg:flex-nowrap lg:justify-between md:justify-between md:p-3 xs:p-5 border-b-2 rounded-b-xl shadow-md shadow-white xs:flex-wrap xs:justify-center xs:gap-5'>
      <div className='flex md:justify-start lg:justify-start md:w-auto xs:w-full xs:justify-between items-center gap-2'>
        <Image src='/next.svg' alt='Bookstore app' width={80} height={80} className='bg-white p-2 rounded-lg' />
        <span className='md:inline xs:hidden'>|</span>
        <p className='italic text-xl'>Bookstore App</p>
      </div>
      <nav className='md:flex xs:hidden'>
        <ul className='flex items-center gap-3'>
          {links.map(link => (
            <li key={link.id} className={`border-2 py-1 px-2 rounded-lg hover:bg-white hover:text-black transition duration-500`}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
