import {Inter} from 'next/font/google';
import {IconBrandLinkedinFilled, IconMailFilled, IconBrandGithubFilled} from '@tabler/icons-react';

const inter = Inter({
    subsets: ['latin'],
    weight: '400'
});

export function Footer(){
    return(
        <>
            <div className={`flex flex-col md:flex-row border-gray-500 border-t ${inter.className}`}>

                <div className="flex-1 text-base custom-text-gray tracking-tighter text-center m-2">
                    <p>© 2025 by Rhabi Mendoza</p>
                </div>

                <div className="flex-1 flex text-center justify-center text-white m-2">
                    <a href="https://linkedin.com/in/rhabimendoza">
                        <IconBrandLinkedinFilled className="mx-2"/>
                    </a>
                    <a href="mailto:rhabidpmendoza@gmail.com">
                        <IconMailFilled className="mx-2"/>
                    </a>
                    <a href="https://github.com/rhabimendoza">
                        <IconBrandGithubFilled className="mx-2"/> 
                    </a>
                </div>

                <div className="flex-1 text-base custom-text-gray tracking-tighter text-center m-2">
                    <p>Stratpoint Internship Project</p>
                </div>

            </div>
        </>
    );
}