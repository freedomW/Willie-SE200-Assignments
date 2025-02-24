import { Character } from "../page";

async function getCharacter(id:string): Promise<Character> {
    const data = await fetch('https://www.anapioficeandfire.com/api/characters/' + id);
    const character: Character = await data.json();
    return character;
}

interface Params {
    id: string;
}

export default async function Page({params}:{params:Params}) {
    const character = await getCharacter(params.id);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
                    {character.name ? character.name : `${character.aliases}`}
                </div>
                <div className="text-xl font-semibold text-center">
                    Name: {character.name ? character.name : `Unknown`}
                </div>
                <div className="text-xl font-semibold text-center">
                    Gender: {character.gender ? character.gender : `Unknown`}
                </div>
                <div className="text-xl font-semibold text-center">
                    Culture: {character.culture ? character.culture : `Unknown`}
                </div>
                <div className="text-xl font-semibold text-center">
                    Born: {character.born ? character.born : `Unknown`} 
                </div>
                <div className="text-xl font-semibold text-center">
                    Died: {character.died ? character.died : `Unknown`}
                </div>
                <div className="text-2xl font-bold text-center">
                    Titles:
                </div>
                <ul className="text-xl text-center sm:text-left list-disc list-inside">
                    {character.titles.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ul>
                <div className="text-2xl font-bold text-center">
                    Aliases:
                </div>
                <ul className="text-xl text-center sm:text-left list-disc list-inside">
                    {character.aliases.map((alias) => (
                        <li key={alias}>{alias}</li>
                    ))}
                </ul>
            </main>
        </div>

    )
}