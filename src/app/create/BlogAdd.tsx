'use server';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';

export async function BlogAdd(form : FormData){

    const imageUrl = String(form.get("imageUrl")).trim();
    const title = String(form.get("title")).trim();
    const content = String(form.get("content")).trim();
    const author = String(form.get("author")).trim() || "anonymous";
    const code = String(form.get("code")).trim();

    if(!imageUrl || !title || !content || !code){
        return {status: 2};
    }

    try{
        await db   
            .insert(tbl_blog)
            .values({title, imageUrl, content, author, code});
        return {status: 1};
    }
    catch{
        return {status: 3}; 
    }
    
}