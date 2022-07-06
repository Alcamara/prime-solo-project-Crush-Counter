
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "public.user" (
	"id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(80) NOT NULL,
	"last_name" varchar(80) NOT NULL,
	"gamertag" varchar(80) NOT NULL,
	"country" varchar(80) NOT NULL,
	"state" varchar(80) NOT NULL,
	"city" varchar(80) NOT NULL,
	"zip_code" integer(5) NOT NULL,
	"password" varchar(255) NOT NULL
) 


CREATE TABLE "public.matchNotes" (
	"id" BINARY NOT NULL,
	"win" BOOLEAN(80) NOT NULL,
	"num_games" integer(80) NOT NULL,
	"skillDemonstrated" varchar(80) NOT NULL,
	"skillToImprove" varchar(80) NOT NULL,
	"note" varchar(255) NOT NULL
)



CREATE TABLE "public.UserTournamentSurvey" (
	"Id" integer NOT NULL,
	"userId" integer NOT NULL,
	"surveyId" integer NOT NULL
) 








