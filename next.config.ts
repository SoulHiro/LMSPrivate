import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "br.freepik.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
