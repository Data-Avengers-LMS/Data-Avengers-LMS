import { Request, Response } from 'express';
import { writeQueue } from '../Queues/writeQueues.js';

export const addJob = async (req: Request, res: Response) => {
  const { path } = req.body;

  const job = await writeQueue.add('create-file', { path });
  res.json({ message: 'Job added', id: job.id });
};
