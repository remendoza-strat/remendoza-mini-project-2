"use server";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";
import {StripHTML} from "@/app/utils/StripHTML";

export async function BlogAdd(form: FormData){

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