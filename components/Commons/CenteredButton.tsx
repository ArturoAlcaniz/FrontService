import Link from 'next/link';

export default function CenteredButton(url: string, text: string): JSX.Element {
    return (
        <div className='buttonCentered'>
            <Link href={url} passHref>
                <button className="button is-primary">{text}</button>
            </Link>
        </div>
    )
} 