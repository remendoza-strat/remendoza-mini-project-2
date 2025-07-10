'use server';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';

export async function updateBlog(id: string, formData: FormData) {
	const title = String(formData.get('title'));
	const imageUrl = String(formData.get('imageUrl'));
	const content = String(formData.get('content'));
	const author = String(formData.get('author')) || "anonymous";
	const code = String(formData.get('code'));

	if(!title || !imageUrl || !content || !code){
		return {status: 2};
	}

	const [blog] = await db.select().from(tbl_blog).where(eq(tbl_blog.id, id));

	if(blog.code !== code){
		return {status: 3};
	}

	await db.update(tbl_blog)
		.set({title, imageUrl, content, author, updatedAt: new Date()})
		.where(eq(tbl_blog.id, id));

	revalidatePath(`/view/${id}`);
	return {status: 1};
}

export async function deleteBlog(id: string, code: string){
	if(!code){
		return {status: 2};
	}

	const [blog] = await db.select().from(tbl_blog).where(eq(tbl_blog.id, id));

	if(blog.code !== code){
		return {status: 3};
	}

	await db.delete(tbl_blog).where(eq(tbl_blog.id, id));

	return {status: 1};
}
