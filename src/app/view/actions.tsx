"use server";
import {sql, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_blog, tbl_comment} from "@/db/schema";

export async function blogInteractions(blogId: string, type: "likes" | "upvote" | "downvote"){
	if(!blogId) return;

	await db.update(tbl_blog)
		.set({
			[type]: sql `${sql.identifier(type)} + 1`
		})
		.where(eq(tbl_blog.id, blogId));

	revalidatePath(`/view/${blogId}`);
}

export async function commentInteractions(commentId: string, type: "agree" | "disagree"){
	if(!commentId) return;

	await db.update(tbl_comment)
		.set({
			[type]: sql`${sql.identifier(type)} + 1`
		})
		.where(eq(tbl_comment.id, commentId));

	revalidatePath(`/view`);
}

export async function addComment(formData : FormData){
	const blogId = String(formData.get("blogId"));
	const author = String(formData.get("author")) || "anonymous";
	const content = String(formData.get("content"));
	const code = String(formData.get("code"));

	if(!content || !code){
		return {status: 2}
	}

	await db
			.insert(tbl_comment)
			.values({blogId, author, content, code});

	revalidatePath(`/view/${blogId}`);
	return {status: 1};
}

export async function editComment(formData: FormData){
	const id = String(formData.get("id"));
	const blogId = String(formData.get("blogId"));
	const author = String(formData.get("author")) || "anonymous";
	const content = String(formData.get("content"));
	const code = String(formData.get("code"));

	if(!content || !code){
		return {status: 2};
	}

	const [existing] = await db
							.select()
							.from(tbl_comment)
							.where(eq(tbl_comment.id, id));

	if(existing.code !== code){
		return {status: 3};
	}
	
	await db
		.update(tbl_comment)
		.set({author, content, updatedAt: new Date()})
		.where(eq(tbl_comment.id, id));

	revalidatePath(`/view/${blogId}`);
	return {status: 1};
}

export async function deleteComment(formData: FormData){
	const id = String(formData.get("id"));
	const blogId = String(formData.get("blogId"));
	const code = String(formData.get("code"));

	if(!code){
		return {status: 2};
	}

	const [existing] = await db
							.select()
							.from(tbl_comment)
							.where(eq(tbl_comment.id, id));

	if(existing.code !== code){
		return {status: 3};
	}

	await db
		.delete(tbl_comment)
		.where(eq(tbl_comment.id, id));

	revalidatePath(`/view/${blogId}`);
	return {status: 1};
}