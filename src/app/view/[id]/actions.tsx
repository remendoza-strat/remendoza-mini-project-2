'use server';
import {db} from '@/db/drizzle';
import {tbl_blog, tbl_comment} from '@/db/schema';
import {sql, eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';

export async function blogInteractions(blogId: string, type: 'likes' | 'upvote' | 'downvote'){
	if(!blogId) return;

	await db.update(tbl_blog)
		.set({
			[type]: sql `${sql.identifier(type)} + 1`
		})
		.where(eq(tbl_blog.id, blogId));

	revalidatePath(`/view/${blogId}`);
}

export async function commentInteractions(commentId: string, type: 'agree' | 'disagree'){
	if (!commentId) return;

	await db.update(tbl_comment)
		.set({
			[type]: sql`${sql.identifier(type)} + 1`
		})
		.where(eq(tbl_comment.id, commentId));

	revalidatePath(`/view`);
}

export async function addComment(formData: FormData){
	const blogId = formData.get('blogId') as string;
	const author = formData.get('author') as string;
	const content = formData.get('content') as string;
	const code = formData.get('code') as string;

	if (!author || !content || !code || !blogId) return;

	await db.insert(tbl_comment).values({
		blogId,
		author,
		content,
		code,
	});

	revalidatePath(`/view/${blogId}`);
}

export async function editComment(formData: FormData){
	const id = formData.get('id') as string;
	const blogId = formData.get('blogId') as string;
	const author = formData.get('author') as string;
	const content = formData.get('content') as string;
	const code = formData.get('code') as string;

	const [existing] = await db
		.select()
		.from(tbl_comment)
		.where(eq(tbl_comment.id, id));

	if (!existing || existing.code !== code) return;

	await db
		.update(tbl_comment)
		.set({ author, content })
		.where(eq(tbl_comment.id, id));

	revalidatePath(`/view/${blogId}`);
}

export async function deleteComment(formData: FormData){
	const id = formData.get('id') as string;
	const blogId = formData.get('blogId') as string;
	const code = formData.get('code') as string;

	const [existing] = await db
		.select()
		.from(tbl_comment)
		.where(eq(tbl_comment.id, id));

	if (!existing || existing.code !== code) return;

	await db.delete(tbl_comment).where(eq(tbl_comment.id, id));

	revalidatePath(`/view/${blogId}`);
}