"use server";
import {sql, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";
import {StripHTML} from "@/app/utils/StripHTML";

export async function blogInteractions(blogId: string, type: "likes" | "upvote" | "downvote"){
    if(!blogId) return;

    await db.update(tbl_blog)
        .set({
            [type]: sql `${sql.identifier(type)} + 1`
        })
        .where(eq(tbl_blog.id, blogId));

    revalidatePath(`/view/${blogId}`);
}

export async function addBlog(form: FormData){
    const contentRaw = StripHTML(String(form.get("content")).trim());

    const imageUrl = (form.get("imageUrl")?.toString().trim()) || "";
    const title = (form.get("title")?.toString().trim()) || "";
    const content = (form.get("content")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!imageUrl || !title || !contentRaw || !code){
        return {status: 2};
    }
    
    await db   
            .insert(tbl_blog)
            .values({title, imageUrl, content, author, code});

    return {status: 1};
}

export async function updateBlog(form: FormData){
    const contentRaw = StripHTML(String(form.get("content")).trim());

    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const imageUrl = (form.get("imageUrl")?.toString().trim()) || "";
    const title = (form.get("title")?.toString().trim()) || "";
    const content = (form.get("content")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!imageUrl || !title || !contentRaw || !code){
        return {status: 2};
    }

    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, blogId));

    if(blog.code !== code){
        return {status: 3};
    }

    await db
            .update(tbl_blog)
            .set({title, imageUrl, content, author, updatedAt: new Date()})
            .where(eq(tbl_blog.id, blogId));

    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function deleteBlog(form: FormData){
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!code){
        return {status: 2};
    }

    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, blogId));

    if(blog.code !== code){
        return {status: 3};
    }

    await db
            .delete(tbl_blog)
            .where(eq(tbl_blog.id, blogId));

    return {status: 1};
}