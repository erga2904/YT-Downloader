import { app, createServer } from '../server.ts';

let isServerCreated = false;

export default async function handler(req: any, res: any) {
  if (!isServerCreated) {
    try {
      await createServer();
      isServerCreated = true;
    } catch (err) {
      console.error('Error creating server:', err);
      return res.status(500).json({ error: 'Server initialization failed' });
    }
  }
  return app(req, res);
}
