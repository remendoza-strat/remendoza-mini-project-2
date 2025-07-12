import {pgTable, uuid, text, integer, timestamp} from "drizzle-orm/pg-core";
import {InferSelectModel} from "drizzle-orm";

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

// create export variables
export type Blog = InferSelectModel<typeof tbl_blog>;   
export type Comment = InferSelectModel<typeof tbl_comment>;