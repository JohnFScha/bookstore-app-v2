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
          <h3 className='text-lg font-semibold text-center'>Smooth jazz</h3>
          <iframe className='rounded-xl bg-base-100' src="https://open.spotify.com/embed/playlist/37i9dQZF1DWV7EzJMK2FUI?utm_source=generator" width="100%" height="152" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </div>
      <p className='text-sm mt-4 text-center'>© 2023 Bookstore App. All rights reserved.</p>
    </footer>
  )
}
