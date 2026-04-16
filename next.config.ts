/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents Webpack from bundling pdf2json on the server,
  // avoiding its internal fs.readFileSync calls at build time
  serverExternalPackages: ["pdf2json"],
};

export default nextConfig;