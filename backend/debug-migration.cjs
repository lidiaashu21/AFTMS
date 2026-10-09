require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    await client.query("BEGIN");

    const dir = path.join(process.cwd(), "drizzle");
    const files = fs.readdirSync(dir)
      .filter(f => /^\d+_.*\.sql$/.test(f))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(dir, file), "utf8");
      const statements = sql.split("--> statement-breakpoint");

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i].trim();
        if (!statement) continue;

        try {
          await client.query(statement);
        } catch (err) {
          console.error("\nFAILED MIGRATION:", file);
          console.error("STATEMENT NUMBER:", i + 1);
          console.error("ERROR CODE:", err.code);
          console.error("ERROR MESSAGE:", err.message);
          console.error("SQL:\n", statement);
          await client.query("ROLLBACK");
          return;
        }
      }

      console.log("SQL passed:", file);
    }

    await client.query("ROLLBACK");
    console.log("\nAll numbered migration SQL passed the test.");
  } catch (err) {
    try { await client.query("ROLLBACK"); } catch {}
    console.error("DIAGNOSTIC ERROR:", err.message);
  } finally {
    await client.end();
  }
})();
