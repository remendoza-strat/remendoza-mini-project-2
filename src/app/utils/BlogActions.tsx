"use server";
import {sql, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";
import {StripHTML} from "@/app/utils/StripHTML";

export async function blogInteractions(blogId: string, type: "likes" | "upvote" | "downvote"){
    // update value based on column type
    await db.update(tbl_blog)
        .set({
            [type]: sql `${sql.identifier(type)} + 1`
        })
        .where(eq(tbl_blog.id, blogId));
    revalidatePath(`/view`);
    revalidatePath(`/view/${blogId}`);
}

export async function addBlog(form: FormData){
    // remove all tags from content
    const contentRaw = StripHTML(String(form.get("content")).trim());

    // get all necessary data
    const imageUrl = (form.get("imageUrl")?.toString().trim()) || "";
    const title = (form.get("title")?.toString().trim()) || "";
    const content = (form.get("content")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if all required input have contents
    if(!imageUrl || !title || !contentRaw || !code){
        return {status: 2};
    }
    
    // create blog
    await db   
            .insert(tbl_blog)
            .values({title, imageUrl, content, author, code});

    // revalidate path and return value to display success toast
    revalidatePath(`/view`);
    return {status: 1};
}

export async function updateBlog(form: FormData){
    // remove all tags from content
    const contentRaw = StripHTML(String(form.get("content")).trim());

    // get all necessary data
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const imageUrl = (form.get("imageUrl")?.toString().trim()) || "";
    const title = (form.get("title")?.toString().trim()) || "";
    const content = (form.get("content")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if all required input have contents
    if(!imageUrl || !title || !contentRaw || !code){
        return {status: 2};
    }

    // get data of blog
    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, blogId));
    
    // check if blog code matches with input code
    if(blog.code !== code){
        return {status: 3};
    }

    // update blog
    await db
            .update(tbl_blog)
            .set({title, imageUrl, content, author, updatedAt: new Date()})
            .where(eq(tbl_blog.id, blogId));

    // revalidate path and return value to display success toast
    revalidatePath(`/view`);
    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function deleteBlog(form: FormData){
    // get all necessary data
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if user typed a code
    if(!code){
        return {status: 2};
    }

    // get data of blog
    const [blog] = await db
                            .select()
                            .from(tbl_blog)
                            .where(eq(tbl_blog.id, blogId));

    // check if blog code matches with input code
    if(blog.code !== code){
        return {status: 3};
    }

    // delete blog
    await db
            .delete(tbl_blog)
            .where(eq(tbl_blog.id, blogId));

    // revalidate path and return value to display success toast
    revalidatePath(`/view`);
    return {status: 1};
}