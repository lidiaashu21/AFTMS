ALTER TABLE "matches" DROP CONSTRAINT "matches_fixture_id_fixtures_id_fk";
--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "tournament_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "home_team_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "away_team_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "fixture_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "public"."fixtures"("id") ON DELETE no action ON UPDATE no action;