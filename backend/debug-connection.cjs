require("dotenv").config();
const { Client } = require("pg");

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000
  });

  try {
    console.log("Connecting to PostgreSQL...");
    await client.connect();
    console.log("Connected.");

    const result = await client.query(
      "SELECT current_database() AS db, current_schema() AS schema"
    );
    console.log("Database:", result.rows);

    await client.query("BEGIN");
    console.log("Transaction started.");
    await client.query("ROLLBACK");
    console.log("Transaction test passed.");
  } catch (err) {
    console.error("ERROR DETAILS:", err);
    console.error("ERROR JSON:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } finally {
    await client.end().catch(() => {});
  }
})();
