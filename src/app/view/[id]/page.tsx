import {notFound} from 'next/navigation';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
import {eq} from 'drizzle-orm';
import Image from 'next/image';
import {BlogInteractions} from '@/app/view/[id]/BlogInteractions'; 
import {Button} from '@/components/ui/button';

export default async function BlogDetail({params} : {params: Promise<{id: string}>}){
    const {id} = await params;

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if(!isUUID) return notFound();

    const [blog] = await db
                        .select()
                        .from(tbl_blog)
                        .where(eq(tbl_blog.id, id));

    if(!blog) return notFound();

	return(
        <div className="mt-24 flex flex-col gap-6">

            <div>
                <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={1200}
                    height={500}
                    className="w-full max-h-[450px] object-cover"
                />
            </div>

            <div className="p-3">

                <h1 className="custom-font-triomphe text-white text-5xl font-bold text-center m-2">
                    {blog.title}
                </h1>

                <div className="flex flex-col md:flex-row gap-1 md:items-center">
    
                    <div
                        className="custom-font-inter-regular flex-[3] text-white text-md text-justify m-2"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="flex-[1] flex flex-col gap-1 w-full md:w-1/3 items-center text-center justify-center">
                
                        <BlogInteractions
                            blogId={blog.id}
                            likes={blog.likes ?? 0}
                            upvote={blog.upvote ?? 0}
                            downvote={blog.downvote ?? 0}
                        />

                        <div className="flex">
                            <div className="m-2">
                                <p className="custom-font-inter-tight custom-font-gray-main text-sm">Creation</p>
                                <p className="custom-font-inter-regular text-white">{blog.createdAt?.toDateString()}</p>
                            </div>
                            <div className="m-2">
                                <p className="custom-font-inter-tight custom-font-gray-main text-sm">Update</p>
                                <p className="custom-font-inter-regular text-white">{blog.updatedAt?.toDateString()}</p>
                            </div>
                        </div>

                        <div className="flex flex-col m-2">
                            <p className="custom-font-inter-tight custom-font-gray-main text-sm">Author</p>
                            <p className="custom-font-inter-regular text-white">{blog.author}</p>
                        </div>
                
                        <div className="m-2">
                            <Button className="view-slug-button">Modify this blog</Button>
                        </div>

                    </div>
    
                </div>
            
            </div>
        
        </div>
	);
}