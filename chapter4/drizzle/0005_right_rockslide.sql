CREATE TABLE "readingList" (
	"id" serial PRIMARY KEY NOT NULL,
	"read" boolean DEFAULT false,
	"blog_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;