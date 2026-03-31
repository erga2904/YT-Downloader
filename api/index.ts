import { app, createServer } from '../server';

let initializedPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
  // Ensure the server is initialized exactly once per function instance
  if (!initializedPromise) {
    initializedPromise = createServer();
  }
  
  try {
    await initializedPromise;
    // Vercel serverless uses a standard Node.js server model
    // but the app(req, res) might need extra care with timing
    return app(req, res);
  } catch (err) {
    console.error('Critical initialization error:', err);
    return res.status(500).json({ error: 'Server initialization failed' });
  }
}
