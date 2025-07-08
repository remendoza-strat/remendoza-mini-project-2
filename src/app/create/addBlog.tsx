'use server';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';

export async function addBlog(form : FormData){
    // get contents from form
    const title = String(form.get("title")).trim();
    const imageUrl = String(form.get("imageUrl")).trim() || "none";
    const content = String(form.get("content")).trim();
    const author = String(form.get("author")).trim() || "anonymous";
    const code = String(form.get("code")).trim() || "none";

    // return 2 for empty required fields
    if(!title || !content){
        return {status: 2};
    }

    try{
        // insert data to database
        await db   
            .insert(tbl_blog)
            .values({title, imageUrl, content, author, code});

        // return 1 for successful insertion of data
        return {status: 1};
    }
    catch{
        // return 3 for error
        return {status: 3}; 
    }
}