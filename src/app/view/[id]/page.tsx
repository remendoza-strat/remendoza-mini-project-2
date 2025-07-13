import {notFound} from "next/navigation";
import {eq, desc} from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {db} from "@/db/drizzle";
import {tbl_blog, tbl_comment} from "@/db/schema";
import {BlogInteraction} from "@/app/view/[id]/BlogInteraction"; 
import {CommentForm, CommentList} from "@/app/view/[id]/CommentSection";
import {DateTimeFormatter} from "@/app/utils/DateTimeFormatter";

export default async function BlogDetail({params} : {params: Promise<{id: string}>}){
    // get id
    const {id} = await params;

    // check validity of id
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if(!isUUID) return notFound();

    // get data of the blog
    const [blog] = await db
                        .select()
                        .from(tbl_blog)
                        .where(eq(tbl_blog.id, id));
    if(!blog) return notFound();

    // get comments of the blog
    const comments = await db
		                .select()
		                .from(tbl_comment)
		                .where(eq(tbl_comment.blogId, blog.id))
		                .orderBy(desc(tbl_comment.createdAt));

	return(
        <div>
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
        
                        <div className="flex-[3] m-2">
                            <div className="prose prose-invert max-w-none text-white text-justify custom-font-inter-regular"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>

                        <div className="flex-[1] flex flex-col gap-1 w-full md:w-1/3 items-center text-center justify-center">
                    
                            <BlogInteraction
                                blogId={blog.id}
                                likes={blog.likes??0}
                                upvote={blog.upvote??0}
                                downvote={blog.downvote??0}
                            />

                            <div className="flex">
                                <div className="m-2">
                                    <p className="custom-font-inter-tight custom-font-gray-main text-sm">Creation</p>
                                    <p className="custom-font-inter-regular text-white">{DateTimeFormatter(blog.createdAt)}</p>
                                </div>
                                <div className="m-2">
                                    <p className="custom-font-inter-tight custom-font-gray-main text-sm">Update</p>
                                    <p className="custom-font-inter-regular text-white">{DateTimeFormatter(blog.updatedAt)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col m-2">
                                <p className="custom-font-inter-tight custom-font-gray-main text-sm">Author</p>
                                <p className="custom-font-inter-regular text-white">{blog.author}</p>
                            </div>
                    
                            <div className="m-2">
                                <Link href={`/edit/${blog.id}`}>
                                    <Button size="sm" className="button-design">
                                        Modify this blog
                                    </Button>
                                </Link>
                            </div>

                        </div>
        
                    </div>
                
                </div>
            
            </div>
	    
            <div className="w-full mt-20 flex flex-col lg:flex-row gap-8 p-4">
                <div className="w-full lg:w-1/2">
                    <CommentForm blogId={blog.id}/>
                </div>
                <div className="w-full lg:w-1/2">
                    <CommentList blogId={blog.id} comments={comments}/>
                </div>
            </div>
        </div>
    );
}