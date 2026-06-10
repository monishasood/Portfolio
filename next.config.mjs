/**
 * Static export for GitHub Pages.
 *
 * IMPORTANT: `basePath` must match your repo name exactly.
 * Repo "Portfolio" → site at https://monishasood.github.io/Portfolio/
 * If you rename the repo, change basePath here.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/Portfolio" : "";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: {
    // Plain <video src> isn't auto-prefixed by basePath, so we expose it.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
