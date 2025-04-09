const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read .env file
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = envContent
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();
    if (key && value) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

console.log('Setting up environment variables in Vercel...');

// Add each environment variable
Object.entries(envVars).forEach(([key, value]) => {
  try {
    console.log(`Adding ${key}...`);
    // Add to production environment
    execSync(`echo "${value}" | vercel env add ${key} production`, { 
      stdio: ['pipe', 'inherit', 'inherit']
    });
    console.log(`✅ Added ${key} to production environment`);
  } catch (error) {
    console.log(`Note: ${key} encountered an error:`, error.message);
  }
});

console.log('\n✅ Environment variables have been set up in Vercel.');
console.log('You may need to redeploy your project for the changes to take effect.');
console.log('Run: vercel deploy --prod'); 