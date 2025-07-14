import {notFound} from "next/navigation";
import {eq} from "drizzle-orm";
import {BlogEdit} from "@/app/edit/[id]/BlogEdit";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";

export default async function Edit({params} : {params: Promise<{id: string}>}){
    // get params
    const {id} = await params;
    if(!id) return notFound();

    // check validity of id
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if(!isUUID) return notFound();

    // get data of the blog
    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, id));
    if(!blog) return notFound();

    // send the blog to component
    return <BlogEdit blog={blog}/>;
}