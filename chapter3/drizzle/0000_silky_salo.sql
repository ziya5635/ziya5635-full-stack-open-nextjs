CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"likes" integer DEFAULT 0
);
