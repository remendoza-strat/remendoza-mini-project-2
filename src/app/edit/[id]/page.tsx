import {notFound} from "next/navigation";
import {eq} from "drizzle-orm";
import {BlogEdit} from "@/app/edit/[id]/BlogEdit";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";

export default async function Edit({params} : {params: Promise<{id: string}>}){
    const {id} = await params;
    if(!id) return notFound();

    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, id));
    if(!blog) return notFound();

    return <BlogEdit blog={blog}/>;
}