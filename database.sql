
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--name of the database is cruch-counter-database
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(100)UNIQUE NOT NULL,
	"password" VARCHAR(250) NOT NULL,
	"firstName" VARCHAR(80) ,
	"lastName" VARCHAR(80) ,
	"gamertag" VARCHAR(80) ,
	 "country" VARCHAR(80) ,
	 "state" VARCHAR(80) ,
	 "city" VARCHAR(80) ,
	 "zipCode" INTEGER 
);

CREATE TABLE "matchNote" (
	"id" SERIAL PRIMARY KEY,
	"userId" INT REFERENCES "user",
	"tournamentId" INTEGER NOT NULL,
	"win" BOOLEAN NOT NULL,
	"skillDemonstrated" VARCHAR(80) NOT NULL,
	"skillToImprove" VARCHAR(80) NOT NULL,
	"note" VARCHAR(250)
);







