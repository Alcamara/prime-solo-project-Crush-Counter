
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(100) NOT NULL,
	"password" VARCHAR(250) NOT NULL,
	"firstName" VARCHAR(80) NOT NULL,
	"lastName" VARCHAR(80) NOT NULL,
	"gamertag" VARCHAR(80) NOT NULL,
	 "country" VARCHAR(80) NOT NULL,
	 "state" VARCHAR(80) NOT NULL,
	 "city" VARCHAR(80) NOT NULL,
	 "zipCode" INTEGER NOT NULL
);

CREATE TABLE "matchNotes" (
	"id" SERIAL PRIMARY KEY,
	"win" BOOLEAN NOT NULL,
	"skillDemonstrated" VARCHAR(80) NOT NULL,
	"skillToImprove" VARCHAR(80) NOT NULL
);










