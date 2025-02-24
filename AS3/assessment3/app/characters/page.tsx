import Link from 'next/link';

export type Character = {
    url: string;
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: string;
    titles: string[];
    aliases: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    books: string[];
    povBooks: string[];
    tvSeries: string[];
    playedBy: string[];
};

async function getCharacters(): Promise<Character[]> {
    const data = await fetch('https://www.anapioficeandfire.com/api/characters');
    const characters: Character[] = await data.json();
    return characters;
}

export default async function Page(){
    const characters = await getCharacters();
    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <div className='text-4xl sm:text-5xl font-bold text-center sm:text-left'>
                Characters
                </div>
                <ul>
                {characters.map((character) => (
                    <li className='text-xl text-center sm:text-left list-disc list-inside hover:underline' key={character.url.split('/').pop()}>
                    <Link href={'/characters/' + character.url.split('/').pop()}>
                        {character.name ? character.name : `${character.aliases} (Aliases)`}
                    </Link>
                    </li>
                ))}
                </ul>
            </main>
        </div>
    )
}