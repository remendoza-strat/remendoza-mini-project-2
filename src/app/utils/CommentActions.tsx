"use server";
import {sql, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_comment} from "@/db/schema";

export async function commentInteractions(commentId: string, type: "agree" | "disagree"){
    if(!commentId) return;

    await db.update(tbl_comment)
        .set({
            [type]: sql `${sql.identifier(type)} + 1`
        })
        .where(eq(tbl_comment.id, commentId));

    revalidatePath(`/view`);
}

export async function addComment(form: FormData){
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const content = (form.get("content")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!content || !code){
        return {status: 2}
    }

    await db
            .insert(tbl_comment)
            .values({blogId, author, content, code});

    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function updateComment(form: FormData){
    const commentId = (form.get("commentId")?.toString().trim()) || "";
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const author = (form.get("author")?.toString().trim()) || "anonymous";
    const content = (form.get("content")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!content || !code){
        return {status: 2};
    }

    const [comment] = await db
                            .select()
                            .from(tbl_comment)
                            .where(eq(tbl_comment.id, commentId));

    if(comment.code !== code){
        return {status: 3};
    }
    
    await db
            .update(tbl_comment)
            .set({author, content, updatedAt: new Date()})
            .where(eq(tbl_comment.id, commentId));

    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}

export async function deleteComment(form: FormData){
    const commentId = (form.get("commentId")?.toString().trim()) || "";
    const blogId = (form.get("blogId")?.toString().trim()) || "";
    const code = (form.get("code")?.toString().trim()) || "";

    if(!code){
        return {status: 2};
    }

    const [comment] = await db
                            .select()
                            .from(tbl_comment)
                            .where(eq(tbl_comment.id, commentId));

    if(comment.code !== code){
        return {status: 3};
    }

    await db
            .delete(tbl_comment)
            .where(eq(tbl_comment.id, commentId));

    revalidatePath(`/view/${blogId}`);
    return {status: 1};
}