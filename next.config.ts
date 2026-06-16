import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `pg` is an optional driver for the Postgres message store. Treat it as an
  // external server package so the build doesn't try to bundle it when it
  // isn't installed; it's loaded at runtime only when MESSAGE_STORE_DRIVER=postgres.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
