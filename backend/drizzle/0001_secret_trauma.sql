ALTER TABLE "matches" DROP CONSTRAINT "matches_fixture_id_fixtures_id_fk";
--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "tournament_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "home_team_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "fixtures" ALTER COLUMN "away_team_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "fixture_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "home_score" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "away_score" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "public"."fixtures"("id") ON DELETE cascade ON UPDATE no action;