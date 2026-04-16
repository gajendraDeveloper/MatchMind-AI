/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents Webpack from bundling pdf-parse on the server,
  // avoiding its internal fs.readFileSync calls at build time
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;