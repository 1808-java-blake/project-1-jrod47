import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";
import { reimbursementConverter } from "../util/reimbursement-converter";

/**
 * Retreive all users from the DB along with all their movies
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
   
        `SELECT * FROM project1.ers_users
        FULL JOIN project1.ers_reimbursement
        USING (user_id)
        `);

    // extract the users and their movies from the result set
    const users = [];
    resp.rows.forEach((user_reimbursement_result) => {
      const reimbursement = reimbursementConverter(user_reimbursement_result);
      const exists = users.some( existingUser => {
        if(user_reimbursement_result.user_id === existingUser.id) {
          reimbursement.id && existingUser.movies.push(reimbursement);
          return true;
        }
      })
      if (!exists) {
        const newUser = userConverter(user_reimbursement_result);
        reimbursement.id && newUser.reimbursement.push(reimbursement);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM project1.ers_users u
        LEFT JOIN project1.ers_reimbursements
        USING (reimb_author_id)
        WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]); // get the user data from first row
        // get the movies from all the rows
        resp.rows.forEach((reimbursement) => {
          reimbursement.reimb_id && user.reimbursement.push(reimbursementConverter(reimbursement));
        })
        return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM project1.ers_users u
        WHERE u.ers_username = $1
        AND u.ers_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO movies.app_users 
        (ers_username, ers_password, user_first_name, user_last_name, user_email, ers_role)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING user_id`, [user.username, user.password, user.firstname, user.lastname, user.email, user.role]);
    return resp.rows[0].user_id;
  } finally {
    client.release();
  }
}

/**
 * Add a movie to a users list
 * @param movieId 
 * @param userId 
 */
// export async function addMovieToUser(movieId: number, userId: number): Promise<any> {
//   const client = await connectionPool.connect();
//   try {
//     const resp = await client.query(
//       `INSERT INTO movies.users_movies 
//         (user_id, movie_id)
//         VALUES ($1, $2)`, [userId, movieId]);
//   } finally {
//     client.release();
//   }
// }