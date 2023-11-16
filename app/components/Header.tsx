import React from 'react'
import Link from 'next/link'
import Limit from './Limit';
import Switch from '@/app/components/Switch'
import { GiBookshelf } from "react-icons/gi";

export default function Header() {
  return (
    <header className='flex bg-base-300 lg:flex-nowrap lg:justify-between md:justify-between md:p-3 xs:p-5 shadow-lg shadow-base-300 xs:flex-wrap xs:justify-center xs:gap-5'>
      <Link href={'/'} className='btn btn-ghost gap-2'>
        <GiBookshelf className='text-4xl' />
        <span className='md:inline xs:hidden'>|</span>
        <p className='italic text-xl'>Bookstore App</p>
      </Link>
      <nav className='md:flex xs:hidden gap-3'>
        <Limit />
        <Switch />
      </nav>
    </header>
  )
}
