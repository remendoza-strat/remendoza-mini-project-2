import {db} from '@/db/drizzle';
import {tbl_blog} from '@/db/schema';
import {sql} from 'drizzle-orm';
import {PageTitle} from '@/components/PageTitle';
import {BlogList} from './BlogList';

export default async function View(){
	const data = await db
					.select()
					.from(tbl_blog)
					.orderBy(sql`${tbl_blog.upvote} - ${tbl_blog.downvote} DESC`);

	return(
		<>
			<div className="mt-35">
				<PageTitle
					title="Voice of the community"
					subtitle="Browse through all published blogs from our community of writers."
				/>
				<BlogList blogs={data}/>
			</div>
		</>
	);
}