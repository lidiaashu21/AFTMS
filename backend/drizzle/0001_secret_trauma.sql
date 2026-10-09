ALTER TABLE "matches"
DROP CONSTRAINT "matches_fixture_id_fixtures_id_fk";
--> statement-breakpoint

-- Keep fixtures.id and matches.fixture_id as TEXT.
-- Do not convert either column to UUID.

ALTER TABLE "matches"
ALTER COLUMN "home_score" SET NOT NULL;
--> statement-breakpoint

ALTER TABLE "matches"
ALTER COLUMN "away_score" SET NOT NULL;
--> statement-breakpoint

ALTER TABLE "matches"
ALTER COLUMN "status" SET NOT NULL;
--> statement-breakpoint

ALTER TABLE "matches"
ADD CONSTRAINT "matches_fixture_id_fixtures_id_fk"
FOREIGN KEY ("fixture_id")
REFERENCES "public"."fixtures"("id")
ON DELETE CASCADE
ON UPDATE NO ACTION;