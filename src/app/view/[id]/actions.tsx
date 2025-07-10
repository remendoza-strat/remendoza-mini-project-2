'use server';
import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
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