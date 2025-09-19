import Link from "next/link";

export default function Nav(){
    return (
        <nav>
            <ul>
                <li><Link href = "/">Home</Link></li>
            </ul>
        </nav>
    );
}