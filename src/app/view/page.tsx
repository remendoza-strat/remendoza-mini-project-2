import {IconThumbUp, IconArrowBigUpLines, IconArrowBigDownLines, IconBook} from '@tabler/icons-react';
import {Button} from "@/components/ui/button";
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function View(){

    const data = await db.select().from(tbl_blog).orderBy(desc(tbl_blog.upvote));

    function timeConvert(utcInput: Date | string | null): string{
        if(!utcInput) return 'N/A';
        const date = new Date(utcInput);
        return date.toLocaleDateString('en-PH', {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    return(
        <>

            <div className="mt-35">

                <h1 className="text-white text-5xl">All Blogs</h1>
                <p className="text-white">This are sub descriptions</p>

           

            {data.length == 0? 
                (
                    <div className="text-white text-3xl m-2">
                        <p><b>No blog posts yet.</b></p>
                    </div>
                ) : 
                (
                    data.map((item) => (
                        <div key={item.id} className="blog-card flex flex-col lg:flex-row p-10">

                            <div className="flex-1/3 flex items-center justify-center">
                                <div className="w-[70%] aspect-auto">
                                    <img 
                                        className="w-full h-full object-cover rounded-lg"
                                        src={item.imageUrl}
                                        alt={item.title}
                                    />
                                </div>
                            </div>

                            <div className="flex-2/3 flex flex-col">
                                <div className="flex-1 text-white text-3xl m-2">
                                    <p><b>{item.title}</b></p>
                                </div>
                                <div className="flex-1 custom-font-gray-main text-md m-2">
                                    <p>
                                        {item.content.split(' ').length > 75 
                                        ? item.content.split(' ').slice(0, 75).join(' ') + '...' 
                                        : item.content}
                                    </p>
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
                                <div className="flex-1 flex custom-font-gray-main text-sm m-2">
                                    <div className="flex-1 flex">
                                        <div className="flex me-1">
                                            <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                                <IconThumbUp stroke={1} size={20}/>{item.likes}
                                            </Button>
                                        </div>
                                        <div className="flex me-1">
                                            <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                                <IconArrowBigUpLines stroke={1} size={20}/>{item.upvote}
                                            </Button>
                                        </div>
                                        <div className="flex me-1">
                                            <Button variant="outline" size="sm" className="blog-card-stats rounded-full px-3 py-2">
                                                <IconArrowBigDownLines stroke={1} size={20}/>{item.downvote}
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <Button variant="outline" size="sm" className="blog-card-stats rounded-md px-5 py-3">
                                            <IconBook stroke={1}/>Read More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))
                )
            }
             </div>
        </>
    );

}