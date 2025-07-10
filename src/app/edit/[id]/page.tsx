import {notFound} from 'next/navigation';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
import {eq} from 'drizzle-orm';
import EditBlog from '@/app/edit/[id]/EditBlog';

export default async function EditPage({params} : {params: Promise<{id: string}>}){
    const {id} = await params;
    if(!id) return notFound();

    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, id));
    if(!blog) return notFound();

    return <EditBlog blog={blog}/>;
}