import Link from 'next/link';

export type Book = {
    url: string;
    name: string;
    isbn: string;
    authors: string[];
    numberOfPages: number;
    publisher: string;
    country: string;
    mediaType: string;
    released: string;
    characters: string[];
};

async function getBooks(): Promise<Book[]> {
    const data = await fetch('https://www.anapioficeandfire.com/api/books');
    const books: Book[] = await data.json();
    return books;
}

export default async function Page(){
    const books:Book[] = await getBooks();
    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <div className='text-4xl sm:text-5xl font-bold text-center sm:text-left'>
                Books
                </div>
                <ul>
                {books.map((book) => (
                    <li className='text-xl text-center sm:text-left list-disc list-inside hover:underline' key={book.url.split('/').pop()}>
                    <Link href={'/books/' + book.url.split('/').pop()}>
                        {book.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </main>
        </div>
    )
}