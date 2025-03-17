import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.myntassets.com"
        
      }
    ]
  
}
}

export default nextConfig;
