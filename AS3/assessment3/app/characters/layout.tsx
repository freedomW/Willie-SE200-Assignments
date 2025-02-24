import React from 'react';
import Link from 'next/link';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <main>{children}</main>
            <footer className="w-full flex justify-center text-xl text-center sm:text-left pb-10 space-x-10">
              <Link className='hover:underline' href={'/characters'}>Characters</Link>
              <Link className='hover:underline' href={'/books'}>Books</Link>
              <Link className='hover:underline' href={'/'}>Return Home</Link>
            </footer>
        </div>
    );
};