import connection from "../dbStrategy/postgres.js";

export async function getRanking() {
  const { rows: ranking } = await connection.query(
    `SELECT users.id, users.name, 
    COUNT(urls) AS "linksCount", 
    COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM users
    LEFT JOIN urls 
    ON urls."createdBy" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;`
  );
  return ranking;
}