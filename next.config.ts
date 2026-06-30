import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In dev, Next.js 403s cross-origin requests to its internal /_next endpoints.
  // On a fresh direct navigation the JS chunks load fine (no Origin header), but
  // the HMR WebSocket handshake always carries an Origin — when it's not in this
  // list the socket is rejected, and in Turbopack dev a blocked HMR socket stops
  // React from hydrating: every button/timer goes dead while the muted <video>
  // (pure HTML, needs no JS) keeps playing. Whitelist every origin used to reach
  // this dev box.
  allowedDevOrigins: [
    "192.168.1.11", // LAN (current DHCP lease)
    "192.168.1.*", // any lease in the /24 — survives a DHCP rotation
    "100.81.14.113", // Tailscale IP (static)
    "devbox.tail84790b.ts.net", // Tailscale MagicDNS / Funnel
    "devbox", // hostname
  ],

  // Drop the `x-powered-by: Next.js` response header — smaller responses + less
  // framework fingerprinting. (Confirmed in next/dist/docs … poweredByHeader.md.)
  poweredByHeader: false,
};

export default nextConfig;
