// Production start script - starts both servers
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting production servers...');

// Start API server using the simple version (no path-to-regexp issues)
const apiServer = spawn('node', ['server-simple.js'], {
  cwd: path.join(__dirname, 'api'),
  stdio: 'inherit',
  env: { ...process.env, PORT: '3002' }
});

// Start main server
const mainServer = spawn('node', ['server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env, PORT: '3001' }
});

// Handle process exits
apiServer.on('exit', (code) => {
  console.log(`API server exited with code ${code}`);
  if (code !== 0) {
    console.log('🚨 API server failed, stopping main server');
    mainServer.kill();
  }
});

mainServer.on('exit', (code) => {
  console.log(`Main server exited with code ${code}`);
  if (code !== 0) {
    console.log('🚨 Main server failed, stopping API server');
    apiServer.kill();
  }
});

// Handle ctrl+c
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping all servers...');
  apiServer.kill();
  mainServer.kill();
  process.exit();
});
