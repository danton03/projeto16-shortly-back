import connection from "../dbStrategy/postgres.js";

export async function createShortUrl(userId, url, shortUrl) {
  await connection.query(
    'INSERT INTO urls ("createdBy", url, "shortUrl") VALUES ($1, $2, $3);', 
    [userId, url, shortUrl]
  );
}