-- Run this once against the database that api.dremebetclinic.com uses.
-- It only changes how tournament deletes cascade — it does NOT touch
-- the unrelated teams.manager_id column, so it's safe regardless of
-- whether that column has already been added in production.

ALTER TABLE "fixtures" DROP CONSTRAINT IF EXISTS "fixtures_tournament_id_tournaments_id_fk";
ALTER TABLE "matches" DROP CONSTRAINT IF EXISTS "matches_fixture_id_fixtures_id_fk";
ALTER TABLE "payments" DROP CONSTRAINT IF EXISTS "payments_tournament_id_tournaments_id_fk";

ALTER TABLE "fixtures"
  ADD CONSTRAINT "fixtures_tournament_id_tournaments_id_fk"
  FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id")
  ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "matches"
  ADD CONSTRAINT "matches_fixture_id_fixtures_id_fk"
  FOREIGN KEY ("fixture_id") REFERENCES "public"."fixtures"("id")
  ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "payments"
  ADD CONSTRAINT "payments_tournament_id_tournaments_id_fk"
  FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id")
  ON DELETE CASCADE ON UPDATE NO ACTION;
