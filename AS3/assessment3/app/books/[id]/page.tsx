import { Book } from "../page";
import Link from 'next/link';

async function getBook(id:string): Promise<Book> {
    const data = await fetch('https://www.anapioficeandfire.com/api/books/'+id);
    const book: Book = await data.json();
    return book;
}

export default async function Page({params}:{params:{id:string}}) {
    const book = await getBook(params.id);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
                    {book.name}
                </div>
                <div className="text-xl font-semibold text-center">
                    ISBN: {book.isbn}
                </div>
                <div className="text-xl font-semibold text-center">
                    Authors: {book.authors.join(', ')}
                </div>
                <div className="text-xl font-semibold text-center">
                    Number of Pages: {book.numberOfPages}
                </div>
                <div className="text-xl font-semibold text-center">
                    Publisher: {book.publisher}
                </div>
                <div className="text-xl font-semibold text-center">
                    Country: {book.country}
                </div>
                <div className="text-xl font-semibold text-center">
                    Released: {new Date(Date.parse(book.released)).toLocaleDateString('en-US')}
                </div>
                <div className="text-2xl font-bold text-center">
                    Characters:
                </div>
                <ul className="text-xl text-center sm:text-left list-disc list-inside max-h-40 overflow-y-auto">
                    {book.characters.map((character) => (
                        <li key={character.split('/').pop()}><Link className='hover:underline' href={'/characters/' + character.split('/').pop()}>Character {character.split('/').pop()}</Link></li>
                    ))}
                </ul>
            </main>
        </div>

    )
}