import { mkdir, copyFile, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'data.js', 'favicon.svg']) await copyFile(file, `dist/${file}`);
const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_PUBLISHABLE_KEY || '';
if (key.startsWith('sb_secret_')) throw new Error('A secret key must never be published.');
if (key.startsWith('eyJ')) {
  const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
  if (payload.role !== 'anon') throw new Error('Only a public anon key may be published.');
}
if (key && !url) throw new Error('SUPABASE_URL is required with a public key.');
if (url && !/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url)) throw new Error('Unexpected Supabase URL.');
await writeFile('dist/config.json', JSON.stringify({ supabaseUrl: url, supabaseKey: key }));
console.log('Built LaunchPulse static application. Authentication configured:', Boolean(url && key));
