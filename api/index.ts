import { app, createServer } from '../server.js';

let initializedPromise = null;

export default async function handler(req, res) {
  // Ensure the server is initialized exactly once per function instance
  if (!initializedPromise) {
    initializedPromise = createServer();
  }
  
  try {
    await initializedPromise;
    return app(req, res);
  } catch (err) {
    console.error('Critical initialization error:', err);
    return res.status(500).json({ error: 'Server initialization failed' });
  }
}
