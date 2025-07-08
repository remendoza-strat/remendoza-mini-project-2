import {pgTable, text, integer, timestamp, uuid} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

// table blog
export const tbl_blog = pgTable("tbl_blog", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
  	imageUrl: text("imageUrl").notNull(),
  	content: text("content").notNull(),
  	author: text("author").notNull(),
  	likes: integer("likes").default(0),
  	upvote: integer("upvote").default(0),
  	downvote: integer("downvote").default(0),
  	createdAt: timestamp("createdAt", {withTimezone: true}).defaultNow(),
  	updatedAt: timestamp("updatedAt", {withTimezone: true}).defaultNow(),
  	code: text("code").notNull()
});

// table comment
export const tbl_comment = pgTable("tbl_comment", {
  	id: uuid("id").defaultRandom().primaryKey(),
 	blogId: uuid("blogId").references(() => tbl_blog.id, {onDelete: "cascade"}).notNull(),
  	content: text("content").notNull(),
  	author: text("author").notNull(),
  	agree: integer("agree").default(0),
  	disagree: integer("disagree").default(0),
  	createdAt: timestamp("createdAt", {withTimezone: true}).defaultNow(),
  	updatedAt: timestamp("updatedAt", {withTimezone: true}).defaultNow(),
  	code: text("code").notNull()
});

// define one to many relationship
export const blogRelations = relations(tbl_blog, ({many}) => ({
  	comments: many(tbl_comment)
}));

// define many to one relationship
export const commentRelations = relations(tbl_comment, ({one}) => ({
	blog: one(tbl_blog, {
		fields: [tbl_comment.blogId],
		references: [tbl_blog.id],
	})
}));
