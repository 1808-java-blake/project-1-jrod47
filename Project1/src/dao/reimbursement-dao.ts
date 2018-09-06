import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { SqlReimbursement } from "../dto/SqlReimbursement";

/**
 * Retreive all movies from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a movie by its id
 * @param id 
 */
export async function findById(id: number): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement WHERE reimb_id = $1', [id]);
    let reimbursement: SqlReimbursement = resp.rows[0];
    if (reimbursement !== undefined) {
      return reimbursementConverter(reimbursement);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

/**
 * Add a new movie to the DB
 * @param reimbursement 
 */
export async function createReimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO project1.ers_reimbursement 
        (reimb_amount, reimb_status, reimb_type, reimb_description, reimb_submitted, reimb_author_id, reimb_resolved, reimb_resolver_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING reimb_id`, [reimbursement.id, reimbursement.amount, reimbursement.status, reimbursement.type, reimbursement.description, reimbursement.submitted, reimbursement.author, reimbursement.resolved, reimbursement.resolver]);
    return resp.rows[0].movie_id;
  } finally {
    client.release();
  }
}