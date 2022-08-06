import connection from "../dbStrategy/postgres.js";

export async function createShortUrl(userId, url, shortUrl) {
  await connection.query(
    `INSERT INTO urls ("createdBy", url, "shortUrl") 
    VALUES ($1, $2, $3);`, 
    [userId, url, shortUrl]
  );
}

export async function getShortUrl(id) {
  const {rows: [shortUrl]} = await connection.query(
    `SELECT urls.id, urls."shortUrl", urls.url 
    FROM urls 
    WHERE ID = $1;`, 
    [id]
  );
  return shortUrl;
}