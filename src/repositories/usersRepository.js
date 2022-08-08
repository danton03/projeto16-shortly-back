import connection from "../dbStrategy/postgres.js";

export async function searchUser(id) {
  const {rows: [user]} = await connection.query(
    `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
    FROM users
    JOIN urls 
    ON urls."createdBy" = users.id
    WHERE users.id = $1
    GROUP BY users.id;`, 
    [id]
  );
  return user;
}

export async function getUserData(user) {
  const { id } = user;

  const {rows: userUrls} = await connection.query(
    `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" 
    FROM urls 
    WHERE urls."createdBy" = $1;`, 
    [id]
  );

  const userData = {
    ...user, 
    shortenedUrls: userUrls.reverse()
  }

  return userData;
}