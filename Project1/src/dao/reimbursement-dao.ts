import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { SqlReimbursement } from "../dto/SqlReimbursement";

/**
 * Retreive all Reimbursements from the database
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

export async function findAllPending(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement WHERE reimb_status = "Pending" ');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a Reimbursement by its id
 * @param id 
 */
export async function findByReimbursementId(id: number): Promise<Reimbursement> {
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
 * Retreive a Reimbursements by Author id's
 * @param id 
 */
export async function findByAuthorId(id: number): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement WHERE reimb_author_id = $1', [id]);
  
    const reimbursement = [];
    resp.rows.forEach((reimb_result) => {
      reimbursement.push(reimb_result);
    }
    )
    return reimbursement;
  } finally {
    client.release();
  }
}

/**
 * Add a new Reimbursement to the DB
 * @param reimbursement 
 */
export async function createReimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO project1.ers_reimbursement 
        (reimb_amount, reimb_status, reimb_type, reimb_description, reimb_submitted, reimb_author_id, reimb_resolved, reimb_resolver_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING reimb_id`, [reimbursement.amount, reimbursement.status, reimbursement.type, reimbursement.description, reimbursement.submitted, reimbursement.author, reimbursement.resolved, reimbursement.resolver]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

/**
 * Update a Reimbursement by its id
 * 
 */
export async function updateReimbursement(reimbursement: Reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE project1.ers_reimbursement 
        SET reimb_status = $1, reimb_resolved = $2, reimb_resolver_id = $3
        WHERE reimb_id = $4
        RETURNING reimb_id`, [reimbursement.status, reimbursement.resolved, reimbursement.resolver,reimbursement.id]);
     return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}