CREATE TABLE list (
    "id" serial PRIMARY KEY,
	"task" varchar (250),
	"complete" BOOLEAN DEFAULT FALSE
);