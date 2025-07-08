'use server';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';

export async function addBlog(form : FormData){
    const title = String(form.get("title"));
    const imageUrl = String(form.get("imageUrl"));
    const content = String(form.get("content"));
    const author = String(form.get("author"));
    const code = String(form.get("code"));

    // logic for validating inputs

    try{
        await db   
            .insert(tbl_blog)
            .values({title, imageUrl, content, author, code});

        // trigger a toast
        // go to index
    }
    catch(error){
        // logic for displaying error
        console.log(error);
    }
}