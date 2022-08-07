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

export async function getUrl(shortUrl) {
  const { rows: [url] } = await connection.query(
    `SELECT urls.url 
    FROM urls 
    WHERE "shortUrl" = $1;`, 
    [shortUrl]
  );
  return url;
}

export async function searchUrl(id) {
  const {rows: [urlData]} = await connection.query(
    `SELECT * FROM urls 
    WHERE ID = $1;`, 
    [id]
  );
  return urlData;
}

export async function deleteUrl(id) {
  await connection.query(
    `DELETE FROM urls 
    WHERE ID = $1;`, 
    [id]
  );
}