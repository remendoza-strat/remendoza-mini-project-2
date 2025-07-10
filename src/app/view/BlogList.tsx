'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {IconBook} from '@tabler/icons-react';
import Image from 'next/image'

type Blog = {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
    author: string;
    likes: number | null;
    upvote: number | null;
    downvote: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    code: string;
};

export function BlogList({blogs} : {blogs: Blog[]}){

    const [search, setSearch] = useState('');

    const filtered = blogs.filter((item) => {
        const keyword = search.toLowerCase();
        return(
            item.title.toLowerCase().includes(keyword) ||
            item.author.toLowerCase().includes(keyword)
        );
    });

    function timeConvert(utcInput: Date | string | null): string {
        if(!utcInput) return 'N/A';
        const date = new Date(utcInput);
        return date.toLocaleDateString('en-PH', {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    function stripHtml(html: string): string {
        if(typeof window === 'undefined') return html;
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    function getExcerpt(html: string, wordLimit = 50): string {
        const text = stripHtml(html);
        const words = text.trim().split(/\s+/);
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    }

    return(
        <>
            <div className="flex justify-end m-3">
                <input 
                    type="text"
                    placeholder="Search blogs....."
                    className="view-search p-3 rounded-md text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
                
            {filtered.length === 0 ? 
                (
                    <div className="custom-font-inter-regular text-white text-3xl m-2">
                        <p><b>No blog posts found.</b></p>
                    </div>
                ) : 
                (
                    filtered.map((item) => (
                        <div key={item.id} 
                            className="view-blog-card flex flex-col lg:flex-row p-10">

                            <div className="flex flex-1/3 items-center justify-center m-2">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            <div className="flex-2/3 flex flex-col">
                                <div className="flex-1 text-white text-3xl m-2">
                                    <p><b>{item.title.split(' ').slice(0, 20).join(' ') + (item.title.split(' ').length > 50 ? '...' : '')}</b></p>
                                </div>
                                <div className="flex-1 custom-font-gray-main text-md m-2">
                                    <p>{getExcerpt(item.content)}</p>
                                </div>
                                <div className="flex-1 flex text-sm m-2">
                                    <div className="me-5">
                                        <h3 className="custom-font-gray-main">Publication Date</h3>
                                        <p className="text-white">{timeConvert(item.createdAt)}</p>
                                    </div>
                                    <div>
                                        <h3 className="custom-font-gray-main">Author</h3>
                                        <p className="text-white">{item.author}</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col lg:flex-row text-sm m-2">
                                    <div className="flex-1 flex m-1">
                                        <div className="me-3">
                                            <p className="custom-font-gray-main">
                                                Likes: 
                                                <span className="text-white m-1">{item.likes}</span>
                                            </p>
                                        </div>
                                        <div className="me-3">
                                            <p className="custom-font-gray-main">
                                                Upvote: 
                                                <span className="text-white m-1">{item.upvote}</span>
                                            </p>
                                        </div>
                                        <div className="me-3">
                                            <p className="custom-font-gray-main">
                                                Downvote: 
                                                <span className="text-white m-1">{item.downvote}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-1 m-1">
                                        <Link href={`/view/${item.id}`}>                                  
                                            <Button variant="outline" size="sm" className="view-blog-card-button rounded-md px-5 py-3">
                                                <IconBook stroke={1}/>Read More
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    ))
                )
            }
        </>
    );

}