import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';
//import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /movies
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all movies
 */
reimbursementRouter.get('', [
  //authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      console.log('Retrieving All Reimbursements');
      let reimbursement = await reimbursementDao.findAll();
      resp.json(reimbursement);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find movie by id
 */
reimbursementRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving movie with id  ${id}`)
  try {
    let reimbursement = await reimbursementDao.findById(id);
    if (reimbursement !== undefined) {
      resp.json(reimbursement);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Create Movie
 */
reimbursementRouter.post('', [
  //authMiddleware('admin'),
  async (req, resp) => {
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])
