CREATE TABLE "example" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "example_name_unique" UNIQUE("name")
);
