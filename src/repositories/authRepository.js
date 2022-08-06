import connection from "../dbStrategy/postgres.js";

export async function checkIfUserExists(email) {
  const { rows: [ userExists ] } = await connection.query(`
    SELECT * FROM users 
    WHERE users.email = $1;`,
    [email]
  );
  return userExists;
}

export async function handleCreateUser(user) {
  const { name, email, password } = user;
  await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
}