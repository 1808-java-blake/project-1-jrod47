import { SqlReimbursement } from "../dto/SqlReimbursement";
import { Reimbursement } from "../model/reimbursement";


export function reimbursementConverter(reimbursement: SqlReimbursement) {
    return new Reimbursement(reimbursement.reimb_id, reimbursement.reimb_amount, reimbursement.reimb_status, reimbursement.reimb_type, reimbursement.reimb_description, reimbursement.reimb_submitted, reimbursement.reimb_author_id, reimbursement.reimb_resolved, reimbursement.reimb_resolver_id)
}