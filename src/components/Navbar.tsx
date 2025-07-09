'use client';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {IconWritingSign} from '@tabler/icons-react';

export function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const path = usePathname();
    const links = [
        {href: "/", label: "Home"},
        {href: "/create", label: "Create Blogs"},
        {href: "/view", label: "View Blogs"}
    ];

    return(
        <nav className="fixed top-0 left-0 right-0 z-50 py-3 px-3">
            <div className="flex flex-wrap items-center justify-between">

                <Link onClick={() => setMenuOpen(false)} href="/" className="flex items-center justify-center">
                    <IconWritingSign stroke={1.75} className="text-yellow-300" size={40}/>
                    <span className="custom-font-triomphe text-4xl font-bold text-white">WriteSpace</span>
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="nav-burger inline-flex items-center w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden cursor-pointer"
                    aria-controls="navbar-default" aria-expanded={menuOpen}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <div className={'w-full md:block md:w-auto ' + (menuOpen ? 'block' : 'hidden')} id="navbar-default">
                    <ul className="custom-font-inter-tight flex flex-col item-center md:flex-row m-3">
                        {links.map(({href, label}) => (
                            <li key={href}> 
                                <Link onClick={() => setMenuOpen(false)} href={href}
                                    className={`px-2 py-1 rounded-md block m-2 border-b-2 border-transparent hover:border-white transition-all duration-200 ${
                                    path === href ? "nav-active text-white" : "nav-inactive"}`}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>  
        </nav>
    );
}