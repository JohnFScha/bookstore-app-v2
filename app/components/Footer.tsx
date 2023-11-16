import React from 'react'

export default function Footer() {
  return (
    <footer className='p-4 border-t-2 bg-base-300'>
      <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center'>
        <div className='md:text-start xs:text-center'>
          <h3 className='text-lg font-semibold'>Contact Us</h3>
          <p>Email: contact@bookstoreapp.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Fake Street, Buenos Aires, Argentina</p>
        </div>
        <div>
          <h3 className='text-lg font-semibold text-center'>Find Us</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-58.123456!3d-34.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMzTCsDE2JzAyLjEiUyA1OMKwMzQnMTUuOCJX!5e0!3m2!1sen!2sus!4v1234567890123"
            height="200" allowFullScreen className='border-2 border-gray-400 rounded-lg m-auto lg:w-8/12 sm:w-full'
          ></iframe>
        </div>
      </div>
      <p className='text-sm mt-4 text-center'>© 2023 Bookstore App. All rights reserved.</p>
    </footer>
  )
}
