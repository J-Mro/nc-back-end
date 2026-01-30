const db = require("../connection");

async function query() {
  return await db.query(`
    SELECT DISTINCT topic FROM articles;
    `);
}
query().then(({ rows }) => {
  console.log(rows);
});

module.exports = query;
