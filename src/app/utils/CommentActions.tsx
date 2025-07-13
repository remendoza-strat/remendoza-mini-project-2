"use server";
import {sql, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_comment} from "@/db/schema";

export async function commentInteractions(commentId: string, type: "agree" | "disagree"){
    // update value based on column type
    await db.update(tbl_comment)
        .set({
            [type]: sql `${sql.identifier(type)} + 1`
        })
        .where(eq(tbl_comment.id, commentId));
    revalidatePath(`/view`);
}

export async function addComment(form: FormData){
    // get all necessary data
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const content = (form.get("content")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if all required input have contents
    if(!content || !code){
        return {status: 2}
    }

    // create comment
    await db
            .insert(tbl_comment)
            .values({blogId, author, content, code});
        
    // revalidate path and return value to display success toast
    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function updateComment(form: FormData){
    // get all necessary data
    const commentId = (form.get("commentId")?.toString().trim()) || "";
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const content = (form.get("content")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if all required input have contents
    if(!content || !code){
        return {status: 2};
    }

    // get data of comment
    const [comment] = await db
                            .select()
                            .from(tbl_comment)
                            .where(eq(tbl_comment.id, commentId));

    // check if comment code matches with input code
    if(comment.code !== code){
        return {status: 3};
    }
    
    // update comment
    await db
            .update(tbl_comment)
            .set({author, content, updatedAt: new Date()})
            .where(eq(tbl_comment.id, commentId));

    // revalidate path and return value to display success toast
    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function deleteComment(form: FormData){
    // get all necessary data
    const commentId = (form.get("commentId")?.toString().trim()) || "";
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    // check if user typed a code
    if(!code){
        return {status: 2};
    }

    // get data of comment
    const [comment] = await db
                            .select()
                            .from(tbl_comment)
                            .where(eq(tbl_comment.id, commentId));

    // check if comment code matches with input code
    if(comment.code !== code){
        return {status: 3};
    }

    // delete comment
    await db
            .delete(tbl_comment)
            .where(eq(tbl_comment.id, commentId));

    // revalidate path and return value to display success toast
    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}