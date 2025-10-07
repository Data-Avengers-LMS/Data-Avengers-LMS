import { Request, Response } from 'express';
import { writeQueue } from '../Queues/writeQueues.js';

export const addJob = async (req: Request, res: Response) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const job = await writeQueue.add('create-file', { path });
    return res
      .status(200)
      .json({ message: 'Job added successfully', id: job.id });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error adding job to queue:', err.message);
      return res.status(500).json({ error: 'Failed to add job to queue' });
    }
    console.error('Unknown error adding job:', err);
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
};
