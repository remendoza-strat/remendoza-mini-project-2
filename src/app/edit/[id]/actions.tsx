"use server";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";
import {StripHTML} from "@/app/utils/StripHTML";

export async function updateBlog(id: string, form: FormData){
	const contentRaw = StripHTML(String(form.get("content")).trim());

	const imageUrl = (form.get("imageUrl")?.toString().trim()) || "";
	const title = (form.get("title")?.toString().trim()) || "";
	const content = (form.get("content")?.toString().trim()) || "";
	const author = (form.get("author")?.toString().trim()) || "anonymous";
	const code = (form.get("code")?.toString().trim()) || "";

	if(!imageUrl || !title || !contentRaw || !code){
		return {status: 2};
	}

	const [blog] = await db
							.select()
							.from(tbl_blog)
							.where(eq(tbl_blog.id, id));

	if(blog.code !== code){
		return {status: 3};
	}

	await db
			.update(tbl_blog)
			.set({title, imageUrl, content, author, updatedAt: new Date()})
			.where(eq(tbl_blog.id, id));
	revalidatePath(`/view/${id}`);
	return {status: 1};
}

export async function deleteBlog(id: string, code: string){
	if(!code){
		return {status: 2};
	}

	const [blog] = await db
							.select()
							.from(tbl_blog)
							.where(eq(tbl_blog.id, id));

	if(blog.code !== code){
		return {status: 3};
	}

	await db
			.delete(tbl_blog)
			.where(eq(tbl_blog.id, id));
	return {status: 1};
}