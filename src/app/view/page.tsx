import {sql} from "drizzle-orm";
import {db} from "@/db/drizzle";
import {tbl_blog} from "@/db/schema";
import {PageTitle} from "@/components/PageTitle";
import {BlogList} from "@/app/view/BlogList";

export default async function View(){
	// get all blogs and order it by difference of upvote and downvote
	const blogs = await db
					.select()
					.from(tbl_blog)
					.orderBy(sql`${tbl_blog.upvote} - ${tbl_blog.downvote} DESC`);
					
	return(
		<div className="mt-35">
			<PageTitle
				title="Voice of the community"
				subtitle="Browse through all published blogs from our community of writers."
			/>
			<BlogList blogs={blogs}/>
		</div>
	);
}