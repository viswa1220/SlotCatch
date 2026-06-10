/** @type {import('next').NextConfig} */

// The SlotCatch backend (FastAPI). Override with BACKEND_URL or
// NEXT_PUBLIC_BACKEND_URL; defaults to the Render deployment.
const BACKEND =
  (process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://slotcatch-api.onrender.com").replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  // Serve the owner dashboard under the same domain as the site so the login
  // cookie is first-party (shared login + navbar auth state).
  async rewrites() {
    return [
      { source: "/dashboard", destination: `${BACKEND}/dashboard` },
      { source: "/dashboard/:path*", destination: `${BACKEND}/dashboard/:path*` },
    ];
  },
};

module.exports = nextConfig;
