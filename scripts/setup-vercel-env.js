const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read .env.local file
const envPath = path.join(__dirname, '../.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Parse .env.local file
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
}

// Check if we have any environment variables
if (Object.keys(envVars).length === 0) {
  console.log('No environment variables found in .env.local');
  process.exit(1);
}

// Add each environment variable to Vercel
console.log('Setting up environment variables in Vercel...');

Object.entries(envVars).forEach(([key, value]) => {
  try {
    console.log(`Adding ${key}...`);
    // Add to production environment
    execSync(`vercel env add ${key} production`, { 
      input: value + '\n', // Add newline to automatically confirm
      stdio: ['pipe', 'inherit', 'inherit']
    });
  } catch (error) {
    console.log(`Note: ${key} might already exist or encountered an error.`);
  }
});

console.log('\nEnvironment variables have been set up in Vercel.');
console.log('You may need to redeploy your project for the changes to take effect.');
console.log('Run: vercel deploy --prod'); 