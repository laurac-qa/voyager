import fs from "fs";

const dbFile = "voyager-test.db";

if (fs.existsSync(dbFile)) {
  fs.unlinkSync(dbFile);
  console.log("🧹 Test database reset.");
}